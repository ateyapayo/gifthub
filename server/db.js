const fs = require("fs");

let db = {};

const initialise_db = () => {
  let data = fs.readFileSync("mock_db.json");
  let dataJSON = JSON.parse(data);

  db = dataJSON;

  console.log("db initialised");
};

// Gender

const get_gender = () => {
  return db["gender"];
};

const update_gender = (gender) => {
  // Use of spread operator to merge the new trip data with the existing trip data
  db["gender"] = {
    ...db.gender,
    ...gender,
  };
};

// Items

const get_items = () => {
  return db["items"];
};

const get_item_by_id = (id) => {
  const items = get_items();
  return items.find((item) => item.id === Number.parseInt(id));
};

// Packed Items

const get_packed_items = () => {
  return db["packedItems"];
};

const add_packed_item = (packedItem) => {
  const packedItems = get_packed_items();
  packedItems.push(packedItem);
  db["packedItems"] = packedItems;
};

const remove_packed_item = (packedItemId) => {
  const packedItems = get_packed_items();
  const updatedPackedItems = packedItems.filter(
    (item) => item.id !== Number.parseInt(packedItemId)
  );
  db["packedItems"] = updatedPackedItems;
};

const update_packed_item = (itemId, updatedQuantity) => {
  const packedItems = get_packed_items();

  let packedItemToUpdate = packedItems.find(
    (item) => item.id === Number.parseInt(itemId)
  );

  packedItemToUpdate.quantity = updatedQuantity;

  const updatedPackedItems = packedItems.map((item) =>
    item.id === packedItemToUpdate.id ? packedItemToUpdate : item
  );

  db["packedItems"] = updatedPackedItems;

  return packedItemToUpdate;
};

module.exports = {
  initialise_db,
  get_gender,
  update_gender,
  get_items,
  get_item_by_id,
  get_packed_items,
  add_packed_item,
  remove_packed_item,
  update_packed_item,
};
