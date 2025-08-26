import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface OrderItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderItemCreateAttributes
  extends Optional<OrderItemAttributes, "id"> {}

class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreateAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "Orders", key: "id" },
      onDelete: "CASCADE",
      field: "OrderID", // لو العمود في DB مكتوب كده
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "Products", key: "id" },
      onDelete: "CASCADE",
      field: "ProductID", // لو العمود في DB مكتوب كده
    },

    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "OrderItems",
    timestamps: false,
  }
);

export default OrderItem;











