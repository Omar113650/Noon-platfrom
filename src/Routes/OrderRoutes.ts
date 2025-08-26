import { Router } from "express";
import {
  CreateOrder,
  GetAllOrders,
  GetOrderById,
  UpdateOrder,
  DeleteOrder,
  CreateOrderItem,
  GetAllOrderItems,
  GetOrderItemsByOrderId,
  UpdateOrderItem,
  DeleteOrderItem,
  CalculateOrderTotal,
  UpdateOrderStatus,
} from "../Controllers/OrderController";

const router = Router();
import { ValidatedID } from "../middlewares/ValidateID";
// ---------------- Orders ----------------
router.post("/", CreateOrder);
router.get("/", GetAllOrders);
router.get("/:orderId", ValidatedID, GetOrderById);
router.put("/:orderId", ValidatedID, UpdateOrder);
router.delete("/:orderId", ValidatedID, DeleteOrder);

// ---------------- Order Items ----------------
router.post("/items", CreateOrderItem);
router.get("/items", GetAllOrderItems);
router.get("/:orderId/items", ValidatedID, GetOrderItemsByOrderId);
router.put("/items/:itemId", ValidatedID, UpdateOrderItem);
router.delete("/items/:itemId", ValidatedID, DeleteOrderItem);

// ---------------- Calculations ----------------
router.get("/:orderId/total", CalculateOrderTotal);
//

router.put("/:orderId/status", ValidatedID, UpdateOrderStatus);
export default router;
