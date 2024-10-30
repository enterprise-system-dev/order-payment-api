const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController');

router.post('/orders', OrderController.placeOrder);
router.get('/orders', OrderController.loadAllOrders);
router.put('/orders/:id', OrderController.updateOrderState);
router.delete('/orders/:id', OrderController.deleteOrderByAdmin);

module.exports=router;