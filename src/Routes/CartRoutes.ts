import { Router } from "express";
import {
  CreateCart,
  GetAllInCart,
  CreateCartItem,
  GetCartItems,
  UpdateCartItemController,
  DeleteCartItemController,
} from "../Controllers/CartController";
import { ValidatedID } from "../middlewares/ValidateID";
const router = Router();

// سلة المستخدم
router.post("/carts", CreateCart);
router.get("/cart-items", GetCartItems);
router.get("/All-cart", GetAllInCart);

// عناصر السلة CRUD
router.post("/cart-items", CreateCartItem);
router.put("/cart-items/:id", ValidatedID, UpdateCartItemController);
router.delete("/cart-items/:id", ValidatedID, DeleteCartItemController);

export default router;

// {
//     "message": "Cart created successfully",
//     "cart": {
//         "id": 10,
//         "userId": 1
//     }
// }
