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

    @GetMapping("/products_by_added_date_desc")
    public List<ProductDto> getByDateDesc(){
        return productService.getProductsDescByCreationDate().stream().map(ProductDto::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/products_by_added_date_asc")
    public List<ProductDto> getByDateAsc(){
        return productService.getProductsAscByCreationDate().stream().map(ProductDto::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/products_by_price_desc")
    public List<ProductDto> getByPriceDesc(){
        return productService.getProductsDescByPrice().stream().map(ProductDto::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/products_price_asc")
    public List<ProductDto> getByPriceAsc(){
        return productService.getProductsAscByPrice().stream().map(ProductDto::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/products_by_in_stock_desc")
    public List<ProductDto> getByInStockDesc(){
        return productService.getProductsDescByInStock().stream().map(ProductDto::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/products_by_in_stock_asc")
    public List<ProductDto> getByInStockAsc(){
        return productService.getProductsAscByInStock().stream().map(ProductDto::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping("/new-product")
    public ResponseEntity addProduct(@RequestBody ProductDto productDto) {
        productService.addProduct(productDto);
        return ResponseEntity.ok("Product is saved");
    }
    @PostMapping("/delete-product-by-id/{id}")
    public ResponseEntity deleteProductById(@PathVariable Integer id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok("Product with id \"%d\" is deleted".formatted(id));
    }
    @PostMapping("/delete-product-by-name/{name}")
    public ResponseEntity deleteProductByName(@PathVariable String name) {
        productService.deleteProductByName(name);
        return ResponseEntity.ok("Product with name \"%s\" is deleted".formatted(name));
    }

    @PostMapping("/add-image/{productId}")
    public ResponseEntity addImageToProduct(@PathVariable Integer productId, @RequestParam String url) {
        productService.addImageToProduct(productId, url);
        return ResponseEntity.ok("Image \"%s\" is added to the product with id \"%d\"".formatted(url, productId));
    }

    @PostMapping("/delete-image/{productId}")
    public ResponseEntity deleteImageToProduct(@PathVariable Integer productId, @RequestParam String url) {
        productService.deleteImageFromProduct(productId, url);
        return ResponseEntity.ok("Image \"%s\" is deleted from the product with id \"%d\"".formatted(url, productId));
    }

}
