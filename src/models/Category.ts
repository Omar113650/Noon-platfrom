import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface CategoryAttributes {
  id: number;
  name: string;
}

export interface CategoryCreateAttributes
  extends Optional<CategoryAttributes, "id"> {}

class Category
  extends Model<CategoryAttributes, CategoryCreateAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "Categories",
    timestamps: true,
  }
);

export default Category;
