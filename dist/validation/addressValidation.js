"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidated = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AddressValidated = joi_1.default.object({
    Governorate: joi_1.default.string().required(),
    City: joi_1.default.string().required(),
    Area: joi_1.default.string().required(),
    Address: joi_1.default.string().required(),
    BuildingNumber: joi_1.default.number().required(),
    FloorNumber: joi_1.default.number().required(),
    ApatrmentNumber: joi_1.default.number().required(),
    PhoneNumber: joi_1.default.number().required(),
    UserID: joi_1.default.number().required(),
});
