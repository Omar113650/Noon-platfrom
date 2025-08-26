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
exports.Delete = exports.Update = exports.GetByID = exports.GetAll = exports.create = void 0;
const Address_1 = __importDefault(require("../models/Address"));
// create
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Address_1.default.create(data);
});
exports.create = create;
// get
const GetAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Address_1.default.findAll();
});
exports.GetAll = GetAll;
// get by Id
const GetByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Address_1.default.findByPk(id);
});
exports.GetByID = GetByID;
// Partial اي مش الكل ايجباري اني احدثه 
// update
const Update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield Address_1.default.findByPk(id);
    if (!address)
        return null;
    yield address.update(data);
    return address;
});
exports.Update = Update;
// delete
const Delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield Address_1.default.findByPk(id);
    if (!address)
        return null;
    yield address.destroy();
    return address;
});
exports.Delete = Delete;
