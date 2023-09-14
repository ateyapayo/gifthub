const getPackedItems = async () => {
  const res = await fetch("http://localhost:3001/packed-items");
  const items = await res.json();
  return items;
};

const addPackedItem = async (packedItem) => {
  const res = await fetch("http://localhost:3001/packed-items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(packedItem),
  });

  const addedItem = await res.json();
  return addedItem;
};

const removePackedItem = async (packedItemId) => {
  const res = await fetch(
    `http://localhost:3001/packed-items/${packedItemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res;
};

const updateQuantity = async (itemId, quantity) => {
  const res = await fetch(`http://localhost:3001/packed-items/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  const updatedItem = await res.json();
  return updatedItem;
};

module.exports = {
  getPackedItems,
  addPackedItem,
  removePackedItem,
  updateQuantity,
};
