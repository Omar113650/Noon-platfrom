import { Router } from "express";
import {
  AddAddress,
  GetAddress,
  GetAddressByID,
  UpdateAddress,
  DeleteAddress,
} from "../Controllers/AddressController";

import { AddressValidated } from "../validation/addressValidation";
import validate from "../middlewares/validate";
import { ValidatedID } from "../middlewares/ValidateID";
const router = Router();

router.post("/add-address", validate(AddressValidated), AddAddress);
router.get("/get-address", GetAddress);
router.get("/get-address-ById/:id", ValidatedID, GetAddressByID);
router.put(
  "/update-address/:id",
  ValidatedID,
  validate(AddressValidated),
  UpdateAddress
);
router.delete("/delete-address/:id", ValidatedID, DeleteAddress);

export default router;
