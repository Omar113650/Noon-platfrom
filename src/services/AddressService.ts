import Address, { AddressCreateAttributes } from "../models/Address";
// create
export const create = async (data: AddressCreateAttributes) => {
  return await Address.create(data);
};

// get
export const GetAll = async () => {
  return await Address.findAll();
};

// get by Id
export const GetByID = async (id: number) => {
  return await Address.findByPk(id);
};

// Partial اي مش الكل ايجباري اني احدثه
// update
export const Update = async (
  id: number,
  data: Partial<AddressCreateAttributes>
) => {
  const address = await Address.findByPk(id);
  if (!address) return null;
  await address.update(data);
  return address;
};

// delete
export const Delete = async (id: number) => {
  const address = await Address.findByPk(id);
  if (!address) return null;
  await address.destroy();
  return address;
};
