package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PdfHighlightRepository
        extends JpaRepository<PdfHighlight, Long> {

    List<PdfHighlight> findByCaseId(
            Long caseId
    );
}