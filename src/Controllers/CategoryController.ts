import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/constant";
import {
  create,
  GetAll,
  GetByID,
  Delete,
  Update,
} from "../services/CategoryService";
import Category from "../models/Category";

// @desc    Create new category
// @route   POST /api/category
// @access  Public
export const AddCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  
  // التحقق من وجود البيانات المطلوبة
  if (!name || name.trim().length === 0) {
    res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: req.t("category_name_required") });
    return;
  }

  // التحقق من عدم تكرار اسم الفئة
  const existingCategory = await Category.findOne({ where: { name: name.trim() } });
  if (existingCategory) {
    res
      .status(HTTP_STATUS.CONFLICT)
      .json({ message: req.t("category_name_exists") });
    return;
  }

  const newCategory = await create({ name: name.trim() });
  res
    .status(HTTP_STATUS.CREATED)
    .json({ message: req.t("category_created"), data: newCategory });
});

// @desc    Get all categories
// @route   GET /api/category
// @access  Public
export const GetAllCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await GetAll();
    if (!categories.length) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("no_categories_found") });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: req.t("categories_fetched_successfully"),
      data: categories,
    });
  }
);

// @desc    Get category by ID
// @route   GET /api/category/:id
// @access  Public
export const GetCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await GetByID(Number(id));
    if (!category) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("category_not_found") });
      return;
    }
    res.status(HTTP_STATUS.OK).json({
      message: req.t("category_fetched_successfully"),
      data: category,
    });
  }
);

// @desc    Update category
// @route   PUT /api/category/:id
// @access  Public
export const UpdateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await GetByID(Number(id));
    if (!category) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("category_not_found") });
      return;
    }

    const updatedCategory = await Update(Number(id), req.body);

    if (!updatedCategory) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: req.t("category_update_failed") });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: req.t("category_updated_successfully"),
      data: updatedCategory,
    });
  }
);

// @desc    Delete category
// @route   DELETE /api/category/:id
// @access  Public
export const DeleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await GetByID(Number(id));
    if (!category) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("category_not_found") });
      return;
    }

    await Delete(Number(id));

    res
      .status(HTTP_STATUS.OK)
      .json({ message: req.t("category_deleted_successfully") });
  }
);
