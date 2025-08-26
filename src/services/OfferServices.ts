import Offer, { OfferCreateAttributes } from "../models/Offer";

// create Offer
export const create = async (data: OfferCreateAttributes) => {
  return await Offer.create(data);
};

// get all Offers with pagination + filtering
export const GetAll = async (
  filter: any = {},
  order: any[] = [],
  page: number = 1,
  limit: number = 10
) => {
  const offset = (page - 1) * limit;

  const { rows: offers, count: totalItems } = await Offer.findAndCountAll({
    where: filter,
    order,
    limit,
    offset,
  });

  return {
    offers,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  };
};

// get Offer by id
export const GetByID = async (id: number) => {
  return await Offer.findByPk(id);
};

// delete Offer
export const Delete = async (id: number) => {
  const offer = await Offer.findByPk(id);
  if (!offer) return null;
  await Offer.destroy({ where: { id } });
  return offer;
};

// update Offer
export const Update = async (
  id: number,
  data: Partial<OfferCreateAttributes>
) => {
  const offer = await Offer.findByPk(id);
  if (!offer) return null;
  await Offer.update(data, { where: { id } });
  return offer;
};
