import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/constant";
import {
  create,
  GetAll,
  GetByID,
  Update,
  Delete,
} from "../services/AddressService";
import logger from "../utils/logger";

// @desc    Create new Address
// @route   POST /api/address
// @access  Public
export const AddAddress = asyncHandler(async (req: Request, res: Response) => {
  const newAddress = await create(req.body);

  logger.info("Address Created: " + newAddress.id);
  res
    .status(HTTP_STATUS.CREATED)
    .json({ message: req.t("address_created"), newAddress });
});

// @desc    Get All Address
// @route   Get /api/address
// @access  Public
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

// @desc    Get Address by ID
// @route   Get /api/address/:id
// @access  Public
export const GetAddressByID = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const address = await GetByID(Number(id));
    if (!address) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("address_not_found") });
      return;
    }

    res
      .status(HTTP_STATUS.OK)
      .json({ message: req.t("address_found"), address });
  }
);

// @desc    Update Address by ID
// @route   PUT /api/address/:id
// @access  Public
export const UpdateAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const address = await GetByID(Number(id));
    if (!address) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("address_not_found") });
      return;
    }

    const updatedAddress = await Update(Number(id), req.body);

    if (!updatedAddress) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: req.t("address_update_failed") });
      return;
    }

    logger.info("Address Updated: " + updatedAddress.id);
    res
      .status(HTTP_STATUS.OK)
      .json({ message: req.t("address_updated"), updatedAddress });
  }
);

// @desc    Delete Address by ID
// @route   DELETE /api/address/:id
// @access  Public
export const DeleteAddress = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const address = await GetByID(Number(id));
    if (!address) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("address_not_found") });
      return;
    }

    const deleted = await Delete(Number(id));

    if (!deleted) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: req.t("address_delete_failed") });
      return;
    }

    res.status(HTTP_STATUS.OK).json({ message: req.t("address_deleted") });
  }
);
