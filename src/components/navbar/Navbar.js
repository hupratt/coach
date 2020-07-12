import React from "react";
import "./Navbar.css";
import trelloIcon from "../../images/trelloIcon.svg";
import homeIcon from "../../images/homeIcon.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-wrapper">
      <div className="nav-container">
        {/* <div className="navbar-search">
            <input
              type="search"
              className="navbar-search__input"
              placeholder="Search"
            />
          </div> */}
        <Link to="/login">
          <div className="navbar-profile">
            <div className="navbar-profile__picture">
              <img
                src="https://randomuser.me/api/portraits/men/4.jpg"
                alt="Profile Picture"
              />
            </div>
            <div className="navbar-profile__name">Mike D.</div>
          </div>
        </Link>
      </div>

      {/* <div className="profile">
        <i className="fab fa-codepen" id="codepen"></i>
        <p className="author">
          <a href="https://codepen.io/#" target="_blank">
            /hpratt
          </a>
        </p>
      </div> */}
    </div>
  );
}

export default Navbar;
