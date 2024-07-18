import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, clearCart } from "../redux/ComandsSlice";
import logo from "../images/logo.png";

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.meal);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    alert("Successful Payment");
  };

  const totalPrice = cart.reduce(
    (total, meal) => total + meal.price * meal.quantity,
    0
  );

  return (
    <div className="cartPage">
      <img className="loginLogo" src={logo} alt="Logo" />
      <Link to="/" className="return-home">
        Home
      </Link>
      <ul className="cart-values">
        {cart.map((meal) => (
          <li key={meal.id}>
            <h3>{meal.name}</h3>
            <p>{meal.desc}</p>
            <p>
              ${meal.price} x {meal.quantity}
            </p>
            <button onClick={() => handleRemoveFromCart(meal.id)}>
              Remove
            </button>
            <hr />
          </li>
        ))}
      </ul>
      <div className="total-price">
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
      <button onClick={handleClearCart} className="pay-btn">
        Pay
      </button>
    </div>
  );
}

export default Cart;
