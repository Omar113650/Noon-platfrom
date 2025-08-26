"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    price: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    stock: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    categoryId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "Categories", key: "id" },
        onDelete: "CASCADE",
    },
}, {
    sequelize: connectDB_1.default,
    modelName: "Product",
    tableName: "Products",
    timestamps: true,
});
exports.default = Product;
