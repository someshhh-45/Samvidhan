package com.example.demo;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "pdf_annotations")
public class PdfAnnotation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID reviewTaskId;

    private String fieldName;

    private Integer pageNumber;

    private Double x;

    private Double y;

    private Double width;

    private Double height;

    public PdfAnnotation() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getReviewTaskId() {
        return reviewTaskId;
    }

    public void setReviewTaskId(UUID reviewTaskId) {
        this.reviewTaskId = reviewTaskId;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getWidth() {
        return width;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }
}