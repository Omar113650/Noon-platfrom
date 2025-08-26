import Category, { CategoryCreateAttributes } from "../models/Category";

// create category

export const create = async (data: CategoryCreateAttributes) => {
  return await Category.create(data);
};

// get category

export const GetAll = async () => {
  return await Category.findAll();
};

// get category by id

export const GetByID = async (id: number) => {
  return await Category.findByPk(id);
};

// delete category

export const Delete = async (id: number) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.destroy();
  return category;
};

// delete category

export const Update = async (
  id: number,
  data: Partial<CategoryCreateAttributes>
) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.update(data);
  return category;
};
