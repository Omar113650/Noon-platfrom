"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
class Offer extends sequelize_1.Model {
}
Offer.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    productId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
    },
    discountPercentage: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    startDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    endDate: { type: sequelize_1.DataTypes.DATE, allowNull: false },
}, {
    sequelize: connectDB_1.default,
    modelName: "Offer",
    tableName: "Offers",
    timestamps: true,
});
exports.default = Offer;
