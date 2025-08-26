"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserOrAdmin = exports.verifyAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing after Bearer" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.verifyToken = verifyToken;
const verifyAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        var _a;
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) {
            next();
        }
        else {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }
    });
};
exports.verifyAdmin = verifyAdmin;
const verifyUserOrAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        var _a, _b;
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) === req.params.id) {
            next();
        }
        else {
            return res.status(403).json({ message: "Access denied. Not allowed." });
        }
    });
};
exports.verifyUserOrAdmin = verifyUserOrAdmin;
