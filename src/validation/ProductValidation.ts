import Joi from "joi";

export const ProductValidated = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  categoryId: Joi.number().required(),
});
