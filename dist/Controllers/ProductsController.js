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
exports.DeleteProduct = exports.UpdateProduct = exports.GetProductById = exports.GetAllProduct = exports.AddProduct = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const constant_1 = require("../utils/constant");
const ProductService_1 = require("../services/ProductService");
const sequelize_1 = require("sequelize");
const redis_1 = require("../utils/redis");
// @desc    Create new Product
exports.AddProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield (0, ProductService_1.create)(req.body);
    // مسح كاش القائمة عشان يظهر المنتج الجديد
    yield (0, redis_1.deleteCache)("products_list");
    res
        .status(constant_1.HTTP_STATUS.CREATED)
        .json({ message: req.t("Product_created"), data: newProduct });
}));
// @desc    Get all products with filters, sorting, and pagination
exports.GetAllProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `products_list_${JSON.stringify(req.query)}`;
    // 1️⃣ جلب من الكاش
    const cachedData = yield (0, redis_1.getCache)(cacheKey);
    if (cachedData) {
        console.log("📦 Products from cache");
        res.status(constant_1.HTTP_STATUS.OK).json(cachedData);
        return;
    }
    const query = {};
    const order = [];
    if (req.query.search) {
        query.name = { [sequelize_1.Op.like]: `%${req.query.search}%` };
    }
    if (req.query.minPrice && req.query.maxPrice) {
        query.price = { [sequelize_1.Op.between]: [Number(req.query.minPrice), Number(req.query.maxPrice)] };
    }
    else if (req.query.price) {
        query.price = Number(req.query.price);
    }
    if (req.query.sortPrice) {
        order.push([
            "price",
            req.query.sortPrice.toString().toUpperCase() === "DESC" ? "DESC" : "ASC",
        ]);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { products, totalItems, totalPages } = yield (0, ProductService_1.GetAll)(query, order, page, limit);
    if (!products.length) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("no_products_found") });
        return;
    }
    const response = {
        message: req.t("products_fetched_successfully"),
        data: products,
        pagination: {
            totalItems,
            totalPages,
            currentPage: page,
        },
    };
    // 2️⃣ حفظ في الكاش لمدة 5 دقائق
    yield (0, redis_1.setCache)(cacheKey, response, 300);
    res.status(constant_1.HTTP_STATUS.OK).json(response);
}));
// @desc    Get product by ID
exports.GetProductById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cacheKey = `product_${id}`;
    // جلب من الكاش
    const cachedProduct = yield (0, redis_1.getCache)(cacheKey);
    if (cachedProduct) {
        console.log("📦 Product from cache");
        res.status(constant_1.HTTP_STATUS.OK).json(cachedProduct);
        return;
    }
    const product = yield (0, ProductService_1.GetByID)(Number(id));
    if (!product) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("product_not_found") });
        return;
    }
    const response = {
        message: req.t("product_fetched_successfully"),
        data: product,
    };
    // حفظ في الكاش لمدة 10 دقائق
    yield (0, redis_1.setCache)(cacheKey, response, 600);
    res.status(constant_1.HTTP_STATUS.OK).json(response);
}));
// @desc    Update Product
exports.UpdateProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Product = yield (0, ProductService_1.GetByID)(Number(id));
    if (!Product) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("Product_not_found") });
        return;
    }
    const updatedProduct = yield (0, ProductService_1.Update)(Number(id), req.body);
    if (!updatedProduct) {
        res
            .status(constant_1.HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: req.t("Product_update_failed") });
        return;
    }
    // مسح الكاش للمنتج و القائمة
    yield (0, redis_1.deleteCache)(`product_${id}`);
    yield (0, redis_1.deleteCache)("products_list");
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: req.t("Product_updated_successfully"),
        data: updatedProduct,
    });
}));
// @desc    Delete Product
exports.DeleteProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Product = yield (0, ProductService_1.GetByID)(Number(id));
    if (!Product) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("Product_not_found") });
        return;
    }
    yield (0, ProductService_1.Delete)(Number(id));
    // مسح الكاش
    yield (0, redis_1.deleteCache)(`product_${id}`);
    yield (0, redis_1.deleteCache)("products_list");
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: req.t("Product_deleted_successfully") });
}));
// هتتعمل بعد order
// export const GetTopProduct = asyncHandler(
//   async (req: Request, res: Response) => {
//     const products = await GetAll();
//     if (!products.length) {
//       res
//         .status(HTTP_STATUS.NOT_FOUND)
//         .json({ message: req.t("no_products_found") });
//       return;
//     }
//     res
//       .status(HTTP_STATUS.OK)
//       .json({
//         message: req.t("products_fetched_successfully"),
//         data: products,
//       });
//   }
// );
