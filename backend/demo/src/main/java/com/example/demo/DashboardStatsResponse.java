package com.example.demo;

public class DashboardStatsResponse {

    private long total;

    private long pending;

    private long verified;

    private long rejected;

    public DashboardStatsResponse(
            long total,
            long pending,
            long verified,
            long rejected
    ) {

        this.total = total;
        this.pending = pending;
        this.verified = verified;
        this.rejected = rejected;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getPending() {
        return pending;
    }

    public void setPending(long pending) {
        this.pending = pending;
    }

    public long getVerified() {
        return verified;
    }

    public void setVerified(long verified) {
        this.verified = verified;
    }

    public long getRejected() {
        return rejected;
    }

    public void setRejected(long rejected) {
        this.rejected = rejected;
    }
}