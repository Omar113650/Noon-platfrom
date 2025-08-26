"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
class Address extends sequelize_1.Model {
}
Address.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    Governorate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    City: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Area: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    BuildingNumber: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    FloorNumber: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    ApatrmentNumber: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    PhoneNumber: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    UserID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: "Users", // لازم اسم الجدول اللي في DB أو الـ model لو معرفه قبله
            key: "id",
        },
        onDelete: "CASCADE",
    },
}, {
    sequelize: connectDB_1.default,
    modelName: "Address",
    tableName: "Addresses", // optional, but good practice
    timestamps: true,
});
exports.default = Address;
