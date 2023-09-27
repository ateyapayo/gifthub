import "./DarkMode.css";

import { useContext } from "react";

import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

import { ThemeContext } from "../../../context/ThemeContext";


const DarkMode = () => {
  const { toggle, mode } = useContext(ThemeContext);
  return (
    <a
      title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      aria-label="Toggle for the dark/light mode"
      href={`#${mode}-mode`}
      onClick={toggle}
    >
      <div className="container-icons">
        <BsFillMoonFill className="dark-icon" />
        <BsFillSunFill className="light-icon" />
        <div
          className="ball"
          style={mode === "light" ? { left: "2px" } : { right: "2px" }}
        />
      </div>
    </a>
  );
};

export default DarkMode;
