const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Define the count endpoints
router.get('/products/count', authController.countProducts);  // Endpoint to count products
router.get('/users/count', authController.countUsers);        // Endpoint to count users
router.get('/orders/count', authController.countOrders);      // Endpoint to count orders

// User Routes
router.get('/users', authController.getUsers);
router.post('/users', authController.createUser);
router.put('/users/:id', authController.updateUser);
router.delete('/users/:id', authController.deleteUser);

// Product Routes
router.get('/products', authController.getProducts);
router.post('/products', authController.createProduct);
router.put('/products/:id', authController.updateProduct);
router.delete('/products/:id', authController.deleteProduct);

// Order Routes
router.get('/orders', authController.getOrders);
router.post('/orders', authController.createOrder);
router.put('/orders/:id', authController.updateOrder);
router.delete('/orders/:id', authController.deleteOrder);

// Category Routes
router.get('/categories', authController.getCategories);
router.post('/categories', authController.createCategory);
router.put('/categories/:id', authController.updateCategory);
router.delete('/categories/:id', authController.deleteCategory);

// Review Routes
router.get('/reviews', authController.getReviews);
router.post('/reviews', authController.createReview);
router.put('/reviews/:id', authController.updateReview);
router.delete('/reviews/:id', authController.deleteReview);

module.exports = router;
