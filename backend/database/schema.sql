CREATE DATABASE IF NOT EXISTS order_service;
USE order_service;

DROP TABLE IF EXISTS order_item;
DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
    id VARCHAR(36) PRIMARY KEY,
    customer_email VARCHAR(255),
    status ENUM('new', 'processed', 'canceled') DEFAULT 'new',
    created_at TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_customer_email (customer_email),
    INDEX idx_id (id)
);

CREATE TABLE order_item (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    sku VARCHAR(100) NOT NULL,
    qty INT NOT NULL CHECK (qty > 0),
    created_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES `order`(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_id (id)
);