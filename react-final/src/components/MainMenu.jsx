import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchMeals,
  setCurrentType,
  increment,
  decrement,
  addToCart,
} from "../redux/ComandsSlice";

import logo from "../images/logo.png";
import cartLogo from "../images/cartLogo.png";
import userLogo from "../images/userLogo.png";

function MainMenu() {
  const dispatch = useDispatch();
  const { meals, currentType, cartItemCount } = useSelector(
    (store) => store.meal
  );
  const [currentMealIndex, setCurrentMealIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  useEffect(() => {
    setCurrentMealIndex(0);
  }, [meals, currentType]);

  const handleTypeClick = (type) => {
    dispatch(setCurrentType(type));
  };

  const handleDecrementId = () => {
    setCurrentMealIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
      return newIndex;
    });
  };

  const handleIncrementId = () => {
    setCurrentMealIndex((prevIndex) => {
      const newIndex =
        prevIndex < filteredMeals.length - 1 ? prevIndex + 1 : prevIndex;
      return newIndex;
    });
  };

  const filteredMeals = meals.filter((meal) =>
    currentType ? meal.type === currentType : true
  );

  const navigate = useNavigate();

  const handleUserButtonClick = () => {
    navigate("/profile");
  };

  const handleCartButtonClick = () => {
    navigate("/cart");
  };

  const currentMeal = filteredMeals[currentMealIndex];

  const handleOrderNow = () => {
    if (currentMeal) {
      dispatch(addToCart(currentMeal));
    }
  };

  return (
    <div>
      <header>
        <img className="logo" src={logo} alt="Logo" />
        <ul className="header-selection">
          <Link to="/breakfast" onClick={() => handleTypeClick("breakfast")}>
            Breakfast
          </Link>
          <Link to="/dinner" onClick={() => handleTypeClick("dinner")}>
            Dinner
          </Link>
          <Link to="/lunch" onClick={() => handleTypeClick("lunch")}>
            Lunch
          </Link>
        </ul>
        <div
          className="circle"
          style={{
            backgroundColor: currentMeal ? currentMeal.color : "transparent",
          }}
        ></div>
        <div className="meal-images">
          {currentMeal && (
            <img
              className="meal"
              src={currentMeal.src}
              alt={currentMeal.name}
            />
          )}
        </div>
        <ul className="header-menu">
          <button>
            <img
              src={userLogo}
              alt="User Logo"
              onClick={handleUserButtonClick}
            />
          </button>
          <button onClick={handleCartButtonClick} className="cart-button">
            <img src={cartLogo} alt="Cart Logo" />
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </button>
        </ul>
      </header>

      <main className="main-menu">
        {currentMeal && (
          <div className="main-left">
            <h3 className="price">${currentMeal.price}</h3>
            <h4 className="food-name">{currentMeal.name}</h4>
            <p className="food-info">{currentMeal.desc}</p>
            <button className="order-btn" onClick={handleOrderNow}>
              ORDER NOW
            </button>
          </div>
        )}
        <div className="main-right">
          <div className="left-right-btns">
            <button className="turn-left-btn" onClick={handleDecrementId}>
              🠋
            </button>
            <button className="turn-right-btn" onClick={handleIncrementId}>
              🠋
            </button>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://www.youtube.com/watch?v=0XJqJJQ35oc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch the video
        </a>
      </footer>
    </div>
  );
}

export default MainMenu;
