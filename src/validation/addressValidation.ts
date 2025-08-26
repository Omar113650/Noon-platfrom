import Joi from "joi";

export const AddressValidated = Joi.object({
  Governorate: Joi.string().required(),
  City: Joi.string().required(),
  Area: Joi.string().required(),
  Address: Joi.string().required(),
  BuildingNumber: Joi.number().required(),
  FloorNumber: Joi.number().required(),
  ApatrmentNumber: Joi.number().required(),
  PhoneNumber: Joi.number().required(),
  UserID: Joi.number().required(),
});
