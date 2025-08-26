import { Router } from "express";
import {
  GetProductById,
  AddProduct,
  GetAllProduct,
  UpdateProduct,
  DeleteProduct,
  AddLoveProduct,
} from "../Controllers/ProductsController";
import { ExportOrdersExcel } from "../services/OrderServices";

import { ProductValidated } from "../validation/ProductValidation";
import validate from "../middlewares/validate";
import { ValidatedID } from "../middlewares/ValidateID";
const router = Router();
router.get("/export-excel", ExportOrdersExcel);
router.post("/add-product", AddProduct);
router.post("/add-Love-product", AddLoveProduct);
router.get("/get-product", GetAllProduct);
router.get("/get-product-ById/:id", ValidatedID, GetProductById);
router.put(
  "/update-product/:id",
  ValidatedID,
  validate(ProductValidated),
  UpdateProduct
);
router.delete("/delete-product/:id", ValidatedID, DeleteProduct);

export default router;
