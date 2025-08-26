"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
class Order extends sequelize_1.Model {
}
Order.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onDelete: "CASCADE",
        field: "useID"
    },
    status: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    totalAmount: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
}, {
    sequelize: connectDB_1.default,
    modelName: "Order",
    tableName: "Orders",
    timestamps: true,
});
exports.default = Order;
