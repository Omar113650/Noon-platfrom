import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/constant";
import {
  createP,
  GetAll,
  GetByID,
  Delete,
  Update,
  AddProductToCart,
} from "../services/ProductService";
import { Op } from "sequelize";
import { getCache, setCache, deleteCache } from "../utils/redis";

// @desc    Create new Product
export const AddProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    const newProduct = await createP(req.body);
    await deleteCache("products_list");
    res.status(HTTP_STATUS.CREATED).json({ message:"Product_created", data: newProduct });
  } catch (error: any) {
    console.error("Sequelize Error:", error);
    res.status(500).json({ message: "Sequelize Error", details: error.message });
  }
});


// @desc    Get all products with filters, sorting, and pagination
export const GetAllProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const cacheKey = `products_list_${JSON.stringify(req.query)}`;

    // 1 حات من الكاش
    const cachedData = await getCache<any>(cacheKey);
    if (cachedData) {
      console.log("Products from cache");
      res.status(HTTP_STATUS.OK).json(cachedData);
      return;
    }

    const query: any = {};
    const order: any[] = [];

    if (req.query.search) {
      query.name = { [Op.like]: `%${req.query.search}%` };
    }

    if (req.query.minPrice && req.query.maxPrice) {
      query.price = {
        [Op.between]: [Number(req.query.minPrice), Number(req.query.maxPrice)],
      };
    } else if (req.query.price) {
      query.price = Number(req.query.price);
    }

    if (req.query.sortPrice) {
      order.push([
        "price",
        req.query.sortPrice.toString().toUpperCase() === "DESC"
          ? "DESC"
          : "ASC",
      ]);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const { products, totalItems, totalPages } = await GetAll(
      query,
      order,
      page,
      limit
    );

    if (!products.length) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("no_products_found") });
      return;
    }

    const response = {
      message: req.t("products_fetched_successfully"),
      data: products,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
      },
    };

    // 2️ حفظ في الكاش لمدة 5 دقائق
    await setCache(cacheKey, response, 300);

    res.status(HTTP_STATUS.OK).json(response);
  }
);

// @desc    Get product by ID
export const GetProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const cacheKey = `product_${id}`;

    // جلب من الكاش
    const cachedProduct = await getCache<any>(cacheKey);
    if (cachedProduct) {
      console.log(" Product from cache");
      res.status(HTTP_STATUS.OK).json(cachedProduct);
      return;
    }

    const product = await GetByID(Number(id));
    if (!product) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("product_not_found") });
      return;
    }

    const response = {
      message: req.t("product_fetched_successfully"),
      data: product,
    };

    // حفظ في الكاش لمدة 10 دقائق
    await setCache(cacheKey, response, 600);

    res.status(HTTP_STATUS.OK).json(response);
  }
);

// @desc    Update Product
export const UpdateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const Product = await GetByID(Number(id));
    if (!Product) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("Product_not_found") });
      return;
    }

    const updatedProduct = await Update(Number(id), req.body);
    if (!updatedProduct) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: req.t("Product_update_failed") });
      return;
    }

    // مسح الكاش للمنتج و القائمة
    await deleteCache(`product_${id}`);
    await deleteCache("products_list");

    res.status(HTTP_STATUS.OK).json({
      message: req.t("Product_updated_successfully"),
      data: updatedProduct,
    });
  }
);

// @desc    Delete Product
export const DeleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const Product = await GetByID(Number(id));
    if (!Product) {
      res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("Product_not_found") });
      return;
    }

    await Delete(Number(id));

    // مسح الكاش
    await deleteCache(`product_${id}`);
    await deleteCache("products_list");

    res
      .status(HTTP_STATUS.OK)
      .json({ message: req.t("Product_deleted_successfully") });
  }
);

export const AddLoveProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await AddProductToCart(Number(req.params.id), req.body);

    if (!product) {
       res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: req.t("Product_not_found") });
        return
    }

    res
      .status(HTTP_STATUS.CREATED)
      .json({ message: req.t("Product_created"), data: product });
  }
);