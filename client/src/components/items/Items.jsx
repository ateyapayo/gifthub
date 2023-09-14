import { useState, useEffect } from "react";

import { getItems } from "../../api/items";

import { getPackedItems } from "../../api/packedItems";

import SearchBar from "./itemList/search/SearchBar";

import ItemList from "./itemList/ItemList";

import "./Items.css";

const Items = (props) => {
  const [allItems, setAllItems] = useState([]);
  const [packedItems, setPackedItems] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAllItems = async () => {
    const items = await getItems();
    setAllItems(items);
  };

  const fetchPackedItems = async () => {
    const items = await getPackedItems();
    setPackedItems(items);
  };

  useEffect(() => {
    fetchAllItems();
    fetchPackedItems();
  }, [props.reload]);

  return (
    <div className="items">
      <div className="suggested-container">
        <div className="suggested-heading">
          <h3 className="title-list">Suggested Items</h3>
          <SearchBar getterSearch={search} setterSearch={setSearch} />
        </div>
        <ItemList
          items={allItems}
          update={props.update}
          referenceList={packedItems}
          getterSearch={search}
          setterSearch={setSearch}
        />
      </div>

      <div className="suitcase-container">
        <h3 className="title-list">Your Suitcase</h3>
        <ItemList
          items={packedItems}
          packed={true}
          update={props.update}
          referenceList={packedItems}
        />
      </div>
    </div>
  );
};

export default Items;
