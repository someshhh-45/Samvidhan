package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(
            String userEmail,
            String title,
            String message
    ) {

        Notification notification =
                new Notification();

        notification.setUserEmail(
                userEmail
        );

        notification.setTitle(
                title
        );

        notification.setMessage(
                message
        );

        notification.setReadStatus(false);

        notification.setCreatedAt(
                LocalDateTime.now()
        );

        notificationRepository.save(notification);
    }
}