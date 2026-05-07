package com.example.demo;

import java.time.LocalDateTime;

public class CreateReviewRequest {

    private String caseId;

    private String assignedTo;

    private Department department;

    private PriorityLevel priority;

    private LocalDateTime dueDate;

    // NEW FIELDS

    private String title;

    private String fileName;

    private String summary;

    public CreateReviewRequest() {
    }

    public String getCaseId() {
        return caseId;
    }

    public void setCaseId(
            String caseId
    ) {
        this.caseId = caseId;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(
            String assignedTo
    ) {
        this.assignedTo = assignedTo;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(
            Department department
    ) {
        this.department = department;
    }

    public PriorityLevel getPriority() {
        return priority;
    }

    public void setPriority(
            PriorityLevel priority
    ) {
        this.priority = priority;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(
            LocalDateTime dueDate
    ) {
        this.dueDate = dueDate;
    }

    // TITLE

    public String getTitle() {
        return title;
    }

    public void setTitle(
            String title
    ) {
        this.title = title;
    }

    // FILE NAME

    public String getFileName() {
        return fileName;
    }

    public void setFileName(
            String fileName
    ) {
        this.fileName = fileName;
    }

    // SUMMARY

    public String getSummary() {
        return summary;
    }

    public void setSummary(
            String summary
    ) {
        this.summary = summary;
    }
}