import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/constant";
import { GetAll } from "../services/AddressService";
import { GetOrderByIdService } from "../services/OrderServices";
import { AddProductToCart } from "../services/ProductService";
import User from "../models/User";
export const GetAddress = asyncHandler(async (req: Request, res: Response) => {
  const address = await GetAll();
  if (!address.length) {
    res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: req.t("address_not_found") });
    return;
  }

  res.status(HTTP_STATUS.OK).json({ message: req.t("address_found"), address });
});

export const GetOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await GetOrderByIdService(Number(req.params.orderId));
    if (!order) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Order not found",
      });
      return;
    }
    res.status(HTTP_STATUS.OK).json(order);
  }
);

export const AddLoveProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await AddProductToCart(Number(req.params.id), req.body);

    if (!product) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("Product_not_found") });
      return;
    }

    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: req.t("Product_created"), data: product });
  }
);

export const Register = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password", "ConfirmPassword"],
    },
  });

  res.status(200).json({ message: "user profile", users });
});
