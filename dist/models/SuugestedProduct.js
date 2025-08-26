"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
class SuggestedProduct extends sequelize_1.Model {
}
SuggestedProduct.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    productId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
    },
    suggestedProductId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
    },
}, {
    sequelize: connectDB_1.default,
    modelName: "SuggestedProduct",
    tableName: "SuggestedProducts",
    timestamps: false,
});
exports.default = SuggestedProduct;
