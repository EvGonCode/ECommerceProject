package com.example.microserviceone.services;

import com.example.microserviceone.domain.Product;
import com.example.microserviceone.dtos.ProductDto;

import java.util.List;

public interface ProductService {
    List<Product> findAll();
    Product findById(Integer productId);
    Product findByName(String productName);
    List<Product> getProductsAscByPrice();
    List<Product> getProductsDescByPrice();
    List<Product> getProductsAscByCreationDate();
    List<Product> getProductsDescByCreationDate();
    List<Product> getProductsAscByInStock();
    List<Product> getProductsDescByInStock();
    void addProduct(ProductDto productDto);
    public void deleteProductById(Integer productId);
    public void deleteProductByName(String productName);
    public void deleteImageFromProduct(Integer productId, String imageUrl);
    void addImageToProduct(Integer productId, String imageUrl);

}
