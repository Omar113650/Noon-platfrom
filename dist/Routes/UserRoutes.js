"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../Controllers/AuthController");
const validate_1 = __importDefault(require("../middlewares/validate"));
const userValidation_1 = require("../validation/userValidation");
const router = express_1.default.Router();
router.post("/register", (0, validate_1.default)(userValidation_1.RegisterValidate), AuthController_1.Register);
router.post("/signin", (0, validate_1.default)(userValidation_1.LoginValidate), AuthController_1.Signin);
router.post("/logout", AuthController_1.logout);
router.post("/verify-account", AuthController_1.verifyAccount);
router.post("/forgot-password", AuthController_1.sendResetPasswordLink);
// token ده التوكن باع rest
router.get("/reset-password/:userId/:token", AuthController_1.validateResetPasswordLink);
router.post("/reset-password/:userId/:token", (0, validate_1.default)(userValidation_1.NewPasswordValidate), AuthController_1.resetPassword);
exports.default = router;
