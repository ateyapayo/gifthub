export const getWishlist = async () => {
  const res = await fetch("http://localhost:3001/wishlist");
  const items = await res.json();
  return items;
};

export const addToWishlist = async (wishlistItem) => {
  const res = await fetch("http://localhost:3001/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wishlistItem),
  });

  const addedItem = await res.json();
  return addedItem;
};

export const removeFromWishlist = async (itemId) => {
  const res = await fetch(`http://localhost:3001/wishlist/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};

export const updateQuantity = async (itemId, quantity) => {
  const res = await fetch(`http://localhost:3001/wishlist/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  const updatedItem = await res.json();
  return updatedItem;
};
