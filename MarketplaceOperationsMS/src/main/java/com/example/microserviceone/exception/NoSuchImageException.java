package com.example.microserviceone.exception;

public class NoSuchImageException extends RuntimeException{
    public NoSuchImageException(String imageUrl, Integer productName) {
        super("Product \"%s\" don't have image \"%s\"".formatted(productName, imageUrl));
    }
}
