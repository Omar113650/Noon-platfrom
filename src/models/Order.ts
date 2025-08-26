import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface OrderAttributes {
  id: number;
  userId: number;
  status: string;
  totalAmount: number;
}
export enum OrderStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

export interface OrderCreateAttributes
  extends Optional<OrderAttributes, "id"> {}

class Order
  extends Model<OrderAttributes, OrderCreateAttributes>
  implements OrderAttributes
{
  public id!: number;
  public userId!: number;
  public status!: string;
  public totalAmount!: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}
Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
      field: "useID",
    },
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatus)),
      allowNull: false,
      defaultValue: OrderStatus.PENDING,
    },

    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "Orders",
    timestamps: true,
  }
);

export default Order;
