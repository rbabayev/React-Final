import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMeals } from "./redux/ComandsSlice";
import { Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Breakfast from "./components/Breakfast";
import Dinner from "./components/Dinner";
import Lunch from "./components/Lunch";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  return (
    <div>
      <Routes className="header-selection">
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/dinner" element={<Dinner />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
