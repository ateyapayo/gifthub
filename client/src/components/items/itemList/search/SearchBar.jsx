import { MdOutlineSearch, MdOutlineClose } from "react-icons/md";

import "./SearchBar.css";

const SearchBar = (props) => {
  return (
    <div className="search-container">
      <MdOutlineSearch className="search-icon" />
      <input
        type="text"
        placeholder="search"
        value={props.getterSearch}
        onChange={(e) => props.setterSearch(e.target.value)}
        aria-label="Search"
      />
      {props.getterSearch.length > 0 && (
        <button
          onClick={() => props.setterSearch("")}
          aria-label="Clear search"
        >
          <MdOutlineClose />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
