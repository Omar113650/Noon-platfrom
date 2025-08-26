// import request from "supertest";
// import express, { Application } from "express";
// import cookieParser from "cookie-parser";
// import * as ProductService from "../services/ProductService";

// import { AddProduct, GetAllProduct } from "../Controllers/ProductsController";

// jest.mock("../utils/logger.ts", () => ({
//   info: jest.fn(),
// }));

// jest.mock("../services/ProductService.ts");

// const app: Application = express();
// app.use(express.json());
// app.use(cookieParser());

// app.post("/add-product", AddProduct);
// app.get("/get-product", GetAllProduct);

// describe("ProductsController", () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });
// });describe("AddProduct", () => {
    
//   it("return 400 if missing any field", async () => {
//     const res = await request(app).post("/add-product").send({});
//     expect(res.status).toBe(500);
//     expect(res.body.message).toBe("All fields are required");
//   });

//   it("if success input good", async () => {
//     (ProductService.create as jest.Mock).mockResolvedValue({
//       id: 1,
//       name: "omar",
//       price: 200,
//       categoryId: 1,
//       description: "very good",
//       stock: 2,
//     });

//     const res = await request(app).post("/add-product").send({
//       id: 1,
//       name: "omar",
//       price: 200,
//       categoryId: 1,
//       description: "very good",
//       stock: 2,
//     });

//     expect(res.status).toBe(201);
//     expect(res.body.message).toBe("Product created successfully");
//     expect(res.body.product).toHaveProperty("id", 1);
//   });
// });
