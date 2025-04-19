package com.authentication_service.exception;

public class NoSuchUserException extends RuntimeException{
    public NoSuchUserException(String message) {
        super("User \"%s\" doesn't exist".formatted(message));
    }
}
