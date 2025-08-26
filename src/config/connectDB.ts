import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE || "",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mssql",
    port: parseInt(process.env.DB_PORT || "1433"),
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true, 
      },
    },
  }
);

export default sequelize;
