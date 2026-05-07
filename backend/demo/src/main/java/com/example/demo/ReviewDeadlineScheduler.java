package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ReviewDeadlineScheduler {

    @Autowired
    private DeadlineService deadlineService;

    // RUN EVERY 1 MINUTE

    @Scheduled(fixedRate = 60000)
    public void runDeadlineChecks() {

        deadlineService.checkDeadlines();
    }
}