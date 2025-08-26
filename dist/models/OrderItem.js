"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
class OrderItem extends sequelize_1.Model {
}
OrderItem.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Orders", key: "id" },
        onDelete: "CASCADE",
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Products", key: "id" },
        onDelete: "CASCADE",
    },
    quantity: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    price: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
}, {
    sequelize: connectDB_1.default,
    modelName: "OrderItem",
    tableName: "OrderItems",
    timestamps: false,
});
exports.default = OrderItem;
