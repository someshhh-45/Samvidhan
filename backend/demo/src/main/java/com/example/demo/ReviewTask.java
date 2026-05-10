package com.example.demo;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "review_tasks")
public class ReviewTask {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // REAL CASE RELATION
    @ManyToOne
    @JoinColumn(
            name = "case_entity_id",
            nullable = false
    )
    private Case caseEntity;

    @Column(nullable = false)
    private String assignedTo;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReviewStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Department department;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PriorityLevel priority;

    @Column(nullable = false)
    private LocalDateTime dueDate;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // OPTIONAL METADATA

    private String title;

    private String fileName;

    @Column(length = 5000)
    private String summary;

    // AI CONFIDENCE SCORE
    private Double confidenceScore;

    // HUMAN VERIFICATION
    private Boolean humanVerified = false;

    public ReviewTask() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    // CASE ENTITY

    public Case getCaseEntity() {
        return caseEntity;
    }

    public void setCaseEntity(
            Case caseEntity
    ) {
        this.caseEntity =
                caseEntity;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(
            String assignedTo
    ) {
        this.assignedTo =
                assignedTo;
    }

    public ReviewStatus getStatus() {
        return status;
    }

    public void setStatus(
            ReviewStatus status
    ) {
        this.status = status;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(
            Department department
    ) {
        this.department =
                department;
    }

    public PriorityLevel getPriority() {
        return priority;
    }

    public void setPriority(
            PriorityLevel priority
    ) {
        this.priority =
                priority;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(
            LocalDateTime dueDate
    ) {
        this.dueDate =
                dueDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt =
                createdAt;
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
        this.fileName =
                fileName;
    }

    // SUMMARY

    public String getSummary() {
        return summary;
    }

    public void setSummary(
            String summary
    ) {
        this.summary =
                summary;
    }

    // CONFIDENCE SCORE

    public Double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(
            Double confidenceScore
    ) {
        this.confidenceScore =
                confidenceScore;
    }

    // HUMAN VERIFIED

    public Boolean getHumanVerified() {

        return humanVerified;
    }

    public void setHumanVerified(
            Boolean humanVerified
    ) {

        this.humanVerified =
                humanVerified;
    }

    @PrePersist
    public void prePersist() {

        if (createdAt == null) {

            createdAt =
                    LocalDateTime.now();
        }

        if (status == null) {

            status =
                    ReviewStatus.PENDING;
        }

        if (humanVerified == null) {

            humanVerified = false;
        }
    }
}