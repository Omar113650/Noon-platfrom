"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = require("../Controllers/ProductsController");
const ProductValidation_1 = require("../validation/ProductValidation");
const validate_1 = __importDefault(require("../middlewares/validate"));
const router = (0, express_1.Router)();
router.post("/add-product", (0, validate_1.default)(ProductValidation_1.ProductValidated), ProductsController_1.AddProduct);
router.get("/get-product", ProductsController_1.GetAllProduct);
router.get("/get-product-ById/:id", ProductsController_1.GetProductById);
router.put("/update-product/:id", (0, validate_1.default)(ProductValidation_1.ProductValidated), ProductsController_1.UpdateProduct);
router.delete("/delete-product/:id", ProductsController_1.DeleteProduct);
exports.default = router;
