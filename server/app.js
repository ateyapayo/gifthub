const express = require("express");
const {
  initialise_db,
  get_items,
  get_item_by_id,
  get_gender,
  update_gender,
  get_packed_items,
  add_packed_item,
  remove_packed_item,
  update_packed_item,
} = require("./db.js");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

initialise_db();

// Gender

// We're initialising gender as a let, since it can't be a const in /trip anymore - we'll need it both in /trip and /items.
let gender;

app.get("/gender", (req, res) => {
  gender = get_gender();
  res.status(200);
  res.json(gender);
});

app.patch("/gender", (req, res) => {
  gender = req.body;
  update_gender(gender);
  res.status(200);
  res.json(gender);
});

// Items

app.get("/items", (req, res) => {
  const items = get_items();

  if (gender && gender.genderType) {
    const filteredItems = items.filter(
      (item) => item.gender === gender.genderType
    );
    res.status(200).json(filteredItems);
  } else {
    res.status(200).json(items);
  }
});

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  const item = get_item_by_id(id);
  if (item === undefined) {
    res.status(404);
    res.json({ error: "Item not found" });
    return;
  }

  res.status(200);
  res.json(item);
});

// Packed Items

app.get("/packed-items", (req, res) => {
  const items = get_packed_items();
  res.status(200);
  res.json(items);
});

app.post("/packed-items", (req, res) => {
  packedItem = req.body;
  add_packed_item(packedItem);
  res.status(200);
  res.json(packedItem);
});

app.delete("/packed-items/:id", (req, res) => {
  const packedItemId = req.params.id;
  remove_packed_item(packedItemId);
  res.status(200).send();
});

app.patch("/packed-items/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedQuantity = req.body.quantity;
  const updatedItem = update_packed_item(itemId, updatedQuantity);

  if (updatedItem) {
    res.status(200).json(updatedItem);
  } else {
    res.status(404).json({ error: "Packed item not found" });
  }
});

app.listen(PORT, (error) => {
  if (!error) console.log("Server is running. Listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
