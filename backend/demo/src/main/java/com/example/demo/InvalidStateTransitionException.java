package com.example.demo;

public class InvalidStateTransitionException
        extends RuntimeException {

    public InvalidStateTransitionException(
            String message
    ) {
        super(message);
    }
}