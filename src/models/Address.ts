import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface AddressAttributes {
  id: number;
  Governorate: string;
  City: string;
  Area: string;
  Address: string;
  BuildingNumber: bigint;
  FloorNumber: number;
  ApatrmentNumber: number;
  PhoneNumber: number;
  UserID: number;
}

export interface AddressCreateAttributes
  extends Optional<AddressAttributes, "id"> {}

class Address
  extends Model<AddressAttributes, AddressCreateAttributes>
  implements AddressAttributes
{
  public id!: number;
  public Governorate!: string;
  public City!: string;
  public Area!: string;
  public Address!: string;
  public BuildingNumber!: bigint;
  public FloorNumber!: number;
  public ApatrmentNumber!: number;
  public PhoneNumber!: number;
  public UserID!: number;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Governorate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Area: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BuildingNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    FloorNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ApatrmentNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    UserID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Address",
    tableName: "Addresses",
    timestamps: true,
  }
);

export default Address;
