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
exports.DeleteAddress = exports.UpdateAddress = exports.GetAddressByID = exports.GetAddress = exports.AddAddress = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const constant_1 = require("../utils/constant");
const AddressService_1 = require("../services/AddressService");
const logger_1 = __importDefault(require("../utils/logger"));
// @desc    Create new Address
// @route   POST /api/address
// @access  Public
exports.AddAddress = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newAddress = yield (0, AddressService_1.create)(req.body);
    logger_1.default.info("Address Created: " + newAddress.id);
    res
        .status(constant_1.HTTP_STATUS.CREATED)
        .json({ message: req.t("address_created"), newAddress });
}));
// @desc    Get All Address
// @route   Get /api/address
// @access  Public
exports.GetAddress = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield (0, AddressService_1.GetAll)();
    //   length: لان هو هنا هيلف علي كل العناصر
    if (!address.length) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("address_not_found") });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({ message: req.t("address_found"), address });
}));
// @desc    Get Address by ID
// @route   Get /api/address/:id
// @access  Public
exports.GetAddressByID = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const address = yield (0, AddressService_1.GetByID)(Number(id));
    if (!address) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("address_not_found") });
        return;
    }
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: req.t("address_found"), address });
}));
// @desc    Update Address by ID
// @route   PUT /api/address/:id
// @access  Public
exports.UpdateAddress = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const address = yield (0, AddressService_1.GetByID)(Number(id));
    if (!address) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("address_not_found") });
        return;
    }
    const updatedAddress = yield (0, AddressService_1.Update)(Number(id), req.body);
    if (!updatedAddress) {
        res
            .status(constant_1.HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: req.t("address_update_failed") });
        return;
    }
    logger_1.default.info("Address Updated: " + updatedAddress.id);
    res
        .status(constant_1.HTTP_STATUS.OK)
        .json({ message: req.t("address_updated"), updatedAddress });
}));
// @desc    Delete Address by ID
// @route   DELETE /api/address/:id
// @access  Public
exports.DeleteAddress = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const address = yield (0, AddressService_1.GetByID)(Number(id));
    if (!address) {
        res
            .status(constant_1.HTTP_STATUS.NOT_FOUND)
            .json({ message: req.t("address_not_found") });
        return;
    }
    const deleted = yield (0, AddressService_1.Delete)(Number(id));
    if (!deleted) {
        res
            .status(constant_1.HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: req.t("address_delete_failed") });
        return;
    }
    res.status(constant_1.HTTP_STATUS.OK).json({ message: req.t("address_deleted") });
}));
