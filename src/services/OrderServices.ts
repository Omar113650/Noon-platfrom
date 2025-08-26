import Order, { OrderCreateAttributes } from "../models/Order";
import OrderItem, { OrderItemCreateAttributes } from "../models/OrderItem";

import User from "../models/User";
import {orderQueue} from "../utils/queue";
import { Job } from "bull";
// ---------------- Orders ----------------
export const create_order = async (data: OrderCreateAttributes) => {
  console.log("Incoming order data:", data);
  
  const user = await User.findByPk(data.userId);
  if (!user) throw new Error("User not found");


  const newOrder = await Order.create(data);

  // إضافة المهمة للـ Queue لإرسال الإيميل
  await orderQueue.add({
    orderId: newOrder.id,
    userEmail: user.email,
  });
  const jobs = await orderQueue.getJobs([
    "waiting",
    "active",
    "completed",
    "failed",
  ]);
  console.log(
    "Jobs in queue:",
    jobs.map((j) => j.data)
  );

  return newOrder;
};

// جلب كل الطلبات
export const GetAll_order = async () => {
  return await Order.findAll();
};

// جلب طلب واحد بالـ ID
export const GetOrderByIdService = async (orderId: number) => {
  return await Order.findByPk(orderId);
};

// تحديث طلب
export const UpdateOrderService = async (
  orderId: number,
  data: Partial<OrderCreateAttributes>
) => {
  const order = await Order.findByPk(orderId);
  if (!order) return null;
  return await order.update(data);
};

// حذف طلب
export const DeleteOrderService = async (orderId: number) => {
  const order = await Order.findByPk(orderId);
  if (!order) return null;
  await order.destroy();
  return true;
};

// ---------------- Order Items ----------------

// إنشاء عنصر داخل الطلب
export const OrderItemCreated = async (data: OrderItemCreateAttributes) => {
  return await OrderItem.create(data);
};

// جلب كل عناصر الطلب مع بيانات الطلب
export const GetOrderItem = async () => {
  return await OrderItem.findAll({
    include: [
      {
        model: Order,
        as: "order",
        attributes: ["status", "totalAmount", "userId"],
      },
    ],
  });
};

// جلب عناصر الطلب بناءً على الـ orderId
export const GetOrderItemByOrderIdService = async (orderId: number) => {
  return await OrderItem.findAll({
    where: { orderId },
  });
};

// تحديث عنصر طلب
export const UpdateOrderItemService = async (
  orderItemId: number,
  data: Partial<OrderItemCreateAttributes>
) => {
  const orderItem = await OrderItem.findByPk(orderItemId);
  if (!orderItem) return null;
  return await orderItem.update(data);
};

// حذف عنصر طلب
export const DeleteOrderItemService = async (orderItemId: number) => {
  const orderItem = await OrderItem.findByPk(orderItemId);
  if (!orderItem) return null;
  await orderItem.destroy();
  return true;
};

// ---------------- Calculations ----------------

// حساب إجمالي الطلب
export const calculateOrderTotalService = async (
  orderId: number
): Promise<number> => {
  const orderItems = await GetOrderItemByOrderIdService(orderId);

  if (!orderItems.length) {
    return 0;
  }

  return orderItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};
// ***********************************************************************************************8
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import ExcelJS from "exceljs";
import dayjs from "dayjs";

// @desc   Export Orders as Excel
// @route  GET /api/orders/export-excel
// @access Public
export const ExportOrdersExcel = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "user", 
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!orders.length) {
      res.status(404).json({ message: "No orders found" });
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");

    worksheet.columns = [
      { header: "OrderID", key: "id", width: 12 },
      { header: "UserName", key: "name", width: 25 },
      { header: "UserEmail", key: "email", width: 30 },
      { header: "Status", key: "status", width: 15 },
      { header: "TotalAmount", key: "totalAmount", width: 15 },
      { header: "CreatedAt", key: "createdAt", width: 20 },
    ];

    orders.forEach((order) => {
      worksheet.addRow({
        id: order.id,
        name: order.userId ?? "N/A",
        email: order.userId ?? "N/A",
        status: order.status,
        totalAmount: order.totalAmount,
        createdAt: dayjs(order.createdAt).format("YYYY-MM-DD HH:mm"),
      });
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="orders-${Date.now()}.xlsx"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();
  }
);
