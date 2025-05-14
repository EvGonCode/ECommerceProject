package com.example.microserviceone;

import com.example.microserviceone.domain.Category;
import com.example.microserviceone.dtos.ProductDto;
import com.example.microserviceone.repositories.ProductRepo;
import com.example.microserviceone.services.ProductService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.servlet.ServletContext;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.assertj.core.api.Assertions.assertThat;


import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
class MicroserviceOneApplicationTests {
    @Autowired
    private WebApplicationContext webApplicationContext;
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private final MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private final static Integer amountOfProducts = 10; //min recommended 3

    @Autowired
    public MicroserviceOneApplicationTests(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    private ProductDto createSampleProductDto(int id) {
        ProductDto product = new ProductDto(
                "Product" + id,
                "Description for Product" + id,
                10.0 * id,
                List.of("http://example.com/product" + id + ".jpg"),
                "Brand" + id,
                id % 2 == 0,
                id % 3 == 0 ? Category.KEYBOARD : Category.SWITCH,
                LocalDateTime.now().minusDays(id),
                LocalDateTime.now().plusDays(id)
        );
        return product;
    }

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        for (int i = 1; i < amountOfProducts + 1; i++){
            productService.addProduct(createSampleProductDto(i));
        }
    }

    @AfterEach
    void tearDown() {
        productRepo.deleteAll();
        jdbcTemplate.execute("ALTER TABLE product ALTER COLUMN product_id RESTART WITH 1");
    }

    @Test
    public void givenWac_whenServletContext_thenItProvidesGreetController() {
        ServletContext servletContext = webApplicationContext.getServletContext();

        assertNotNull(servletContext);
        assertTrue(servletContext instanceof MockServletContext);
        assertNotNull(webApplicationContext.getBean("productController"));
    }

    @Test
    void testIndex() throws Exception {
        mockMvc.perform(get("/products")
                        .with(user("testuser").roles("USER")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(amountOfProducts));
    }

    @Test
    void testGetByDateDesc() throws Exception {
        String responseJson = mockMvc.perform(get("/products_by_added_date_desc")
                        .with(user("testuser").roles("USER")))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        List<ProductDto> products = objectMapper.readValue(responseJson, new TypeReference<>() {});

        for (int i = 0; i < products.size() - 1; i++) {
            assertThat(products.get(i).createdAt())
                    .isAfterOrEqualTo(products.get(i + 1).createdAt());
        }
    }

    @Test
    void testGetByDateAsc() throws Exception {
        String responseJson = mockMvc.perform(get("/products_by_added_date_asc")
                        .with(user("testuser").roles("USER")))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        List<ProductDto> products = objectMapper.readValue(responseJson, new TypeReference<>() {});

        for (int i = 0; i < products.size() - 1; i++) {
            assertThat(products.get(i).createdAt())
                    .isBeforeOrEqualTo(products.get(i + 1).createdAt());
        }
    }

    @Test
    void testGetByPriceDesc() throws Exception {
        String responseJson = mockMvc.perform(get("/products_by_price_desc")
                        .with(user("testuser").roles("USER")))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        List<ProductDto> products = objectMapper.readValue(responseJson, new TypeReference<>() {});

        for (int i = 0; i < products.size() - 1; i++) {
            assertThat(products.get(i).price())
                    .isGreaterThanOrEqualTo(products.get(i + 1).price());
        }
    }

    @Test
    void testGetByPriceAsc() throws Exception {
        String responseJson = mockMvc.perform(get("/products_price_asc")
                        .with(user("testuser").roles("USER")))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        List<ProductDto> products = objectMapper.readValue(responseJson, new TypeReference<>() {});

        for (int i = 0; i < products.size() - 1; i++) {
            assertThat(products.get(i).price())
                    .isLessThanOrEqualTo(products.get(i + 1).price());
        }
    }

    @Test
    void testGetByInStockDesc() throws Exception {
        mockMvc.perform(get("/products_by_in_stock_desc")
                        .with(user("testuser").roles("USER")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].inStock").value(true));
    }

    @Test
    void testGetByInStockAsc() throws Exception {
        mockMvc.perform(get("/products_by_in_stock_asc")
                        .with(user("testuser").roles("USER")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].inStock").value(false));
    }

    @Test
    void testAddProduct() throws Exception {
        mockMvc.perform(post("/new-product")
                        .with(user("testuser").roles("ADMIN"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createSampleProductDto(amountOfProducts + 1))))
                .andExpect(status().isOk())
                .andExpect(content().string("Product is saved"));
    }

    @Test
    void testDeleteProductById() throws Exception {
        mockMvc.perform(post("/delete-product-by-id/{id}", 1)
                        .with(user("testuser").roles("ADMIN")))
                .andExpect(status().isOk())
                .andExpect(content().string("Product with id \"1\" is deleted"));
    }

    @Test
    void testDeleteProductByName() throws Exception {
        mockMvc.perform(post("/delete-product-by-name/{name}", "Product1")
                        .with(user("testuser").roles("ADMIN")))
                .andExpect(status().isOk())
                .andExpect(content().string("Product with name \"Product1\" is deleted"));
    }

    @Test
    void testAddImageToProduct() throws Exception {
        mockMvc.perform(post("/add-image/1")
                        .param("url", "http://example.com/image3.jpg")
                        .with(user("testuser").roles("ADMIN")))
                .andExpect(status().isOk())
                .andExpect(content().string("Image \"http://example.com/image3.jpg\" is added to the product with id \"1\""));
    }

    @Test
    void testDeleteImageFromProduct() throws Exception {
        String image_url = "http://example.com/product" + 1 + ".jpg";
        mockMvc.perform(post("/delete-image/1")
                        .param("url",image_url)
                        .with(user("testuser").roles("ADMIN")))
                .andExpect(status().isOk())
                .andExpect(content().string("Image \"" + image_url + "\" is deleted from the product with id \"1\""));
    }
}
