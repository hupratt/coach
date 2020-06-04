import React from "react";
import "./Navbar.css";
import trelloIcon from "../../images/trelloIcon.svg";
import homeIcon from "../../images/homeIcon.png";
function Navbar() {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <button className="icon">
          <img
            className="home-icon"
            src={homeIcon}
            width="20px"
            heigh="20px"
            alt="Home"
          />
        </button>
        <button className="icon board-icon-wrapper">
          <img
            className="board-icon"
            src={trelloIcon}
            width="20px"
            heigh="20px"
            alt="#"
          />
          <span> Boards</span>
        </button>
        <div>
          <form>
            <input type="text" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
