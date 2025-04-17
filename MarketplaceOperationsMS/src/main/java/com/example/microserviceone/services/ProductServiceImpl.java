package com.example.microserviceone.services;

import com.example.microserviceone.domain.Product;
import com.example.microserviceone.dtos.ProductDto;
import com.example.microserviceone.exception.NoSuchImageException;
import com.example.microserviceone.exception.NoSuchProductInShopException;
import com.example.microserviceone.repositories.ProductRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final ProductRepo productRepo;

    public List<Product> findAll(){
        return productRepo.findAll();
    }

    public void addProduct(ProductDto pDto) {
        Product product = new Product();
        product.setName(pDto.name());
        product.setDescription(pDto.description());
        product.setPrice(pDto.price());
        product.setImages(pDto.images());
        product.setBrand(pDto.brand());
        product.setInStock(pDto.inStock());
        product.setCategory(pDto.category());
        productRepo.save(product);
    }

    public void deleteProductById(Integer productId) {
        Product product = productRepo.findById(productId).orElseThrow(
                () -> new NoSuchProductInShopException(productId)
        );
        productRepo.delete(product);
    }

    public void deleteProductByName(String productname) {
        Product product = productRepo.findByName(productname).orElseThrow(
                () -> new NoSuchProductInShopException(productname)
        );
        productRepo.delete(product);
    }

    @Override
    public void addImageToProduct(Integer productId, String imageUrl) {
        Product product = productRepo.findById(productId).orElseThrow(
                () -> new NoSuchProductInShopException(productId)
        );


        List<String> images = product.getImages();
        if (!images.contains(imageUrl)) {
            images.add(imageUrl);
            product.setImages(images);
            productRepo.save(product);
        }
    }

    @Override
    public void deleteImageFromProduct(Integer productId, String imageUrl) {
        Product product = productRepo.findById(productId).orElseThrow(
                () -> new NoSuchProductInShopException(productId)
        );

        List<String> images = product.getImages();
        if (!images.contains(imageUrl)) {
            throw new NoSuchImageException(imageUrl, productId);
        }else{
            images.remove(imageUrl);
            product.setImages(images);
            productRepo.save(product);
        }
    }

    public Product findById(Integer productId){
        return productRepo.findById(productId).get();
    }

    public Product findByName(String productName){
        return productRepo.findByName(productName).get();
    }
}
