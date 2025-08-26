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
exports.DeleteCartItemController = exports.UpdateCartItemController = exports.GetCartItems = exports.CreateCartItem = exports.GetAllInCart = exports.CreateCart = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const CartServices_1 = require("../services/CartServices");
const constant_1 = require("../utils/constant");
// إنشاء سلة جديدة
exports.CreateCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield (0, CartServices_1.Create)(req.body);
    res
        .status(constant_1.HTTP_STATUS.CREATED)
        .json({ message: "Cart created successfully", cart });
}));
// جلب كل عناصر
exports.GetAllInCart = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AllCart = yield (0, CartServices_1.GetAll)();
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: "Cart items fetched successfully", data: AllCart });
}));
// *****************************************************************************************************************************************************************
// cart item
// إنشاء عنصر داخل السلة
exports.CreateCartItem = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItem = yield (0, CartServices_1.CartItemCreated)(req.body);
    res
        .status(constant_1.HTTP_STATUS.CREATED)
        .json({ message: "Cart item created successfully", data: cartItem });
}));
// جلب كل عناصر السلة
exports.GetCartItems = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItems = yield (0, CartServices_1.GetCartItem)();
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: "Cart items fetched successfully", data: cartItems });
}));
// تحديث عنصر السلة
exports.UpdateCartItemController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existingItem = yield (0, CartServices_1.GetCartItemByID)(Number(id));
    if (!existingItem) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: "Cart item not found" });
        return;
    }
    const updated = yield (0, CartServices_1.UpdateCartItem)(Number(id), req.body);
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: "Cart item updated successfully", data: updated });
}));
// حذف عنصر السلة
exports.DeleteCartItemController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const existingItem = yield (0, CartServices_1.GetCartItemByID)(Number(id));
    if (!existingItem) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: "Cart item not found" });
        return;
    }
    yield (0, CartServices_1.DeleteCartItem)(Number(id));
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: "Cart item deleted successfully" });
}));
