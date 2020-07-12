import React from "react";
import "./Navbar.css";
import trelloIcon from "../../images/trelloIcon.svg";
import homeIcon from "../../images/homeIcon.png";
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

        <div className="navbar-profile">
          <div className="navbar-profile__picture">
            <img
              src="https://images.unsplash.com/photo-1505150892987-424388901632?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Profile Picture"
            />
          </div>
          <div className="navbar-profile__name">Mike D.</div>
        </div>
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
