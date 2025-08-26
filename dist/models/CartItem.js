"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
class CartItem extends sequelize_1.Model {
}
CartItem.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    cartId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Carts", key: "id" },
        onDelete: "CASCADE",
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    sequelize: connectDB_1.default,
    modelName: "CartItem",
    tableName: "CartItems",
    timestamps: false,
});
exports.default = CartItem;
