import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface OfferAttributes {
  id: number;
  productId: number;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
}

export interface OfferCreateAttributes
  extends Optional<OfferAttributes, "id"> {}

class Offer
  extends Model<OfferAttributes, OfferCreateAttributes>
  implements OfferAttributes
{
  public id!: number;
  public productId!: number;
  public discountPercentage!: number;
  public startDate!: Date;
  public endDate!: Date;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Offer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: "Products", key: "id" },
      onDelete: "CASCADE",
    },
    discountPercentage: { type: DataTypes.FLOAT, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    modelName: "Offer",
    tableName: "Offers",
    timestamps: true,
  }
);

export default Offer;
