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
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewTaskRepository reviewTaskRepository;

    @Autowired
    private CaseRepository caseRepository;

    @Autowired
    private AuditLogService auditService;

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

    // GET ALL REVIEWS
    @GetMapping
    public ResponseEntity<?> getAllReviews(

            @RequestParam(
                    required = false
            )
            String status

    ) {

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

        task.setHumanVerified(false);

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

    // HUMAN VERIFY REVIEW
    @PostMapping("/{id}/human-verify")
    public ResponseEntity<?> humanVerify(

            @PathVariable String id,

            Principal principal
    ) {

        ReviewTask task =

                reviewTaskRepository.findById(

                        UUID.fromString(id)

                ).orElseThrow();

        task.setHumanVerified(true);

        reviewTaskRepository.save(task);

        notificationService.createNotification(

                task.getAssignedTo(),

                "Human Verification Completed",

                "Review task verified successfully"
        );

        auditService.logAction(

                AuditAction.VERIFY_REVIEW,

                principal != null
                        ? principal.getName()
                        : "SYSTEM",

                "Human verified review task"
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

        // HUMAN VERIFICATION CHECK
        if (

            !Boolean.TRUE.equals(

                    task.getHumanVerified()
            )
        ) {

            return ResponseEntity

                    .badRequest()

                    .body(

                            "Human verification required"
                    );
        }

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

        notificationService.createNotification(

                task.getAssignedTo(),

                "Review Approved",

                "Review approved successfully"
        );

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

        notificationService.createNotification(

                task.getAssignedTo(),

                "Review Rejected",

                "Review task rejected"
        );

        auditService.logAction(

                AuditAction.REJECT_REVIEW,

                principal != null
                        ? principal.getName()
                        : "SYSTEM",

                "Rejected review task"
        );

        return ResponseEntity.ok(task);
    }

    // REVIEW STATS
    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {

        long total =
                reviewTaskRepository.count();

        long pending =
                reviewTaskRepository
                        .findByStatus(
                                ReviewStatus.PENDING
                        ).size();

        long verified =
                reviewTaskRepository
                        .findByStatus(
                                ReviewStatus.VERIFIED
                        ).size();

        long rejected =
                reviewTaskRepository
                        .findByStatus(
                                ReviewStatus.REJECTED
                        ).size();

        return ResponseEntity.ok(

                new DashboardStatsResponse(

                        total,

                        pending,

                        verified,

                        rejected
                )
        );
    }

    // AUDIT LOGS TEST
    @GetMapping("/audit-logs")
    public ResponseEntity<?> getAuditLogs() {

        return ResponseEntity.ok(
                "Audit logging working"
        );
    }
}