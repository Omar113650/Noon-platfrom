import Cart, { CartCreateAttributes } from "../models/Cart";
import CartItem, { CartItemCreateAttributes } from "../models/CartItem";
import Product from "../models/Product"
import "../models/associations"

// إنشاء سلة جديدة
export const Create = async (data: CartCreateAttributes) => {
  return await Cart.create(data);
};

// جلب كل السلات (لو محتاج)
export const GetAll = async () => {
  return await Cart.findAll({
    include: [
      {
        model:  CartItem,
        as: "CartItems",  // الاسم اللي مستخدمته في تعريف العلاقة، لو ماعرفتهوش، هضبطه لك بعد قليل
        attributes: ["id","cartId","productId","quantity"], // الصفات اللي عايز ترجعها من المنتج
      },
    ],
  });
};

// جلب سلة حسب الـ id
export const GetByID = async (id: number) => {
  return await Cart.findByPk(id);
};

// حذف سلة
export const Delete = async (id: number) => {
  const cart = await Cart.findByPk(id);
  if (!cart) return null;
  await Cart.destroy({ where: { id } });
  return cart;
};

// تحديث سلة
export const Update = async (
  id: number,
  data: Partial<CartCreateAttributes>
) => {
  const cart = await Cart.findByPk(id);
  if (!cart) return null;
  await Cart.update(data, { where: { id } });
  return cart;
};

// *****************************************************************************************************************************************************
// CART ITEM

// إنشاء عنصر داخل السلة (CartItem)
export const CartItemCreated = async (data: CartItemCreateAttributes) => {
  return await CartItem.create(data);
};

// جلب كل عناصر السلة (لو محتاج)
export const GetCartItem = async () => {
  return await CartItem.findAll({
    include: [
      {
        model: Product,
        as: "product", 
        attributes: ["id", "name", "price","stock","categoryId"], 
      },
    ],
  });
};

// جلب عنصر سلة حسب الـ id
export const GetCartItemByID = async (id: number) => {
  return await CartItem.findByPk(id);
};

// تحديث عنصر السلة
export const UpdateCartItem = async (
  id: number,
  data: Partial<CartItemCreateAttributes>
) => {
  const cartItem = await CartItem.findByPk(id);
  if (!cartItem) return null;
  await CartItem.update(data, { where: { id } });
  return cartItem;
};

// حذف عنصر سلة
export const DeleteCartItem = async (id: number) => {
  const cartItem = await CartItem.findByPk(id);
  if (!cartItem) return null;
  await CartItem.destroy({ where: { id } });
  return cartItem;
};
