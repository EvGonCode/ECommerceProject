package com.example.microserviceone.repositories;

import com.example.microserviceone.domain.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product, Integer> {
    Optional<Product> findByName(String name);
    List<Product> findAll(Sort sort);
    Optional<Product> findById(Integer productId);
}
