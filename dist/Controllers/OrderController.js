"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateOrderTotal = exports.DeleteOrderItem = exports.UpdateOrderItem = exports.GetOrderItemsByOrderId = exports.GetAllOrderItems = exports.CreateOrderItem = exports.DeleteOrder = exports.UpdateOrder = exports.GetOrderById = exports.GetAllOrders = exports.CreateOrder = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const constant_1 = require("../utils/constant");
const OrderServices_1 = require("../services/OrderServices");
// ---------------- Orders ----------------
// إضافة طلب جديد
exports.CreateOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield (0, OrderServices_1.create_order)(req.body);
    res.status(constant_1.HTTP_STATUS.CREATED).json({
        message: "Order created successfully",
        data: order,
    });
}));
// جلب كل الطلبات
exports.GetAllOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, OrderServices_1.GetAll_order)();
    if (!orders.length) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({
            message: "No orders found",
        });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: "Orders fetched successfully",
        data: orders,
    });
}));
// جلب طلب بالـ ID
exports.GetOrderById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield (0, OrderServices_1.GetOrderByIdService)(Number(req.params.orderId));
    if (!order) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({
            message: "Order not found",
        });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json(order);
}));
// تحديث طلب
exports.UpdateOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield (0, OrderServices_1.UpdateOrderService)(Number(req.params.orderId), req.body);
    if (!order) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({
            message: "Order not found",
        });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: "Order updated successfully",
        data: order,
    });
}));
// حذف طلب
exports.DeleteOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield (0, OrderServices_1.DeleteOrderService)(Number(req.params.orderId));
    if (!deleted) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({
            message: "Order not found",
        });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: "Order deleted successfully",
    });
}));
// ---------------- Order Items ----------------
// إضافة عنصر للطلب
exports.CreateOrderItem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItem = yield (0, OrderServices_1.OrderItemCreated)(req.body);
    res.status(constant_1.HTTP_STATUS.CREATED).json({
        message: "Order item created successfully",
        data: orderItem,
    });
}));
// جلب كل عناصر الطلب
exports.GetAllOrderItems = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield (0, OrderServices_1.GetOrderItem)();
    if (!items.length) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({
            message: "No order items found",
        });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: "Order items fetched successfully",
        data: items,
    });
}));
// جلب عناصر طلب محدد
exports.GetOrderItemsByOrderId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield (0, OrderServices_1.GetOrderItemByOrderIdService)(Number(req.params.orderId));
    if (!items.length) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({
            message: "No order items found",
        });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json(items);
}));
// تحديث عنصر طلب
exports.UpdateOrderItem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield (0, OrderServices_1.UpdateOrderItemService)(Number(req.params.itemId), req.body);
    if (!updated) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({
            message: "Order item not found",
        });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: "Order item updated successfully",
        data: updated,
    });
}));
// حذف عنصر طلب
exports.DeleteOrderItem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield (0, OrderServices_1.DeleteOrderItemService)(Number(req.params.itemId));
    if (!deleted) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({
            message: "Order item not found",
        });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: "Order item deleted successfully",
    });
}));
// ---------------- Calculations ----------------
// حساب السعر الكلي للأوردر من الـ DB
exports.CalculateOrderTotal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield (0, OrderServices_1.calculateOrderTotalService)(Number(req.params.orderId));
    if (total === 0) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({
            message: "No order items found to calculate total",
        });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: "Order total calculated successfully",
        total,
    });
}));
// import { redlock } from "../config/redis";
// import orderQueue from "../queues/orderQueue"; // افترض عندك queue مهيأ للطلبات
// import asyncHandler from "express-async-handler";
// import { Request, Response } from "express";
// import { create_order, OrderItemCreated } from "../services/OrderServices";
// import { HTTP_STATUS } from "../utils/constant";
// export const CreateOrder = asyncHandler(async (req: Request, res: Response) => {
//   const { userId, items } = req.body; // نفترض الطلب فيه userId وعناصر
//   if (!items || !Array.isArray(items) || items.length === 0) {
//     res.status(HTTP_STATUS.BAD_REQUEST).json({
//       message: "Order items are required",
//     });
//     return;
//   }
//   const locks = [];
//   try {
//     // 1. أخد Lock لكل منتج (productId) في الطلب
//     for (const item of items) {
//       const resource = `locks:product:${item.productId}`;
//       const lock = await redlock.acquire([resource], 10000); // lock لمدة 10 ثواني
//       locks.push(lock);
//     }
//     // 2. إنشاء الطلب بدون totalAmount و status (عشان مش موجودين في الـ DB)
//     const order = await create_order({ userId });
//     // 3. إضافة كل عناصر الطلب (Order Items)
//     for (const item of items) {
//       await OrderItemCreated({
//         orderId: order.id,
//         productId: item.productId,
//         quantity: item.quantity,
//         price: item.price,
//       });
//     }
//     // 4. حساب المجموع الكلي (sum price * quantity) بشكل يدوي
//     const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
//     // 5. تحديث الطلب بحقل totalAmount (لو حابب تخزنه)
//     // لو مش موجود في DB يمكن تحذفه أو تخزنه في مكان تاني
//     // ممكن تعمل تحديث أو تعدل حسب حاجتك، لو مش موجود احذف السطر التالي
//     // await order.update({ totalAmount }); // لو عندك حقل في DB، غير كده احذف السطر
//     // 6. إضافة job في queue لمعالجة الطلب أو إرسال تأكيد
//     await orderQueue.add({ orderId: order.id, userId, totalAmount, items });
//     // 7. إرسال رد النجاح
//     res.status(HTTP_STATUS.CREATED).json({
//       message: "Order created successfully",
//       data: { orderId: order.id, userId, totalAmount, items },
//     });
//   } catch (error) {
//     res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
//       message: "Failed to create order, product might be locked or other error",
//       error: error.message,
//     });
//   } finally {
//     // release all locks
//     for (const lock of locks) {
//       try {
//         await lock.release();
//       } catch (e) {
//         // ignore release error
//       }
//     }
//   }
// });
