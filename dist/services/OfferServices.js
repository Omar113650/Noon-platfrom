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
exports.Update = exports.Delete = exports.GetByID = exports.GetAll = exports.create = void 0;
const Offer_1 = __importDefault(require("../models/Offer"));
// create Offer
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Offer_1.default.create(data);
});
exports.create = create;
// get all Offers with pagination + filtering
const GetAll = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}, order = [], page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { rows: offers, count: totalItems } = yield Offer_1.default.findAndCountAll({
        where: filter,
        order,
        limit,
        offset,
    });
    return {
        offers,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
    };
});
exports.GetAll = GetAll;
// get Offer by id
const GetByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Offer_1.default.findByPk(id);
});
exports.GetByID = GetByID;
// delete Offer
const Delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield Offer_1.default.findByPk(id);
    if (!offer)
        return null;
    yield Offer_1.default.destroy({ where: { id } });
    return offer;
});
exports.Delete = Delete;
// update Offer
const Update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const offer = yield Offer_1.default.findByPk(id);
    if (!offer)
        return null;
    yield Offer_1.default.update(data, { where: { id } });
    return offer;
});
exports.Update = Update;
