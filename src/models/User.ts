import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/connectDB";

export interface UserAttributes {
  id: number;
  email: string;
  phone: number;
  date: Date;
  type: string;
  password: string;
  ConfirmPassword: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreateAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreateAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public phone!: number;
  public date!: Date;
  public type!: string;
  public password!: string;
  public ConfirmPassword!: string;

  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ConfirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",

    indexes: [
      {
        unique: true,
        fields: ["email","phone"],
      },
    ],
  }
);

export default User;

