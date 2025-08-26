"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatedID = void 0;
const ValidatedID = (req, res, next) => {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: "Invalid ID: Must be a positive number" });
    }
    next();
};
exports.ValidatedID = ValidatedID;
