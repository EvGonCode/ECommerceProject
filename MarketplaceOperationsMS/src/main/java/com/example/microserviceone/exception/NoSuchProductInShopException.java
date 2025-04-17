package com.example.microserviceone.exception;

public class NoSuchProductInShopException extends RuntimeException{

    public NoSuchProductInShopException(Integer productId) {
        super("Shop doesn't have product with id \"%d\"".formatted(productId));
    }
    public NoSuchProductInShopException(String productName) {
        super("Shop doesn't have product with name \"%s\"".formatted(productName));
    }
}
