package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewTaskRepository
        extends JpaRepository<ReviewTask, UUID> {

    List<ReviewTask> findByStatus(
            ReviewStatus status
    );
}