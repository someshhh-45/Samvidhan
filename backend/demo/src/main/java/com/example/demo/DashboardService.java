package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private ReviewTaskRepository reviewTaskRepository;

    public DashboardStatsResponse getDashboardStats() {

        DashboardStatsResponse response =
                new DashboardStatsResponse(

                        0,
                        0,
                        0,
                        0
                );

        response.setTotal(

                reviewTaskRepository.count()
        );

        response.setPending(

                reviewTaskRepository.findByStatus(
                        ReviewStatus.PENDING
                ).size()
        );

        response.setVerified(

                reviewTaskRepository.findByStatus(
                        ReviewStatus.VERIFIED
                ).size()
        );

        response.setRejected(

                reviewTaskRepository.findByStatus(
                        ReviewStatus.REJECTED
                ).size()
        );

        return response;
    }
}