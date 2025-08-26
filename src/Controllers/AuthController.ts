import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import * as authService from "../services/AuthServices";
import logger from "../utils/logger"; // لو عندك لوجر

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
export const Register = asyncHandler(async (req: Request, res: Response) => {
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
    const { newUser, token } = await authService.registerUser({
      email,
      phone,
      date,
      type,
      password,
      ConfirmPassword: "",
    });

    res.status(201).json({
      message:
        "Registration successful. Please activate your account using the code sent to your email.",
      user: {
        id: newUser.id,
        email: newUser.email,
        phone: newUser.phone,
        date: newUser.date,
        type: newUser.type,
      },
      token,
    });

    logger.info("User registered: " + newUser.id);
  } catch (error: any) {
    res.status(409).json({ message: error.message });
    return;
  }
});

// @desc    Verify user account with activation code
// @route   POST /api/auth/verify-account
// @access  Public
export const verifyAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, code } = req.body;

    try {
      await authService.verifyUserAccount(userId, code);
      res
        .status(200)
        .json({ message: "Account has been successfully activated" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

// @desc    Signin user and return JWT token
// @route   POST /api/auth/signin
// @access  Public
export const Signin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const { user, accesstoken, refreshtoken } = await authService.signinUser(
      email,
      password
    );

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Signin successful",
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        date: user.date,
        type: user.type,
      },
      accesstoken,
      refreshtoken,
    });

    logger.info("User login: " + user.id);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

// @desc    Logout user by clearing token cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
});

// @desc    Send password reset link to user's email
// @route   POST /api/auth/send-reset-password-link
// @access  Public
export const sendResetPasswordLink = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Please enter your email address" });
      return;
    }

    try {
      await authService.sendPasswordResetLink(email);
      res
        .status(200)
        .json({ message: "Password reset link has been sent to your email." });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
);

// @desc    Validate password reset token
// @route   GET /api/auth/reset-password/:userId/:token
// @access  Public
export const validateResetPasswordLink = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, token } = req.params;

    try {
      await authService.validateResetLink(+userId, token);
      res
        .status(200)
        .json({ message: "Valid link. You can reset your password." });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);

// @desc    Reset user password
// @route   POST /api/auth/reset-password/:userId/:token
// @access  Public
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
      return;
    }

    try {
      await authService.resetUserPassword(+userId, token, password);
      res
        .status(200)
        .json({ message: "Password has been changed successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
);
