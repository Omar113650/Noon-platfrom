import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface CartAttributes {
  id: number;
  userId: number;
}

export interface CartCreateAttributes extends Optional<CartAttributes, "id"> {}

class Cart
  extends Model<CartAttributes, CartCreateAttributes>
  implements CartAttributes
{
  public id!: number;
  public userId!: number;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
userId: {
  type: DataTypes.INTEGER.UNSIGNED,
  allowNull: false,
  references: { model: "Users", key: "id" },
  onDelete: "CASCADE",
  field: "UserID",   // 👈 هنا الحل
},

  },
  {
    sequelize,
    modelName: "Cart",
    tableName: "Carts",
    timestamps: false,
  }
);

export default Cart;
