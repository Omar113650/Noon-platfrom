import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  Create,
  CartItemCreated,
  GetCartItem,
  GetAll,
  GetCartItemByID,
  UpdateCartItem,
  DeleteCartItem,
} from "../services/CartServices";
import { HTTP_STATUS } from "../utils/constant";

// إنشاء سلة جديدة
export const CreateCart = asyncHandler(async (req: Request, res: Response) => {
  const cart = await Create(req.body);
  res
    .status(HTTP_STATUS.CREATED)
    .json({ message: "Cart created successfully", cart });
});

// جلب كل عناصر
export const GetAllInCart = asyncHandler(
  async (req: Request, res: Response) => {
    const AllCart = await GetAll();
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Cart items fetched successfully", data: AllCart });
  }
);
// *****************************************************************************************************************************************************************
// cart item

// إنشاء عنصر داخل السلة
export const CreateCartItem = asyncHandler(
  async (req: Request, res: Response) => {
    const cartItem = await CartItemCreated(req.body);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: "Cart item created successfully", data: cartItem });
  }
);

// جلب كل عناصر السلة
export const GetCartItems = asyncHandler(
  async (req: Request, res: Response) => {
    const cartItems = await GetCartItem();
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Cart items fetched successfully", data: cartItems });
  }
);

// تحديث عنصر السلة
export const UpdateCartItemController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const existingItem = await GetCartItemByID(Number(id));
    if (!existingItem) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Cart item not found" });
      return;
    }
    const updated = await UpdateCartItem(Number(id), req.body);
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Cart item updated successfully", data: updated });
  }
);

// حذف عنصر السلة
export const DeleteCartItemController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const existingItem = await GetCartItemByID(Number(id));
    if (!existingItem) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Cart item not found" });
      return;
    }
    await DeleteCartItem(Number(id));
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Cart item deleted successfully" });
  }
);
