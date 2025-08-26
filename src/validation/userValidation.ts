import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

export const RegisterValidate = Joi.object({
  email: Joi.string().email().required(),
  password: passwordComplexity().required(),
  ConfirmPassword: passwordComplexity().required(),
  type: Joi.string().valid("Customer", "Admin", "User").optional(),
  phone: Joi.number().required(),
  date: Joi.date(),
});

export const LoginValidate = Joi.object({
  email: Joi.string().email().required(),
  password: passwordComplexity().required(),
});

export const NewPasswordValidate = Joi.object({
  password: passwordComplexity().optional(),
});
