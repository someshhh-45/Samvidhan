package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeadlineService {

    @Autowired
    private ReviewTaskRepository reviewTaskRepository;

    @Autowired
    private NotificationService notificationService;

    public void checkDeadlines() {

        List<ReviewTask> assignedReviews =
                reviewTaskRepository.findByStatus(
                        ReviewStatus.ASSIGNED
                );

        for (ReviewTask review : assignedReviews) {

            LocalDateTime createdAt =
                    review.getCreatedAt();

            if (createdAt == null) {
                continue;
            }

            long hours =
                    Duration.between(
                            createdAt,
                            LocalDateTime.now()
                    ).toHours();

            // TESTING REMINDER

            if (hours >= 0) {

                notificationService.createNotification(
                        review.getAssignedTo(),
                        "Review Deadline Approaching",
                        "Review task nearing deadline: "
                                + review.getId()
                );
            }

            // TESTING OVERDUE

            if (hours >= 0) {

                notificationService.createNotification(
                        review.getAssignedTo(),
                        "Review Overdue",
                        "Review task overdue: "
                                + review.getId()
                );
            }
        }
    }
}