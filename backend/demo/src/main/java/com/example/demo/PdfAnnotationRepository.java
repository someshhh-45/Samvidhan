package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PdfAnnotationRepository
        extends JpaRepository<PdfAnnotation, UUID> {

    List<PdfAnnotation> findByReviewTaskId(
            UUID reviewTaskId
    );
}