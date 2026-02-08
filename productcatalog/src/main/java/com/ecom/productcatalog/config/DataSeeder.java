package com.ecom.productcatalog.config;

import com.ecom.productcatalog.model.Category;
import com.ecom.productcatalog.model.Product;
import com.ecom.productcatalog.repository.CategoryRepository;
import com.ecom.productcatalog.repository.ProductRepository;
import com.ecom.productcatalog.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public DataSeeder(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        //Clear all existing data
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        //Create categories
        Category electronics = new Category();
        electronics.setName("Electronics");

        Category clothing = new Category();
        clothing.setName("Clothing");

        Category home = new Category();
        home.setName("Home and Kitchen");

        categoryRepository.saveAll(Arrays.asList(electronics, clothing, home));

        //Create products and associate with categories
        Product phone = new Product();
        phone.setName("Smartphone");
        phone.setDescription("Latest model smartphone with advanced features");
        phone.setImageUrl("https://placehold.co/600x400"); //schimbam imag
        phone.setPrice(999.99);
        phone.setCategory(electronics);

        Product laptop = new Product();
        laptop.setName("Laptop");
        laptop.setDescription("Gaming laptop with high performance");
        laptop.setImageUrl("https://placehold.co/600x400"); //schimbam imag
        laptop.setPrice(2599.99);
        laptop.setCategory(electronics);

        Product jacket = new Product();
        jacket.setName("Winter Jacket");
        jacket.setDescription("Warm and stylish winter jacket");
        jacket.setImageUrl("https://placehold.co/600x400"); //schimbam imag
        jacket.setPrice(120.99);
        jacket.setCategory(clothing);

        Product blender = new Product();
        blender.setName(" Blender");
        blender.setDescription("High-speed blender for smoothies and soups");
        blender.setImageUrl("https://placehold.co/600x400"); //schimbam imag
        blender.setPrice(29.99);
        blender.setCategory(home);

        productRepository.saveAll(Arrays.asList(phone, laptop, jacket, blender));


    }
}
