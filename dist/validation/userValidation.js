"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPasswordValidate = exports.LoginValidate = exports.RegisterValidate = exports.countByRoleSchema = exports.changeRoleSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
exports.createUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: (0, joi_password_complexity_1.default)().required(),
    ConfirmPassword: (0, joi_password_complexity_1.default)().required(),
    type: joi_1.default.string().valid("Customer", "Admin", "User").optional(),
    phone: joi_1.default.number().required(),
});
exports.updateUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: (0, joi_password_complexity_1.default)().required(),
    ConfirmPassword: (0, joi_password_complexity_1.default)().required(),
    type: joi_1.default.string().valid("Customer", "Admin", "User").optional(),
    phone: joi_1.default.number().required(),
});
exports.changeRoleSchema = joi_1.default.object({
    newRole: joi_1.default.string().valid("admin", "teacher", "student").required(),
});
exports.countByRoleSchema = joi_1.default.object({
    role: joi_1.default.string().valid("admin", "teacher", "student").required(),
});
exports.RegisterValidate = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: (0, joi_password_complexity_1.default)().required(),
    ConfirmPassword: (0, joi_password_complexity_1.default)().required(),
    type: joi_1.default.string().valid("Customer", "Admin", "User").optional(),
    phone: joi_1.default.number().required(),
    date: joi_1.default.date()
});
exports.LoginValidate = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: (0, joi_password_complexity_1.default)().required(),
});
exports.NewPasswordValidate = joi_1.default.object({
    password: (0, joi_password_complexity_1.default)().optional(),
});
