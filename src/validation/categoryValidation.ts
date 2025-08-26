import Joi from "joi";

export const CategoriesValidated = Joi.object({
  name: Joi.string().required(),
});
