import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import defaultAvatar from "../../images/avatar.png";

function Navbar({ name = "Anon Müller" }) {
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
              <img src={defaultAvatar} alt="Profile Picture" />
            </div>
            <div className="navbar-profile__name">{name}</div>
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
