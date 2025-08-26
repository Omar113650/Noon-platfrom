"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../Controllers/OrderController");
const router = (0, express_1.Router)();
// ---------------- Orders ----------------
router.post("/", OrderController_1.CreateOrder);
router.get("/", OrderController_1.GetAllOrders);
router.get("/:orderId", OrderController_1.GetOrderById);
router.put("/:orderId", OrderController_1.UpdateOrder);
router.delete("/:orderId", OrderController_1.DeleteOrder);
// ---------------- Order Items ----------------
router.post("/items", OrderController_1.CreateOrderItem);
router.get("/items", OrderController_1.GetAllOrderItems);
router.get("/:orderId/items", OrderController_1.GetOrderItemsByOrderId);
router.put("/items/:itemId", OrderController_1.UpdateOrderItem);
router.delete("/items/:itemId", OrderController_1.DeleteOrderItem);
// ---------------- Calculations ----------------
router.get("/:orderId/total", OrderController_1.CalculateOrderTotal);
exports.default = router;
