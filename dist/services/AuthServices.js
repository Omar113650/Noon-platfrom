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
exports.registerUser = registerUser;
exports.verifyUserAccount = verifyUserAccount;
exports.signinUser = signinUser;
exports.sendPasswordResetLink = sendPasswordResetLink;
exports.validateResetLink = validateResetLink;
exports.resetUserPassword = resetUserPassword;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const sequelize_1 = require("sequelize");
const VerificationCode_1 = __importDefault(require("../models/VerificationCode"));
const PasswordResetToken_1 = __importDefault(require("../models/PasswordResetToken"));
const emailServices_1 = require("../utils/emailServices");
function registerUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, phone, date, type, password } = data;
        const existingUser = yield User_1.default.findOne({
            where: {
                [sequelize_1.Op.or]: [{ email }, { phone }],
            },
        });
        if (existingUser) {
            throw new Error("Email or phone already registered");
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield User_1.default.create({
            email,
            phone,
            date,
            type,
            password: hashedPassword,
            ConfirmPassword: hashedPassword,
        });
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        yield VerificationCode_1.default.create({
            userId: newUser.id,
            code,
        });
        yield (0, emailServices_1.sendEmail)({
            to: newUser.email,
            subject: "رمز تفعيل الحساب - Noon",
            text: `مرحباً،

رمز تفعيل حسابك هو: ${code}

إذا لم تقم بطلب هذا الرمز، يرجى تجاهل هذه الرسالة.

شكراً لاستخدامك Noon.`,
            html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 500px; margin: auto; color: #333;">
      <h2 style="color: #0078d7; text-align: center;">رمز تفعيل الحساب الخاص بك</h2>
      <p style="font-size: 16px;">مرحباً،</p>
      <p style="font-size: 16px;">رمز تفعيل حسابك في <strong>Noon</strong> هو:</p>
      <p style="font-size: 28px; font-weight: bold; color: #e94e77; text-align: center; margin: 20px 0;">${code}</p>
      <p style="font-size: 14px; color: #555;">إذا لم تطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بأمان.</p>
      <hr style="border:none; border-top:1px solid #ddd; margin: 30px 0;">
      <p style="font-size: 14px; text-align: center; color: #777;">شكراً لاستخدامك Noon.</p>
    </div>
  `,
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return { newUser, token };
    });
}
function verifyUserAccount(userId, code) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield VerificationCode_1.default.findOne({ where: { userId, code } });
        if (!record) {
            throw new Error("Invalid verification code");
        }
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        yield record.destroy();
        return user;
    });
}
function signinUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return { user, token };
    });
}
function sendPasswordResetLink(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            throw new Error("This email is not registered with us");
        }
        let existingToken = yield PasswordResetToken_1.default.findOne({
            where: { userId: user.id },
        });
        if (!existingToken) {
            const token = crypto_1.default.randomBytes(32).toString("hex");
            existingToken = yield PasswordResetToken_1.default.create({
                userId: user.id,
                token,
            });
        }
        const resetLink = `http://localhost:8000/api/auth/reset-password/${user.id}/${existingToken.token}`;
        const html = `<p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>`;
        yield (0, emailServices_1.sendEmail)({
            to: user.email,
            subject: "Password Reset - Noon-Platform",
            html,
        });
        return;
    });
}
function validateResetLink(userId, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const resetToken = yield PasswordResetToken_1.default.findOne({
            where: { userId: user.id, token },
        });
        if (!resetToken) {
            throw new Error("Invalid or expired link");
        }
        return true;
    });
}
function resetUserPassword(userId, token, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            throw new Error("User not found");
        }
        const resetToken = yield PasswordResetToken_1.default.findOne({
            where: { userId: user.id, token },
        });
        if (!resetToken) {
            throw new Error("Invalid or expired link");
        }
        const hashed = yield bcrypt_1.default.hash(password, 10);
        user.password = hashed;
        user.ConfirmPassword = hashed;
        yield user.save();
        yield resetToken.destroy();
        return;
    });
}
