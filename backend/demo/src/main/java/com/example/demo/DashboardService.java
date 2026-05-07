package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private ReviewTaskRepository reviewTaskRepository;

    public DashboardStatsResponse getDashboardStats() {

        DashboardStatsResponse response =
                new DashboardStatsResponse();

        response.setTotalReviews(
                reviewTaskRepository.count()
        );

        response.setPendingReviews(
                reviewTaskRepository.findByStatus(
                        ReviewStatus.PENDING
                ).size()
        );

        response.setAssignedReviews(
                reviewTaskRepository.findByStatus(
                        ReviewStatus.ASSIGNED
                ).size()
        );

        response.setVerifiedReviews(
                reviewTaskRepository.findByStatus(
                        ReviewStatus.VERIFIED
                ).size()
        );

        response.setRejectedReviews(
                reviewTaskRepository.findByStatus(
                        ReviewStatus.REJECTED
                ).size()
        );

        return response;
    }
}