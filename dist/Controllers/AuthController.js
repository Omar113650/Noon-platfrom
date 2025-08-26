"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.resetPassword = exports.validateResetPasswordLink = exports.sendResetPasswordLink = exports.logout = exports.Signin = exports.verifyAccount = exports.Register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const authService = __importStar(require("../services/AuthServices"));
const logger_1 = __importDefault(require("../utils/logger")); // لو عندك لوجر
//  * @swagger
//  * tags:
//  *   name: Auth
//  *   description: User authentication and management
//  */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - phone
 *               - date
 *               - type
 *               - password
 *               - ConfirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-09"
 *               type:
 *                 type: string
 *                 example: "user"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               ConfirmPassword:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registration successful. Please activate your account using the code sent to your email."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     phone:
 *                       type: string
 *                       example: "0123456789"
 *                     date:
 *                       type: string
 *                       example: "2025-08-09"
 *                     type:
 *                       type: string
 *                       example: "user"
 *                 token:
 *                   type: string
 *                   example: "jwt.token.here"
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email or phone already registered
 */
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.Register = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, date, type, password, ConfirmPassword } = req.body;
    if (!email || !phone || !date || !type || !password || !ConfirmPassword) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    if (password !== ConfirmPassword) {
        res
            .status(400)
            .json({ message: "Password and ConfirmPassword do not match" });
        return;
    }
    try {
        const { newUser, token } = yield authService.registerUser({
            email,
            phone,
            date,
            type,
            password,
            ConfirmPassword: "",
        });
        res.status(201).json({
            message: "Registration successful. Please activate your account using the code sent to your email.",
            user: {
                id: newUser.id,
                email: newUser.email,
                phone: newUser.phone,
                date: newUser.date,
                type: newUser.type,
            },
            token,
        });
        logger_1.default.info("User registered: " + newUser.id);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
        return;
    }
}));
// @desc    Verify user account with activation code
// @route   POST /api/auth/verify-account
// @access  Public
exports.verifyAccount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, code } = req.body;
    try {
        yield authService.verifyUserAccount(userId, code);
        res
            .status(200)
            .json({ message: "Account has been successfully activated" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// @desc    Signin user and return JWT token
// @route   POST /api/auth/signin
// @access  Public
exports.Signin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }
    try {
        const { user, token } = yield authService.signinUser(email, password);
        res.status(200).json({
            message: "Signin successful",
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone,
                date: user.date,
                type: user.type,
            },
            token,
        });
        logger_1.default.info("User login: " + user.id);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}));
// @desc    Logout user by clearing token cookie
// @route   POST /api/auth/logout
// @access  Private
exports.logout = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}));
// @desc    Send password reset link to user's email
// @route   POST /api/auth/send-reset-password-link
// @access  Public
exports.sendResetPasswordLink = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "Please enter your email address" });
        return;
    }
    try {
        yield authService.sendPasswordResetLink(email);
        res
            .status(200)
            .json({ message: "Password reset link has been sent to your email." });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}));
// @desc    Validate password reset token
// @route   GET /api/auth/reset-password/:userId/:token
// @access  Public
exports.validateResetPasswordLink = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, token } = req.params;
    try {
        yield authService.validateResetLink(+userId, token);
        res
            .status(200)
            .json({ message: "Valid link. You can reset your password." });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// @desc    Reset user password
// @route   POST /api/auth/reset-password/:userId/:token
// @access  Public
exports.resetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, token } = req.params;
    const { password } = req.body;
    if (!password || password.length < 6) {
        res
            .status(400)
            .json({ message: "Password must be at least 6 characters long" });
        return;
    }
    try {
        yield authService.resetUserPassword(+userId, token, password);
        res
            .status(200)
            .json({ message: "Password has been changed successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
