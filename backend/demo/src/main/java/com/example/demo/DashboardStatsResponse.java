package com.example.demo;

public class DashboardStatsResponse {

    private long totalReviews;

    private long pendingReviews;

    private long assignedReviews;

    private long verifiedReviews;

    private long rejectedReviews;

    public DashboardStatsResponse() {
    }

    public long getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(long totalReviews) {
        this.totalReviews = totalReviews;
    }

    public long getPendingReviews() {
        return pendingReviews;
    }

    public void setPendingReviews(long pendingReviews) {
        this.pendingReviews = pendingReviews;
    }

    public long getAssignedReviews() {
        return assignedReviews;
    }

    public void setAssignedReviews(long assignedReviews) {
        this.assignedReviews = assignedReviews;
    }

    public long getVerifiedReviews() {
        return verifiedReviews;
    }

    public void setVerifiedReviews(long verifiedReviews) {
        this.verifiedReviews = verifiedReviews;
    }

    public long getRejectedReviews() {
        return rejectedReviews;
    }

    public void setRejectedReviews(long rejectedReviews) {
        this.rejectedReviews = rejectedReviews;
    }
}