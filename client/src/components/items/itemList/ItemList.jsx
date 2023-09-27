import { useState } from "react";

import { MdOutlineAddCircle, MdOutlineRemoveCircle } from "react-icons/md";
import { IoFlashSharp, IoFastFoodSharp } from "react-icons/io5";
import { FaHandHoldingHeart } from "react-icons/fa";
import { PiListDashesBold } from "react-icons/pi";

import {
  addToWishlist,
  removeFromWishlist,
  updateQuantity,
} from "../../../api/wishlist";

import "./ItemList.css";

const ItemList = (props) => {
  const [selectedTag, setSelectedTag] = useState("all");

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
  };

  const filteredItems = props.items.filter((item) => {
    const matchesTag = selectedTag === "all" || item.tags.includes(selectedTag);

    const itemMatchesSearch = !props.packed
      ? item.title.toLowerCase().includes(props.getterSearch.toLowerCase())
      : true;

    return matchesTag && itemMatchesSearch;
  });

  const counterAll = props.items
    .map((item) => item.quantity)
    .reduce((sum, value) => sum + value, 0);

  const counterFoods = props.items
    .filter((item) => item.tags.includes("foods"))
    .map((item) => item.quantity)
    .reduce((sum, value) => sum + value, 0);

  const counterLifestyle = props.items
    .filter((item) => item.tags.includes("lifestyle"))
    .map((item) => item.quantity)
    .reduce((sum, value) => sum + value, 0);

  const counterMustHave = props.items
    .filter((item) => item.tags.includes("must-have"))
    .map((item) => item.quantity)
    .reduce((sum, value) => sum + value, 0);

  const handleAddToWishlist = async (item) => {
    const wishlistItem = {
      ...item,
      quantity: 1,
    };

    try {
      await addToWishlist(wishlistItem);
      props.update(item.title);
    } catch (error) {
      console.error("Error adding packed item:", error);
    }
  };

  const handleRemoveFromWishlist = async (item) => {
    const wishlistItemId = item.id;

    try {
      await removeFromWishlist(wishlistItemId);
      props.update(wishlistItemId);
    } catch (error) {
      console.error("Error removing packed item:", error);
    }
  };

  const handleQuantity = async (item, updatedQuantity) => {
    await updateQuantity(item.id, parseInt(updatedQuantity));
    props.update(`${updatedQuantity} items for ${item.title}`);
  };

  return (
    <>
      <div className="item-list-filters">
        <button
          title="See all categories items"
          className={`${
            selectedTag === "all" && props.items.length > 0 ? "active" : ""
          }`}
          disabled={props.items.length === 0}
          onClick={() => handleTagFilter("all")}
        >
          <PiListDashesBold className="icon-category" />
          All
          <span className="counter">
            {props.packed && counterAll > 0 && `(${counterAll})`}
          </span>
        </button>{" "}
        <button
          title="See hiking items"
          className={`${
            selectedTag === "foods" && props.items.length > 0 ? "active" : ""
          }`}
          disabled={props.items.length === 0}
          onClick={() => handleTagFilter("foods")}
        >
          <IoFastFoodSharp className="icon-category" /> Foods{" "}
          <span className="counter">
            {props.packed && counterFoods > 0 && `(${counterFoods})`}
          </span>
        </button>{" "}
        <button
          title="See sports items"
          className={`${
            selectedTag === "lifestyle" && props.items.length > 0
              ? "active"
              : ""
          }`}
          disabled={props.items.length === 0}
          onClick={() => handleTagFilter("lifestyle")}
        >
          <IoFlashSharp className="icon-category" />
          Lifestyle{" "}
          <span className="counter">
            {props.packed && counterLifestyle > 0 && `(${counterLifestyle})`}
          </span>
        </button>
        <button
          title="See essential items"
          className={`${
            selectedTag === "must-have" && props.items.length > 0
              ? "active"
              : ""
          }`}
          disabled={props.items.length === 0}
          onClick={() => handleTagFilter("must-have")}
        >
          <FaHandHoldingHeart className="icon-category" />
          MustHave{" "}
          <span className="counter">
            {props.packed && counterMustHave > 0 && `(${counterMustHave})`}
          </span>
        </button>
      </div>
      <div className="item-list">
        {filteredItems.map((item) => {
          const isItemPacked = props.referenceList.some(
            (wishlistItem) => wishlistItem.id === item.id
          );

          return (
            <div className="item" key={item.id}>
              {(props.packed && (
                <div className="quantity-container">
                  <select
                    id="quantitySelect"
                    value={item.quantity}
                    onChange={(event) =>
                      handleQuantity(item, event.target.value)
                    }
                    tabIndex="0"
                    aria-labelledby="quantitySelect"
                  >
                    {Array.from({ length: 10 }, (_, index) => (
                      <option
                        key={index + 1}
                        value={index + 1}
                        defaultValue={index + 1 === item.quantity}
                      >
                        {index + 1}
                      </option>
                    ))}
                  </select>

                  <p>{item.title}</p>
                </div>
              )) || <p>{item.title}</p>}

              {(!props.packed && (
                <button
                  title={`Add ${item.title} to the wishlist`}
                  onClick={() => !isItemPacked && handleAddToWishlist(item)}
                >
                  <MdOutlineAddCircle
                    className={`add-item ${isItemPacked && "disabled"}`}
                  />
                </button>
              )) || (
                <button
                  title={`Remove ${item.title} to the wishlist`}
                  onClick={() => handleRemoveFromWishlist(item)}
                >
                  <MdOutlineRemoveCircle className="remove-item" />
                </button>
              )}
            </div>
          );
        })}

        {props.items.length === 0 && (
          <div className="empty">
            <p>Ho, ho no... I see no gifts in here.</p>
          </div>
        )}
        {props.items.length > 0 && filteredItems.length === 0 && (
          <div className="empty">
            <p>No items</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemList;
