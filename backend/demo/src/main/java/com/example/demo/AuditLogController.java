package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin("*")
public class AuditLogController {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private AuditLogService auditService;

    // GET ALL AUDIT LOGS
    @GetMapping
    public ResponseEntity<?> getLogs() {

        return ResponseEntity.ok(

                auditLogRepository
                        .findAllByOrderByTimestampDesc()
        );
    }

    // CREATE TEST AUDIT LOG
    @PostMapping("/test")
    public String createTestLog() {

        auditService.logAction(

                AuditAction.LOGIN,

                "admin@gov.in",

                "Admin logged into system"
        );

        return "Audit Log Created";
    }

    // EXPORT CSV
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportCsv() {

        List<AuditLog> logs =

                auditLogRepository
                        .findAllByOrderByTimestampDesc();

        StringBuilder csv =
                new StringBuilder();

        csv.append(

                "Timestamp,Action,Performed By,Details\n"
        );

        for (AuditLog log : logs) {

            csv.append(
                    log.getTimestamp()
            )

            .append(",")

            .append(
                    log.getAction()
            )

            .append(",")

            .append(
                    log.getPerformedBy()
            )

            .append(",")

            .append(

                    log.getDetails()
                            .replace(",", " ")
            )

            .append("\n");
        }

        return ResponseEntity.ok()

                .header(

                        HttpHeaders.CONTENT_DISPOSITION,

                        "attachment; filename=audit_logs.csv"
                )

                .contentType(

                        MediaType.parseMediaType(
                                "text/csv"
                        )
                )

                .body(

                        csv.toString()
                                .getBytes(
                                        StandardCharsets.UTF_8
                                )
                );
    }
}