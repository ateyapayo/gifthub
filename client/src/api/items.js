const getItems = async () => {
  const res = await fetch("http://localhost:3001/items");
  const items = await res.json();
  return items;
};

module.exports = {
  getItems,
};
