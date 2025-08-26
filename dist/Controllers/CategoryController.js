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
exports.DeleteCategory = exports.UpdateCategory = exports.GetCategoryById = exports.GetAllCategory = exports.AddCategory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const constant_1 = require("../utils/constant");
const CategoryService_1 = require("../services/CategoryService");
// @desc    Create new category
// @route   POST /api/category
// @access  Public
exports.AddCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield (0, CategoryService_1.create)(req.body);
    res
        .status(constant_1.HTTP_STATUS.CREATED)
        .json({ message: req.t("category_created"), data: newCategory });
}));
// @desc    Get all categories
// @route   GET /api/category
// @access  Public
exports.GetAllCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, CategoryService_1.GetAll)();
    if (!categories.length) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("no_categories_found") });
        return;
    }
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: req.t("categories_fetched_successfully"), data: categories });
}));
// @desc    Get category by ID
// @route   GET /api/category/:id
// @access  Public
exports.GetCategoryById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield (0, CategoryService_1.GetByID)(Number(id));
    if (!category) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("category_not_found") });
        return;
    }
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: req.t("category_fetched_successfully"), data: category });
}));
// @desc    Update category
// @route   PUT /api/category/:id
// @access  Public
exports.UpdateCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield (0, CategoryService_1.GetByID)(Number(id));
    if (!category) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("category_not_found") });
        return;
    }
    const updatedCategory = yield (0, CategoryService_1.Update)(Number(id), req.body);
    if (!updatedCategory) {
        res
            .status(constant_1.HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: req.t("category_update_failed") });
        return;
    }
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: req.t("category_updated_successfully"), data: updatedCategory });
}));
// @desc    Delete category
// @route   DELETE /api/category/:id
// @access  Public
exports.DeleteCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield (0, CategoryService_1.GetByID)(Number(id));
    if (!category) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("category_not_found") });
        return;
    }
    yield (0, CategoryService_1.Delete)(Number(id));
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: req.t("category_deleted_successfully") });
}));
