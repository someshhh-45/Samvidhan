package com.example.demo;

import org.springframework.stereotype.Service;

@Service
public class DepartmentAccessService {

    public boolean canAccess(
            User user,
            ReviewTask reviewTask
    ) {

        // ADMIN CAN ACCESS EVERYTHING

        if (
                user.getRole() == Role.ADMIN
        ) {
            return true;
        }

        // SAME DEPARTMENT ONLY

        return user.getDepartment()
                ==
                reviewTask.getDepartment();
    }
}