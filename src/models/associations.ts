import User from "./User";
import Category from "./Category";
import Address from "./Address";
import CartItem from "./CartItem";
import Cart from "./Cart";
import Product from "./Product";
import Offer from "./Offer";
import Order from "./Order";
import OrderItem from "./OrderItem";
import LoveCart from "./Love";
// import SuugestProduct from "./SuugestedProduct";

// User.hasMany(Product, { foreignKey: "UserID", as: "Products" });
// Product.belongsTo(User, { foreignKey: "UserID", as: "users" });

User.hasMany(Address, { foreignKey: "UserID", as: "Addresses" });
Address.belongsTo(User, { foreignKey: "UserID", as: "User" });

// User.hasOne(Cart, { foreignKey: "UserID", as: "Cart" });
// Cart.belongsTo(User, { foreignKey: "UserID", as: "User" });

Cart.hasMany(CartItem, { foreignKey: "cartId", as: "CartItems" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "Cart" });

Product.hasMany(CartItem, { foreignKey: "productId", as: "CartItems" });
CartItem.belongsTo(Product, { foreignKey: "productId", as: "Product" });


Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });

// Product.hasMany(SuugestProduct, { foreignKey: "ProductID", as: "Suggestions" });
// SuugestProduct.belongsTo(Product, { foreignKey: "ProductID", as: "Product" });

Product.hasOne(Offer, { foreignKey: "categoryId", as: "Offer" });
Offer.belongsTo(Product, { foreignKey: "categoryId", as: "Product" });

User.hasMany(Order, { foreignKey: "userId", as: "Orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "User" });

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "OrderItems" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "Order" });

Product.hasMany(OrderItem, { foreignKey: "ProductID", as: "OrderItems" });
OrderItem.belongsTo(Product, { foreignKey: "ProductID", as: "Product" });

CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(CartItem, { foreignKey: "productId", as: "cartItems" });

Product.hasMany(LoveCart, { foreignKey: "productId", as: "LOVES" });
LoveCart.belongsTo(Product, { foreignKey: "productId", as: "Product" });

User.hasOne(LoveCart, { foreignKey: "UserID", as: "LOVES" });
LoveCart.belongsTo(User, { foreignKey: "UserID", as: "User" });






