"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = require("../Controllers/CartController");
const router = (0, express_1.Router)();
// سلة المستخدم
router.post("/carts", CartController_1.CreateCart);
router.get("/cart-items", CartController_1.GetCartItems);
router.get("/All-cart", CartController_1.GetAllInCart);
// عناصر السلة CRUD
router.post("/cart-items", CartController_1.CreateCartItem);
router.put("/cart-items/:id", CartController_1.UpdateCartItemController);
router.delete("/cart-items/:id", CartController_1.DeleteCartItemController);
exports.default = router;
// {
//     "message": "Cart created successfully",
//     "cart": {
//         "id": 10,
//         "userId": 1
//     }
// }
