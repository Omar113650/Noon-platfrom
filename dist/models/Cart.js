"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
class Cart extends sequelize_1.Model {
}
Cart.init({
    id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE",
    },
}, {
    sequelize: connectDB_1.default,
    modelName: "Cart",
    tableName: "Carts",
    timestamps: false,
});
exports.default = Cart;
