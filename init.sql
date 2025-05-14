create database testbase;
use testbase;

CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  login VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- Main Product table
CREATE TABLE Product (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DOUBLE NOT NULL,
  brand VARCHAR(100),
  in_stock BOOLEAN DEFAULT TRUE,
  category ENUM('KEYBOARD', 'SWITCH'),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Product_Images (
  product_id INT NOT NULL,
  image_url TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Product(product_id)
);