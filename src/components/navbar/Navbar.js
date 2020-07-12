import React from "react";
import "./Navbar.css";
import trelloIcon from "../../images/trelloIcon.svg";
import homeIcon from "../../images/homeIcon.png";
function Navbar() {
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <button className="icon board-icon-wrapper">
          <i className="fas fa-user-circle" /> Profile
        </button>
      </div>
    </div>
  );
}

export default Navbar;
