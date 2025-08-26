import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
}

export interface ProductCreateAttributes
  extends Optional<ProductAttributes, "id"> {}

class Product
  extends Model<ProductAttributes, ProductCreateAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public categoryId!: number;

  readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "Categories", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "Products",
    timestamps: true,

    // indexes: [
    //   {
    //     fields: ["name"],
    //   },
    // ],
  }
);

export default Product;
