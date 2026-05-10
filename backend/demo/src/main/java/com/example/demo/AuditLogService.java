package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void logAction(

            AuditAction action,

            String performedBy,

            String details
    ) {

        AuditLog log = new AuditLog();

        log.setAction(action);

        log.setPerformedBy(performedBy);

        log.setDetails(details);

        log.setTimestamp(
                LocalDateTime.now()
        );

        auditLogRepository.save(log);
    }
}