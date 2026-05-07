package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/{email}")
    public ResponseEntity<?> getNotifications(
            @PathVariable String email
    ) {

        return ResponseEntity.ok(
                notificationRepository
                        .findByUserEmailOrderByCreatedAtDesc(
                                email
                        )
        );
    }
}