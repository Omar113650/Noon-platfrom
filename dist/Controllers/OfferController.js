"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOffer = exports.UpdateOffer = exports.GetOfferById = exports.GetAllOffers = exports.AddOffer = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const constant_1 = require("../utils/constant");
const OfferServices_1 = require("../services/OfferServices");
const sequelize_1 = require("sequelize");
// @desc    Create new Offer
// @route   POST /api/offer
// @access  Public
exports.AddOffer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newOffer = yield (0, OfferServices_1.create)(req.body);
    res
        .status(constant_1.HTTP_STATUS.CREATED)
        .json({ message: req.t("offer_created"), data: newOffer });
}));
// @desc    Get all offers with filters, sorting, and pagination
// @route   GET /api/offers
// @access  Public
exports.GetAllOffers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    const order = [];
    // Example: search by title or name
    if (req.query.search) {
        query.title = { [sequelize_1.Op.like]: `%${req.query.search}%` };
    }
    // Filter example by price range if offer has price attribute
    if (req.query.minPrice && req.query.maxPrice) {
        query.price = {
            [sequelize_1.Op.between]: [Number(req.query.minPrice), Number(req.query.maxPrice)],
        };
    }
    else if (req.query.price) {
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
    const { offers, totalItems, totalPages } = yield (0, OfferServices_1.GetAll)(query, order, page, limit);
    if (!offers.length) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({ message: req.t("no_offers_found") });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: req.t("offers_fetched_successfully"),
        data: offers,
        pagination: {
            totalItems,
            totalPages,
            currentPage: page,
        },
    });
}));
// @desc    Get offer by ID
// @route   GET /api/offer/:id
// @access  Public
exports.GetOfferById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const offer = yield (0, OfferServices_1.GetByID)(Number(id));
    if (!offer) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({ message: req.t("offer_not_found") });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: req.t("offer_fetched_successfully"),
        data: offer,
    });
}));
// @desc    Update Offer
// @route   PUT /api/offer/:id
// @access  Public
exports.UpdateOffer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const offer = yield (0, OfferServices_1.GetByID)(Number(id));
    if (!offer) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({ message: req.t("offer_not_found") });
        return;
    }
    const updatedOffer = yield (0, OfferServices_1.Update)(Number(id), req.body);
    if (!updatedOffer) {
        res.status(constant_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: req.t("offer_update_failed") });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({
        message: req.t("offer_updated_successfully"),
        data: updatedOffer,
    });
}));
// @desc    Delete Offer
// @route   DELETE /api/offer/:id
// @access  Public
exports.DeleteOffer = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const offer = yield (0, OfferServices_1.GetByID)(Number(id));
    if (!offer) {
        res.status(constant_1.HTTP_STATUS.NOT_FOUND).json({ message: req.t("offer_not_found") });
        return;
    }
    yield (0, OfferServices_1.Delete)(Number(id));
    res.status(constant_1.HTTP_STATUS.OK).json({ message: req.t("offer_deleted_successfully") });
}));
// هتتعمل بعد order
// export const GetTopProduct = asyncHandler(
//   async (req: Request, res: Response) => {
//     const products = await GetAll();
//     if (!products.length) {
//       res
//         .status(HTTP_STATUS.NOT_FOUND)
//         .json({ message: req.t("no_products_found") });
//       return;
//     }
//     res
//       .status(HTTP_STATUS.OK)
//       .json({
//         message: req.t("products_fetched_successfully"),
//         data: products,
//       });
//   }
// );
