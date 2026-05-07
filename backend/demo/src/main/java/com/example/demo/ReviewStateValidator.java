package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public class ReviewStateValidator {

    public void validateTransition(
            ReviewStatus currentStatus,
            ReviewStatus newStatus
    ) {

        // PENDING → ASSIGNED

        if (
                currentStatus == ReviewStatus.PENDING
                        &&
                        newStatus == ReviewStatus.ASSIGNED
        ) {
            return;
        }

        // ASSIGNED → VERIFIED

        if (
                currentStatus == ReviewStatus.ASSIGNED
                        &&
                        newStatus == ReviewStatus.VERIFIED
        ) {
            return;
        }

        // ASSIGNED → REJECTED

        if (
                currentStatus == ReviewStatus.ASSIGNED
                        &&
                        newStatus == ReviewStatus.REJECTED
        ) {
            return;
        }

        throw new InvalidStateTransitionException(
                "Invalid status transition from "
                        + currentStatus
                        + " to "
                        + newStatus
        );
    }
}