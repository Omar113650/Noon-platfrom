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
const Category_1 = __importDefault(require("../models/Category"));
// create category
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Category_1.default.create(data);
});
exports.create = create;
// get category
const GetAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Category_1.default.findAll();
});
exports.GetAll = GetAll;
// get category by id
const GetByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Category_1.default.findByPk(id);
});
exports.GetByID = GetByID;
// delete category
const Delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_1.default.findByPk(id);
    if (!category)
        return null;
    yield category.destroy();
    return category;
});
exports.Delete = Delete;
// delete category
const Update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_1.default.findByPk(id);
    if (!category)
        return null;
    yield category.update(data);
    return category;
});
exports.Update = Update;
