import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

interface SuggestedProductAttributes {
  id: number;
  productId: number;
  suggestedProductId: number;
}

interface SuggestedProductCreateAttributes extends Optional<SuggestedProductAttributes, "id"> {}

class SuggestedProduct extends Model<SuggestedProductAttributes, SuggestedProductCreateAttributes>
  implements SuggestedProductAttributes {
  public id!: number;
  public productId!: number;
  public suggestedProductId!: number;
}

SuggestedProduct.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "Products", key: "id" },
      onDelete: "CASCADE",
    },
    suggestedProductId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "Products", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "SuggestedProduct",
    tableName: "SuggestedProducts",
    timestamps: false,
  }
);

export default SuggestedProduct;
