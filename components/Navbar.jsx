import { useState } from "react";
import { useGlobalContext } from "../src/Context";
import { cartQuantity } from "../src/reducer";
import { removeItemQty } from "../src/reducer";

function Navbar() {
  const { cart, addToCart, cartOpen } = useGlobalContext();
  const [isDropDown, setIsDropDown] = useState(false);

  let cartQuantityRemoved = cart.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  function openDropDown() {
    setIsDropDown(true);
  }

  function closeDropDown() {
    setIsDropDown(false);
  }

  return (
    <nav className="nav layout-flex">
      <div className="nav-links layout-flex">
        <button className="nav-hamburger" onClick={openDropDown}>
          <img src="images/icon-menu.svg" alt="" />
        </button>
        <img src="images/logo.svg" alt="logo" />
        <ul className="layout-flex">
          <li>
            <a href="#">Collections</a>
          </li>
          <li>
            <a href="#">Men</a>
          </li>
          <li>
            <a href="#">Women</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div className="nav-cart layout-flex">
        <div onClick={cartOpen}>
          <img src="images/icon-cart.svg" alt="cart" />
          <span>{removeItemQty ? cartQuantityRemoved : cartQuantity}</span>
        </div>
        <div className="nav-avatar">
          <img src="images/image-avatar.png" alt="" />
        </div>
      </div>

      {/*mobile drop down*/}
      <div
        className={
          isDropDown
            ? "nav-drop-down-overlay nav-drop-down-overlay-show"
            : "nav-drop-down-overlay"
        }
      ></div>
      <div
        className={
          isDropDown ? "nav-drop-down nav-drop-down-show" : "nav-drop-down"
        }
      >
        <button onClick={closeDropDown}>
          <img src="images/icon-close.svg" alt="" />
        </button>
        <ul className="layout-flex">
          <li>
            <a href="#">Collections</a>
          </li>
          <li>
            <a href="#">Men</a>
          </li>
          <li>
            <a href="#">Women</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
