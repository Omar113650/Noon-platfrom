import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/constant";
import { create, GetAll, GetByID, Delete, Update } from "../services/OfferServices";
import { Op } from "sequelize";

// @desc    Create new Offer
// @route   POST /api/offer
// @access  Public
export const AddOffer = asyncHandler(async (req: Request, res: Response) => {
  const newOffer = await create(req.body);
  res
    .status(HTTP_STATUS.CREATED)
    .json({ message: req.t("offer_created"), data: newOffer });
});

// @desc    Get all offers with filters, sorting, and pagination
// @route   GET /api/offers
// @access  Public
export const GetAllOffers = asyncHandler(async (req: Request, res: Response) => {
  const query: any = {};
  const order: any[] = [];

  // Example: search by title or name
  if (req.query.search) {
    query.title = { [Op.like]: `%${req.query.search}%` };
  }

  // Filter example by price range if offer has price attribute
  if (req.query.minPrice && req.query.maxPrice) {
    query.price = {
      [Op.between]: [Number(req.query.minPrice), Number(req.query.maxPrice)],
    };
  } else if (req.query.price) {
    query.price = Number(req.query.price);
  }

  // Sort by price
  if (req.query.sortPrice) {
    order.push([
      "price",
      req.query.sortPrice.toString().toUpperCase() === "DESC" ? "DESC" : "ASC",
    ]);
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const { offers, totalItems, totalPages } = await GetAll(query, order, page, limit);

  if (!offers.length) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: req.t("no_offers_found") });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: req.t("offers_fetched_successfully"),
    data: offers,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
    },
  });
});

// @desc    Get offer by ID
// @route   GET /api/offer/:id
// @access  Public
export const GetOfferById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const offer = await GetByID(Number(id));

  if (!offer) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: req.t("offer_not_found") });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: req.t("offer_fetched_successfully"),
    data: offer,
  });
});

// @desc    Update Offer
// @route   PUT /api/offer/:id
// @access  Public
export const UpdateOffer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const offer = await GetByID(Number(id));
  if (!offer) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: req.t("offer_not_found") });
    return;
  }

  const updatedOffer = await Update(Number(id), req.body);

  if (!updatedOffer) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: req.t("offer_update_failed") });
    return;
  }

  res.status(HTTP_STATUS.OK).json({
    message: req.t("offer_updated_successfully"),
    data: updatedOffer,
  });
});

// @desc    Delete Offer
// @route   DELETE /api/offer/:id
// @access  Public
export const DeleteOffer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const offer = await GetByID(Number(id));
  if (!offer) {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: req.t("offer_not_found") });
    return;
  }

  await Delete(Number(id));

  res.status(HTTP_STATUS.OK).json({ message: req.t("offer_deleted_successfully") });
});
