import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export interface CartItemCreateAttributes extends Optional<CartItemAttributes, "id"> {}

class CartItem extends Model<CartItemAttributes, CartItemCreateAttributes>
  implements CartItemAttributes {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
}


CartItem.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    cartId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "Carts", key: "id" },
      onDelete: "CASCADE",
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "Products", key: "id" },
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CartItem",
    tableName: "CartItems",
    timestamps: false,
  }
);

export default CartItem;

