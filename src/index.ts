import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/connectDB";
import { setupSwagger } from "./swagger";
import i18next from "./config/i18n";
import i18nextMiddleware from "i18next-http-middleware";
import "./workers/orderWorker";
import http from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  deal with customer is request me this project
app.get("/api/isAppBlocked", (req, res) => {
  res.json({ isBlocked: true }); // false الحالة
});
// /************************************************************************************************************* */

app.use(express.json());

app.use(i18nextMiddleware.handle(i18next));

import CartRoutes from "./Routes/CartRoutes";
import AddressRoutes from "./Routes/AddressRoutes";
import AuthRoutes from "./Routes/UserRoutes";
import CategoryRoutes from "./Routes/CategoryRoutes";
import ProductCategory from "./Routes/ProductRoutes";
import OfferRoutes from "./Routes/OfferRoutes";
import OrderRoutes from "./Routes/OrderRoutes";

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/address", AddressRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", ProductCategory);
app.use("/api/v1/cart", CartRoutes);
app.use("/api/v1/offer", OfferRoutes);
app.use("/api/v1/order", OrderRoutes);

import { initWebSocket } from "./realtime/ws";

const server = http.createServer(app);
initWebSocket(server);

setupSwagger(app);

sequelize
  .authenticate()
  .then(() => console.log(" Connected to DB successfully."))
  .catch((err: Error) => console.error(" DB Connection Error:", err.message));

sequelize.sync().then(() => {
  console.log(" All models synced with DB!");
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available on http://localhost:${PORT}/api-docs`);
});
