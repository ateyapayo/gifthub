import { useState } from "react";

import "./App.css";

import { ThemeProvider } from "./context/ThemeContext";

import Header from "./components/header/Header";
import Trip from "./components/trip/Trip";
import Items from "./components/items/Items";
import Footer from "./components/footer/Footer";

const App = () => {
  const [trigger, setTrigger] = useState("");

  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Trip update={setTrigger} />
        <Items update={setTrigger} reload={trigger} />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
