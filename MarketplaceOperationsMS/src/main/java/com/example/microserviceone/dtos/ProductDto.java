package com.example.microserviceone.dtos;

import com.example.microserviceone.domain.Category;
import com.example.microserviceone.domain.Product;

import java.time.LocalDateTime;
import java.util.List;

public record ProductDto(
        String name,
        String description,
        Double price,
        List<String> images,
        String brand,
        boolean inStock,
        Category category,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static ProductDto toDto(Product product) {
        return new ProductDto(
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImages(),
                product.getBrand(),
                product.isInStock(),
                product.getCategory(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }
}

