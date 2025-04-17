package com.example.microserviceone.controllers;

import com.example.microserviceone.dtos.ProductDto;
import com.example.microserviceone.services.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;


    @GetMapping("/products")
    public List<ProductDto> index(){
        return productService.findAll().stream().map(ProductDto::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping("/new-product")
    public ResponseEntity addProduct(@RequestBody ProductDto productDto) {
        productService.addProduct(productDto);
        return ResponseEntity.ok("Product is saved");
    }
    @PostMapping("/delete-product/{id}")
    public ResponseEntity deleteProductById(@PathVariable Integer id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok("Product with id \"%d\" is deleted".formatted(id));
    }
    @PostMapping("/delete-product/{name}")
    public ResponseEntity deleteProductByName(@PathVariable String name) {
        productService.deleteProductByName(name);
        return ResponseEntity.ok("Product with name \"%s\" is deleted".formatted(name));
    }

    @PostMapping("/add-image/{productId}/{url}")
    public ResponseEntity addImageToProduct(@PathVariable Integer productId, @PathVariable String url) {
        productService.addImageToProduct(productId, url);
        return ResponseEntity.ok("Image \"%s\" is added to the product with id \"%d\"".formatted(url, productId));
    }

    @PostMapping("/delete-image/{productId}/{url}")
    public ResponseEntity deleteImageToProduct(@PathVariable Integer productId, @PathVariable String url) {
        productService.deleteImageFromProduct(productId, url);
        return ResponseEntity.ok("Image \"%s\" is deleted from the product with id \"%d\"".formatted(url, productId));
    }

}
