import { HiGift } from "react-icons/hi2";

import "./Header.css";

import DarkMode from "./DarkMode/DarkMode";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <a title="Logo" href="/" aria-label="MyPack website" tabIndex="0">
            <HiGift />
            <h1>GiftHub</h1>
          </a>
        </div>
        <DarkMode />
      </header>

      <div className="opening">
        <h3 aria-label="Your destination" title="Your destination">
          Ho, Ho Ho! Christmas is coming soon!
        </h3>
        <h3 aria-label="Your trip title" title="Your trip title">
          {" "}
          Stuck on what to give your loved ones? <span>Fear not!</span>
        </h3>
        <h3>
          {" "}
          Discover the perfect presents with our curated collection of 100+ gift
          ideas.
        </h3>
      </div>
    </>
  );
};

export default Header;
