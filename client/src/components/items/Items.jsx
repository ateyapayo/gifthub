import { useState, useEffect } from "react";

import { getItems } from "../../api/items";

import { getWishlist } from "../../api/wishlist";

import SearchBar from "./itemList/search/SearchBar";

import ItemList from "./itemList/ItemList";

import "./Items.css";

const Items = (props) => {
  const [allItems, setAllItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAllItems = async () => {
    const items = await getItems();
    setAllItems(items);
  };

  const fetchWishlistItems = async () => {
    const items = await getWishlist();
    setWishlistItems(items);
  };

  useEffect(() => {
    fetchAllItems();
    fetchWishlistItems();
  }, [props.reload]);

  return (
    <div className="items">
      <div className="suggested-container">
        <div className="suggested-heading">
          <h3 className="title-list">Suggested Gifts</h3>
          <SearchBar getterSearch={search} setterSearch={setSearch} />
        </div>
        <ItemList
          items={allItems}
          update={props.update}
          referenceList={wishlistItems}
          getterSearch={search}
          setterSearch={setSearch}
        />
      </div>

      <div className="wishlist-container">
        <h3 className="title-list">Santa's Wishlist</h3>
        <ItemList
          items={wishlistItems}
          packed={true}
          update={props.update}
          referenceList={wishlistItems}
        />
      </div>
    </div>
  );
};

export default Items;
