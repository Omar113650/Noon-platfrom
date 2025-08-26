import { Router } from "express";
import {
  AddCategory,
  GetAllCategory,
  GetCategoryById,
  UpdateCategory,
  DeleteCategory,
} from "../Controllers/CategoryController";

import { CategoriesValidated } from "../validation/categoryValidation";
import validate from "../middlewares/validate";
import { ValidatedID } from "../middlewares/ValidateID";
const router = Router();

router.post("/add-category", validate(CategoriesValidated), AddCategory);
router.get("/get-category", GetAllCategory);
router.get("/get-category-ById/:id", ValidatedID, GetCategoryById);
router.put(
  "/update-category/:id",
  ValidatedID,
  validate(CategoriesValidated),
  UpdateCategory
);
router.delete("/delete-category/:id", ValidatedID, DeleteCategory);

export default router;
