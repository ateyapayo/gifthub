import { HiGift } from "react-icons/hi2";

import "./Header.css";

import DarkMode from "./DarkMode/DarkMode";

const Header = () => {
  const today = new Date();

  const christmas = new Date(today.getFullYear(), 11, 25);

  if (today > christmas) {
    christmas.setFullYear(today.getFullYear() + 1);
  }

  const daysLeft = Math.ceil((christmas - today) / (1000 * 60 * 60 * 24));
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
          "Ho, Ho Ho! Christmas is just <span>{daysLeft} days</span> away!
        </h3>
        <h3 aria-label="Your trip title" title="Your trip title">
          {" "}
          Stuck on what to give your loved ones? Fear not!
        </h3>
        <h3>
          {" "}
          Discover the perfect presents with our curated collection of 100+ gift
          ideas."
        </h3>
      </div>
    </>
  );
};

export default Header;
