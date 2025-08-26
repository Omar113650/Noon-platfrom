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
exports.DeleteCartItem = exports.UpdateCartItem = exports.GetCartItemByID = exports.GetCartItem = exports.CartItemCreated = exports.Update = exports.Delete = exports.GetByID = exports.GetAll = exports.Create = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const CartItem_1 = __importDefault(require("../models/CartItem"));
const Product_1 = __importDefault(require("../models/Product"));
require("../models/associations");
// إنشاء سلة جديدة
const Create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cart_1.default.create(data);
});
exports.Create = Create;
// جلب كل السلات (لو محتاج)
const GetAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cart_1.default.findAll({
        include: [
            {
                model: CartItem_1.default,
                as: "CartItems", // الاسم اللي مستخدمته في تعريف العلاقة، لو ماعرفتهوش، هضبطه لك بعد قليل
                attributes: ["id", "cartId", "productId", "quantity"], // الصفات اللي عايز ترجعها من المنتج
            },
        ],
    });
});
exports.GetAll = GetAll;
// جلب سلة حسب الـ id
const GetByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cart_1.default.findByPk(id);
});
exports.GetByID = GetByID;
// حذف سلة
const Delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findByPk(id);
    if (!cart)
        return null;
    yield Cart_1.default.destroy({ where: { id } });
    return cart;
});
exports.Delete = Delete;
// تحديث سلة
const Update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.default.findByPk(id);
    if (!cart)
        return null;
    yield Cart_1.default.update(data, { where: { id } });
    return cart;
});
exports.Update = Update;
// *****************************************************************************************************************************************************
// CART ITEM
// إنشاء عنصر داخل السلة (CartItem)
const CartItemCreated = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield CartItem_1.default.create(data);
});
exports.CartItemCreated = CartItemCreated;
// جلب كل عناصر السلة (لو محتاج)
const GetCartItem = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield CartItem_1.default.findAll({
        include: [
            {
                model: Product_1.default,
                as: "product",
                attributes: ["id", "name", "price", "stock", "categoryId"],
            },
        ],
    });
});
exports.GetCartItem = GetCartItem;
// جلب عنصر سلة حسب الـ id
const GetCartItemByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield CartItem_1.default.findByPk(id);
});
exports.GetCartItemByID = GetCartItemByID;
// تحديث عنصر السلة
const UpdateCartItem = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItem = yield CartItem_1.default.findByPk(id);
    if (!cartItem)
        return null;
    yield CartItem_1.default.update(data, { where: { id } });
    return cartItem;
});
exports.UpdateCartItem = UpdateCartItem;
// حذف عنصر سلة
const DeleteCartItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItem = yield CartItem_1.default.findByPk(id);
    if (!cartItem)
        return null;
    yield CartItem_1.default.destroy({ where: { id } });
    return cartItem;
});
exports.DeleteCartItem = DeleteCartItem;
