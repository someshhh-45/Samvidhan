package com.example.demo;

import java.time.LocalDateTime;

public class ErrorResponse {

    private String error;

    private LocalDateTime timestamp;

    public ErrorResponse() {
    }

    public ErrorResponse(
            String error,
            LocalDateTime timestamp
    ) {

        this.error = error;
        this.timestamp = timestamp;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(
            LocalDateTime timestamp
    ) {
        this.timestamp = timestamp;
    }
}