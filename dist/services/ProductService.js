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
const Product_1 = __importDefault(require("../models/Product"));
// create Product
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.create(data);
});
exports.create = create;
// get Product
const GetAll = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}, order = [], page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { rows: products, count: totalItems } = yield Product_1.default.findAndCountAll({
        where: filter,
        order,
        limit,
        offset,
    });
    return {
        products,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
    };
});
exports.GetAll = GetAll;
// get Product by id
const GetByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.findByPk(id);
});
exports.GetByID = GetByID;
// delete Product
const Delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findByPk(id);
    if (!product)
        return null;
    yield Product_1.default.destroy();
    return Product_1.default;
});
exports.Delete = Delete;
// delete Product
const Update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findByPk(id);
    if (!product)
        return null;
    yield Product_1.default.update(data, { where: { id } });
    return Product_1.default;
});
exports.Update = Update;
