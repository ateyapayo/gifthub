import { FaSuitcaseRolling } from "react-icons/fa";

import "./Header.css";

import DarkMode from "./DarkMode/DarkMode";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <a title="Logo" href="/" aria-label="MyPack website" tabIndex="0">
          <FaSuitcaseRolling />
          <h1>MyPack</h1>
        </a>
      </div>
      <DarkMode />
    </header>
  );
};

export default Header;
