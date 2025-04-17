package com.example.microserviceone.exception;

public class NotEnoughAuthoritiesException extends RuntimeException{
    public NotEnoughAuthoritiesException() {
        super("You do not have the authorities to perform this action");
    }
}
