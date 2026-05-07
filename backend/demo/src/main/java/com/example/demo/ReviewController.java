package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewTaskRepository reviewTaskRepository;

    @Autowired
    private CaseRepository caseRepository;

    @Autowired
    private AuditService auditService;

    @Autowired
    private FieldReviewRepository fieldReviewRepository;

    @Autowired
    private PdfAnnotationRepository pdfAnnotationRepository;

    @Autowired
    private ReviewStateValidator reviewStateValidator;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentAccessService departmentAccessService;

    // GET ALL REVIEWS WITH STATUS FILTER
    @GetMapping
    public ResponseEntity<?> getAllReviews(

            @RequestParam(
                    required = false
            )
            String status

    ) {

        // RETURN ALL
        if (
                status == null
                        || status.isBlank()
        ) {

            return ResponseEntity.ok(
                    reviewTaskRepository.findAll()
            );
        }

        try {

            ReviewStatus reviewStatus =
                    ReviewStatus.valueOf(
                            status.toUpperCase()
                    );

            return ResponseEntity.ok(
                    reviewTaskRepository.findByStatus(
                            reviewStatus
                    )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Invalid status filter"
                    );
        }
    }

    // GET REVIEW BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(
            @PathVariable String id
    ) {

        ReviewTask task =
                reviewTaskRepository.findById(
                        UUID.fromString(id)
                ).orElseThrow();

        return ResponseEntity.ok(task);
    }

    // CREATE REVIEW TASK
    @PostMapping("/create")
    public ResponseEntity<?> createReviewTask(
            @RequestBody CreateReviewRequest request
    ) {

        ReviewTask task =
                new ReviewTask();

        // REAL CASE RELATION

        Case caseEntity =
                caseRepository.findById(
                        Long.parseLong(
                                request.getCaseId()
                        )
                ).orElseThrow();

        task.setCaseEntity(
                caseEntity
        );

        task.setAssignedTo(
                request.getAssignedTo()
        );

        task.setDepartment(
                request.getDepartment()
        );

        task.setPriority(
                request.getPriority()
        );

        task.setTitle(
                request.getTitle()
        );

        task.setFileName(
                request.getFileName()
        );

        task.setSummary(
                request.getSummary()
        );

        task.setStatus(
                ReviewStatus.PENDING
        );

        task.setDueDate(
                request.getDueDate()
        );

        task.setCreatedAt(
                LocalDateTime.now()
        );

        reviewTaskRepository.save(task);

        auditService.logAction(
                AuditAction.CREATE_REVIEW,
                request.getAssignedTo(),
                "Created review task"
        );

        return ResponseEntity.ok(task);
    }

    // GET PENDING REVIEWS
    @GetMapping("/pending")
    public ResponseEntity<?> getPendingReviews() {

        List<ReviewTask> tasks =
                reviewTaskRepository.findByStatus(
                        ReviewStatus.PENDING
                );

        return ResponseEntity.ok(tasks);
    }

    // ASSIGN REVIEWER
    @PutMapping("/assign/{id}")
    public ResponseEntity<?> assignReviewer(
            @PathVariable String id,
            @RequestBody AssignReviewRequest request
    ) {

        ReviewTask task =
                reviewTaskRepository.findById(
                        UUID.fromString(id)
                ).orElseThrow();

        reviewStateValidator.validateTransition(
                task.getStatus(),
                ReviewStatus.ASSIGNED
        );

        task.setAssignedTo(
                request.getReviewer()
        );

        task.setStatus(
                ReviewStatus.ASSIGNED
        );

        reviewTaskRepository.save(task);

        notificationService.createNotification(
                request.getReviewer(),
                "New Review Assigned",
                "You have been assigned review task"
        );

        auditService.logAction(
                AuditAction.ASSIGN_REVIEWER,
                request.getReviewer(),
                "Assigned review task"
        );

        return ResponseEntity.ok(task);
    }

    // APPROVE REVIEW
    @PostMapping("/{id}/approve")
    public ResponseEntity<?> approveReview(
            @PathVariable String id,
            Principal principal
    ) {

        ReviewTask task =
                reviewTaskRepository.findById(
                        UUID.fromString(id)
                ).orElseThrow();

        User user =
                userRepository.findByEmail(
                        principal.getName()
                ).orElseThrow();

        if (
                !departmentAccessService.canAccess(
                        user,
                        task
                )
        ) {

            return ResponseEntity
                    .status(403)
                    .body(
                            "Department access denied"
                    );
        }

        reviewStateValidator.validateTransition(
                task.getStatus(),
                ReviewStatus.VERIFIED
        );

        task.setStatus(
                ReviewStatus.VERIFIED
        );

        reviewTaskRepository.save(task);

        auditService.logAction(
                AuditAction.VERIFY_REVIEW,
                user.getEmail(),
                "Verified review task"
        );

        return ResponseEntity.ok(task);
    }

    // REJECT REVIEW
    @PostMapping("/{id}/reject")
    public ResponseEntity<?> rejectReview(
            @PathVariable String id,
            Principal principal
    ) {

        ReviewTask task =
                reviewTaskRepository.findById(
                        UUID.fromString(id)
                ).orElseThrow();

        reviewStateValidator.validateTransition(
                task.getStatus(),
                ReviewStatus.REJECTED
        );

        task.setStatus(
                ReviewStatus.REJECTED
        );

        reviewTaskRepository.save(task);

        auditService.logAction(
                AuditAction.REJECT_REVIEW,
                principal != null
                        ? principal.getName()
                        : "SYSTEM",
                "Rejected review task"
        );

        return ResponseEntity.ok(task);
    }

    // UPDATE REVIEW
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(
            @PathVariable String id,
            @RequestBody ReviewTask updatedTask
    ) {

        ReviewTask task =
                reviewTaskRepository.findById(
                        UUID.fromString(id)
                ).orElseThrow();

        task.setDepartment(
                updatedTask.getDepartment()
        );

        task.setPriority(
                updatedTask.getPriority()
        );

        task.setDueDate(
                updatedTask.getDueDate()
        );

        task.setTitle(
                updatedTask.getTitle()
        );

        task.setFileName(
                updatedTask.getFileName()
        );

        task.setSummary(
                updatedTask.getSummary()
        );

        reviewTaskRepository.save(task);

        return ResponseEntity.ok(task);
    }

    // FIELD LEVEL EDIT
    @PatchMapping("/edit-field/{reviewId}")
    public ResponseEntity<?> editField(
            @PathVariable String reviewId,
            @RequestBody FieldEditRequest request
    ) {

        FieldReview fieldReview =
                new FieldReview();

        fieldReview.setReviewTaskId(
                UUID.fromString(reviewId)
        );

        fieldReview.setFieldName(
                request.getFieldName()
        );

        fieldReview.setOldValue(
                request.getOldValue()
        );

        fieldReview.setNewValue(
                request.getNewValue()
        );

        fieldReview.setEditedBy(
                request.getEditedBy()
        );

        fieldReview.setEditedAt(
                LocalDateTime.now()
        );

        fieldReviewRepository.save(
                fieldReview
        );

        auditService.logAction(
                AuditAction.CREATE_REVIEW,
                request.getEditedBy(),
                "Edited field"
        );

        return ResponseEntity.ok(
                fieldReview
        );
    }

    // CREATE PDF ANNOTATION
    @PostMapping("/annotations/{reviewId}")
    public ResponseEntity<?> createAnnotation(
            @PathVariable String reviewId,
            @RequestBody PdfAnnotationRequest request
    ) {

        PdfAnnotation annotation =
                new PdfAnnotation();

        annotation.setReviewTaskId(
                UUID.fromString(reviewId)
        );

        annotation.setFieldName(
                request.getFieldName()
        );

        annotation.setPageNumber(
                request.getPageNumber()
        );

        annotation.setX(
                request.getX()
        );

        annotation.setY(
                request.getY()
        );

        annotation.setWidth(
                request.getWidth()
        );

        annotation.setHeight(
                request.getHeight()
        );

        pdfAnnotationRepository.save(
                annotation
        );

        return ResponseEntity.ok(
                annotation
        );
    }

    // GET PDF ANNOTATIONS
    @GetMapping("/annotations/{reviewId}")
    public ResponseEntity<?> getAnnotations(
            @PathVariable String reviewId
    ) {

        List<PdfAnnotation> annotations =
                pdfAnnotationRepository
                        .findByReviewTaskId(
                                UUID.fromString(
                                        reviewId
                                )
                        );

        return ResponseEntity.ok(
                annotations
        );
    }

    // REVIEW STATS
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {

        return ResponseEntity.ok(
                reviewTaskRepository.count()
        );
    }

    // AUDIT LOGS
    @GetMapping("/audit-logs")
    public ResponseEntity<?> getAuditLogs() {

        return ResponseEntity.ok(
                "Audit logging working"
        );
    }
}