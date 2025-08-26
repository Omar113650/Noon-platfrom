import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/constant";
import {
  create_order,
  GetAll_order,
  GetOrderByIdService,
  UpdateOrderService,
  DeleteOrderService,
  OrderItemCreated,
  GetOrderItem,
  GetOrderItemByOrderIdService,
  UpdateOrderItemService,
  DeleteOrderItemService,
  calculateOrderTotalService,
} from "../services/OrderServices";
 import Order from "../models/Order"
// ---------------- Orders ----------------

// إضافة طلب جديد
export const CreateOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await create_order(req.body);
  res.status(HTTP_STATUS.CREATED).json({
    message: "Order created successfully",
    data: order,
  });
});

// جلب كل الطلبات
export const GetAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await GetAll_order();
    if (!orders.length) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "No orders found",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  }
);

// جلب طلب بالـ ID
export const GetOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await GetOrderByIdService(Number(req.params.orderId));
    if (!order) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Order not found",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json(order);
  }
);

// تحديث طلب
export const UpdateOrder = asyncHandler(async (req: Request, res: Response) => {
  const order = await UpdateOrderService(Number(req.params.orderId), req.body);
  if (!order) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Order not found",
    });
    return;
  }
  res.status(HTTP_STATUS.OK).json({
    message: "Order updated successfully",
    data: order,
  });
});

// حذف طلب
export const DeleteOrder = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await DeleteOrderService(Number(req.params.orderId));
  if (!deleted) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      message: "Order not found",
    });
    return;
  }
  res.status(HTTP_STATUS.OK).json({
    message: "Order deleted successfully",
  });
});

// ---------------- Order Items ----------------

// إضافة عنصر للطلب
export const CreateOrderItem = asyncHandler(
  async (req: Request, res: Response) => {
    const orderItem = await OrderItemCreated(req.body);
    res.status(HTTP_STATUS.CREATED).json({
      message: "Order item created successfully",
      data: orderItem,
    });
  }
);

// جلب كل عناصر الطلب
export const GetAllOrderItems = asyncHandler(
  async (req: Request, res: Response) => {
    const items = await GetOrderItem();
    if (!items.length) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "No order items found",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Order items fetched successfully",
      data: items,
    });
  }
);

// جلب عناصر طلب محدد
export const GetOrderItemsByOrderId = asyncHandler(
  async (req: Request, res: Response) => {
    const items = await GetOrderItemByOrderIdService(
      Number(req.params.orderId)
    );
    if (!items.length) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "No order items found",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json(items);
  }
);

// تحديث عنصر طلب
export const UpdateOrderItem = asyncHandler(
  async (req: Request, res: Response) => {
    const updated = await UpdateOrderItemService(
      Number(req.params.itemId),
      req.body
    );
    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Order item not found",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Order item updated successfully",
      data: updated,
    });
  }
);

// حذف عنصر طلب
export const DeleteOrderItem = asyncHandler(
  async (req: Request, res: Response) => {
    const deleted = await DeleteOrderItemService(Number(req.params.itemId));
    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Order item not found",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Order item deleted successfully",
    });
  }
);

// ---------------- Calculations ----------------

// حساب السعر الكلي للأوردر من الـ DB
export const CalculateOrderTotal = asyncHandler(
  async (req: Request, res: Response) => {
    const total = await calculateOrderTotalService(Number(req.params.orderId));
    if (total === 0) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "No order items found to calculate total",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: "Order total calculated successfully",
      total,
    });
  }
);









// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


import { notifyUser } from "../realtime/ws";

export enum OrderStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

export const UpdateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.orderId);
  const { status } = req.body as { status: OrderStatus };

  const order = await Order.findByPk(id);
  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  if (!Object.values(OrderStatus).includes(status)) {
    res.status(400).json({ message: "Invalid status" });
    return;
  }

  order.status = status;
  await order.save();

  // ابعت نوتيفيكشن للمستخدم صاحب الأوردر
  notifyUser(order.userId, {
    type: "order_status",
    orderId: order.id,
    status: order.status,
    message:
      order.status === OrderStatus.SHIPPED
        ? " تم شحن طلبك"
        : order.status === OrderStatus.DELIVERED
        ? " تم تسليم طلبك"
        : `ℹ حالة طلبك: ${order.status}`,
    at: new Date().toISOString(),
  });

  res.json({ message: "Order status updated", data: order });
});
