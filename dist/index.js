"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const swagger_1 = require("./swagger");
const i18n_1 = __importDefault(require("./config/i18n"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
require("./workers/orderWorker");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
//  deal with customer is request me this project
app.get("/api/isAppBlocked", (req, res) => {
    res.json({ isBlocked: true }); // false الحالة
});
// /************************************************************************************************************* */
app.use(express_1.default.json());
app.use(i18next_http_middleware_1.default.handle(i18n_1.default));
const CartRoutes_1 = __importDefault(require("./Routes/CartRoutes"));
const AddressRoutes_1 = __importDefault(require("./Routes/AddressRoutes"));
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const CategoryRoutes_1 = __importDefault(require("./Routes/CategoryRoutes"));
const ProductRoutes_1 = __importDefault(require("./Routes/ProductRoutes"));
const OfferRoutes_1 = __importDefault(require("./Routes/OfferRoutes"));
const OrderRoutes_1 = __importDefault(require("./Routes/OrderRoutes"));
app.use("/api/v1/auth", UserRoutes_1.default);
app.use("/api/v1/address", AddressRoutes_1.default);
app.use("/api/v1/category", CategoryRoutes_1.default);
app.use("/api/v1/product", ProductRoutes_1.default);
app.use("/api/v1/cart", CartRoutes_1.default);
app.use("/api/v1/offer", OfferRoutes_1.default);
app.use("/api/v1/order", OrderRoutes_1.default);
(0, swagger_1.setupSwagger)(app);
connectDB_1.default
    .authenticate()
    .then(() => console.log(" Connected to DB successfully."))
    .catch((err) => console.error(" DB Connection Error:", err.message));
connectDB_1.default.sync().then(() => {
    console.log(" All models synced with DB!");
});
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI available on http://localhost:${PORT}/api-docs`);
});
