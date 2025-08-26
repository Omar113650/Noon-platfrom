"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AddressController_1 = require("../Controllers/AddressController");
const addressValidation_1 = require("../validation/addressValidation");
const validate_1 = __importDefault(require("../middlewares/validate"));
const router = (0, express_1.Router)();
router.post("/add-address", (0, validate_1.default)(addressValidation_1.AddressValidated), AddressController_1.AddAddress);
router.get("/get-address", AddressController_1.GetAddress);
router.get("/get-address-ById/:id", AddressController_1.GetAddressByID);
router.put("/update-address/:id", (0, validate_1.default)(addressValidation_1.AddressValidated), AddressController_1.UpdateAddress);
router.delete("/delete-address/:id", AddressController_1.DeleteAddress);
exports.default = router;
