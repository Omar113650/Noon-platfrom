import Product, { ProductCreateAttributes } from "../models/Product";
import LoveCart, { LoveAttributes } from "../models/Love";
import { partialDeepStrictEqual } from "assert";
// create Product
export const createP = async (data: ProductCreateAttributes) => {
  return await Product.create(data);
};

// get Product
export const GetAll = async (
  filter: any = {},
  order: any[] = [],
  page: number = 1,
  limit: number = 10
) => {
  const offset = (page - 1) * limit;

  const { rows: products, count: totalItems } = await Product.findAndCountAll({
    where: filter,
    order,
    limit,
    offset,
    
  });

  return {
    products,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  };
};

// get Product by id
export const GetByID = async (id: number) => {
  return await Product.findByPk(id);
};

// delete Product
export const Delete = async (id: number) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await Product.destroy();
  return Product;
};

// delete Product
export const Update = async (
  id: number,
  data: Partial<ProductCreateAttributes>
) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await Product.update(data, { where: { id } });
  return Product;
};

// Add Love Product
export const AddProductToCart = async (id: number, data: LoveAttributes) => {
  const product = await Product.findByPk(id);
  if (!product) return null;

  return await LoveCart.create({
    ...data,
    productId: id,
  });
};
// soft delete Product
// export const SoftDelete = async (id: number) => {
//   const product = await Product.findByPk(id);
//   if (!product) return null;

//   await product.update({ isDeleted: true });  // ✅ بدال ما يتمسح
//   return product;
// };

//  الاستخدام
//  await SoftDelete(Number(id));
