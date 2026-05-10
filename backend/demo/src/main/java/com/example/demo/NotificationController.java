package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin("*")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/{userEmail}")
    public ResponseEntity<?> getNotifications(
            @PathVariable String userEmail
    ) {

        return ResponseEntity.ok(

                notificationRepository
                        .findByUserEmailOrderByCreatedAtDesc(
                                userEmail
                        )
        );
    }
}