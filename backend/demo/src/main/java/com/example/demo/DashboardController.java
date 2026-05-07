package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private ReviewTaskRepository reviewTaskRepository;

    // =====================================================
    // KPI CARDS BY DEPARTMENT
    // =====================================================

    @GetMapping("/kpis/{department}")
    public ResponseEntity<?> getKPIsByDepartment(

            @PathVariable String department
    ) {

        List<ReviewTask> tasks =
                reviewTaskRepository.findAll()
                        .stream()

                        .filter(task -> {

                            // =====================================
                            // OTHERS CATEGORY
                            // =====================================

                            if (
                                    department.equalsIgnoreCase(
                                            "OTHERS"
                                    )
                            ) {

                                return task.getDepartment() == null ||

                                        (

                                                !task.getDepartment()
                                                        .name()
                                                        .equalsIgnoreCase(
                                                                "LEGAL"
                                                        )

                                                        &&

                                                        !task.getDepartment()
                                                                .name()
                                                                .equalsIgnoreCase(
                                                                        "FINANCE"
                                                                )

                                                        &&

                                                        !task.getDepartment()
                                                                .name()
                                                                .equalsIgnoreCase(
                                                                        "HOME_AFFAIRS"
                                                                )

                                                        &&

                                                        !task.getDepartment()
                                                                .name()
                                                                .equalsIgnoreCase(
                                                                        "DEFENCE"
                                                                )
                                        );
                            }

                            // =====================================
                            // NORMAL DEPARTMENT FILTER
                            // =====================================

                            return task.getDepartment() != null &&

                                    task.getDepartment()
                                            .name()
                                            .equalsIgnoreCase(
                                                    department
                                            );
                        })

                        .toList();

        long total =
                tasks.size();

        long pending =
                tasks.stream()
                        .filter(task ->

                                task.getStatus() != null &&

                                        task.getStatus()
                                                .name()
                                                .equalsIgnoreCase(
                                                        "PENDING"
                                                )
                        )
                        .count();

        long verified =
                tasks.stream()
                        .filter(task ->

                                task.getStatus() != null &&

                                        task.getStatus()
                                                .name()
                                                .equalsIgnoreCase(
                                                        "VERIFIED"
                                                )
                        )
                        .count();

        long rejected =
                tasks.stream()
                        .filter(task ->

                                task.getStatus() != null &&

                                        task.getStatus()
                                                .name()
                                                .equalsIgnoreCase(
                                                        "REJECTED"
                                                )
                        )
                        .count();

        List<Map<String, Object>> cards =
                new ArrayList<>();

        cards.add(
                Map.of(
                        "label",
                        "Total Reviews",

                        "value",
                        total,

                        "colorClass",
                        "gold"
                )
        );

        cards.add(
                Map.of(
                        "label",
                        "Pending Reviews",

                        "value",
                        pending,

                        "colorClass",
                        "saffron"
                )
        );

        cards.add(
                Map.of(
                        "label",
                        "Verified Reviews",

                        "value",
                        verified,

                        "colorClass",
                        "jade"
                )
        );

        cards.add(
                Map.of(
                        "label",
                        "Rejected Reviews",

                        "value",
                        rejected,

                        "colorClass",
                        "crimson"
                )
        );

        return ResponseEntity.ok(cards);
    }

    // =====================================================
    // RECENT CASES
    // =====================================================

    @GetMapping("/recent")
    public ResponseEntity<?> getRecent() {

        List<Map<String, Object>> recent =
                new ArrayList<>();

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern(
                        "dd MMM yyyy"
                );

        reviewTaskRepository.findAll()
                .forEach(task -> {

                    recent.add(

                            Map.of(

                                    "id",
                                    task.getId(),

                                    "caseId",
                                    task.getCaseEntity() != null
                                            ? task.getCaseEntity().getId()
                                            : null,

                                    "caseNumber",
                                    task.getCaseEntity() != null
                                            ? task.getCaseEntity().getCaseNumber()
                                            : null,

                                    "department",
                                    task.getDepartment() != null
                                            ? task.getDepartment().name()
                                            : "LEGAL",

                                    "createdAt",
                                    task.getCreatedAt() != null
                                            ? task.getCreatedAt()
                                              .format(formatter)
                                            : null,

                                    "status",
                                    task.getStatus() != null
                                            ? task.getStatus().name()
                                            : "PENDING",

                                    "priority",
                                    task.getPriority() != null
                                            ? task.getPriority()
                                              .name()
                                              .toLowerCase()
                                            : "medium"
                            )
                    );
                });

        return ResponseEntity.ok(recent);
    }

    // =====================================================
    // DEADLINES
    // =====================================================

    @GetMapping("/deadlines")
    public ResponseEntity<?> getDeadlines() {

        List<Map<String, Object>> deadlines =
                new ArrayList<>();

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern(
                        "dd MMM yyyy"
                );

        reviewTaskRepository.findAll()
                .forEach(task -> {

                    if (task.getDueDate() != null) {

                        deadlines.add(

                                Map.of(

                                        "id",
                                        task.getId(),

                                        "title",
                                        task.getTitle() != null
                                                ? task.getTitle()
                                                : "Review Task",

                                        "department",
                                        task.getDepartment() != null
                                                ? task.getDepartment().name()
                                                : "LEGAL",

                                        "dueDate",
                                        task.getDueDate()
                                                .format(formatter)
                                )
                        );
                    }
                });

        return ResponseEntity.ok(deadlines);
    }

    // =====================================================
    // DEPARTMENT BREAKDOWN
    // =====================================================

    @GetMapping("/departments")
    public ResponseEntity<?> getDepartments() {

        Map<String, Long> departmentMap =
                new HashMap<>();

        reviewTaskRepository.findAll()
                .forEach(task -> {

                    String department;

                    if (task.getDepartment() != null) {

                        department =
                                task.getDepartment().name();

                    } else {

                        department = "OTHERS";
                    }

                    departmentMap.put(
                            department,

                            departmentMap.getOrDefault(
                                    department,
                                    0L
                            ) + 1
                    );
                });

        List<Map<String, Object>> result =
                new ArrayList<>();

        departmentMap.forEach((key, value) -> {

            result.add(

                    Map.of(
                            "name",
                            key,

                            "count",
                            value
                    )
            );
        });

        return ResponseEntity.ok(result);
    }
}