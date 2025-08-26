import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface LoveAttributes {
  id: number;
  productId: number;
  userId: number;
}
export interface CreateLoveAttributes extends Optional<LoveAttributes, "id"> {}

class LoveCart
  extends Model<CreateLoveAttributes, LoveAttributes>
  implements LoveAttributes
{
  public id!: number;
  public productId!: number;
  public userId!: number;

  readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

LoveCart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Products", key: "id" },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "LOVE_PRODUCT",
    tableName: "LOVES",
    timestamps: true,
  }
);
export default LoveCart;
