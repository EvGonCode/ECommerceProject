package com.example.microserviceone.services;

import com.example.microserviceone.domain.Product;
import com.example.microserviceone.dtos.ProductDto;

import java.util.List;

public interface ProductService {
    List<Product> findAll();
    Product findById(Integer productId);
    Product findByName(String productName);
    void addProduct(ProductDto productDto);
    public void deleteProductById(Integer productId);
    public void deleteProductByName(String productName);
    public void deleteImageFromProduct(Integer productId, String imageUrl);
    void addImageToProduct(Integer productId, String imageUrl);
}
