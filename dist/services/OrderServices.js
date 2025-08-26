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
exports.calculateOrderTotalService = exports.DeleteOrderItemService = exports.UpdateOrderItemService = exports.GetOrderItemByOrderIdService = exports.GetOrderItem = exports.OrderItemCreated = exports.DeleteOrderService = exports.UpdateOrderService = exports.GetOrderByIdService = exports.GetAll_order = exports.create_order = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const OrderItem_1 = __importDefault(require("../models/OrderItem"));
const User_1 = __importDefault(require("../models/User"));
const queue_1 = __importDefault(require("../utils/queue"));
// ---------------- Orders ----------------
const create_order = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Incoming order data:", data);
    // التأكد من وجود المستخدم
    const user = yield User_1.default.findByPk(data.userId);
    if (!user)
        throw new Error("User not found");
    // إنشاء الأوردر
    const newOrder = yield Order_1.default.create(data);
    // إضافة المهمة للـ Queue لإرسال الإيميل
    yield queue_1.default.add({
        orderId: newOrder.id,
        userEmail: user.email,
    });
    const jobs = yield queue_1.default.getJobs(["waiting", "active", "completed", "failed"]);
    console.log("Jobs in queue:", jobs.map(j => j.data));
    return newOrder;
});
exports.create_order = create_order;
// جلب كل الطلبات
const GetAll_order = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Order_1.default.findAll();
});
exports.GetAll_order = GetAll_order;
// جلب طلب واحد بالـ ID
const GetOrderByIdService = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Order_1.default.findByPk(orderId);
});
exports.GetOrderByIdService = GetOrderByIdService;
// تحديث طلب
const UpdateOrderService = (orderId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findByPk(orderId);
    if (!order)
        return null;
    return yield order.update(data);
});
exports.UpdateOrderService = UpdateOrderService;
// حذف طلب
const DeleteOrderService = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findByPk(orderId);
    if (!order)
        return null;
    yield order.destroy();
    return true;
});
exports.DeleteOrderService = DeleteOrderService;
// ---------------- Order Items ----------------
// إنشاء عنصر داخل الطلب
const OrderItemCreated = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield OrderItem_1.default.create(data);
});
exports.OrderItemCreated = OrderItemCreated;
// جلب كل عناصر الطلب مع بيانات الطلب
const GetOrderItem = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield OrderItem_1.default.findAll({
        include: [
            {
                model: Order_1.default,
                as: "order",
                attributes: ["status", "totalAmount", "userId"],
            },
        ],
    });
});
exports.GetOrderItem = GetOrderItem;
// جلب عناصر الطلب بناءً على الـ orderId
const GetOrderItemByOrderIdService = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield OrderItem_1.default.findAll({
        where: { orderId },
    });
});
exports.GetOrderItemByOrderIdService = GetOrderItemByOrderIdService;
// تحديث عنصر طلب
const UpdateOrderItemService = (orderItemId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItem = yield OrderItem_1.default.findByPk(orderItemId);
    if (!orderItem)
        return null;
    return yield orderItem.update(data);
});
exports.UpdateOrderItemService = UpdateOrderItemService;
// حذف عنصر طلب
const DeleteOrderItemService = (orderItemId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItem = yield OrderItem_1.default.findByPk(orderItemId);
    if (!orderItem)
        return null;
    yield orderItem.destroy();
    return true;
});
exports.DeleteOrderItemService = DeleteOrderItemService;
// ---------------- Calculations ----------------
// حساب إجمالي الطلب
const calculateOrderTotalService = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItems = yield (0, exports.GetOrderItemByOrderIdService)(orderId);
    if (!orderItems.length) {
        return 0;
    }
    return orderItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
});
exports.calculateOrderTotalService = calculateOrderTotalService;
