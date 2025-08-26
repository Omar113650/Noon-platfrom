import { Router } from "express";
import {
  AddOffer,
  GetAllOffers,
  GetOfferById,
  UpdateOffer,
  DeleteOffer,
} from "../Controllers/OfferController";
import { ValidatedID } from "../middlewares/ValidateID";
const router = Router();

router.post("/Create-offers", AddOffer);
router.get("/Get-offers", GetAllOffers);
router.get("/Get-offers-ById/:id", ValidatedID, GetOfferById);
router.put("/update-offers/:id", ValidatedID, UpdateOffer);
router.delete("/delete-offers/:id", ValidatedID, DeleteOffer);

export default router;
