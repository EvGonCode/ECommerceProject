package com.authentication_service.exception;

public class DuplicateUserException extends RuntimeException{
    public DuplicateUserException(String message) {
        super("User \"%s\" already exist".formatted(message));
    }
}
