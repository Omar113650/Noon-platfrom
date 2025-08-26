"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = require("../Controllers/CategoryController");
const categoryValidation_1 = require("../validation/categoryValidation");
const validate_1 = __importDefault(require("../middlewares/validate"));
const router = (0, express_1.Router)();
router.post("/add-category", (0, validate_1.default)(categoryValidation_1.CategoriesValidated), CategoryController_1.AddCategory);
router.get("/get-category", CategoryController_1.GetAllCategory);
router.get("/get-category-ById/:id", CategoryController_1.GetCategoryById);
router.put("/update-category/:id", (0, validate_1.default)(categoryValidation_1.CategoriesValidated), CategoryController_1.UpdateCategory);
router.delete("/delete-category/:id", CategoryController_1.DeleteCategory);
exports.default = router;
