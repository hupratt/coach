import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { BASE } from "../../actions/api";
// import defaultAvatar from "../../images/avatar.png";

function Navbar({ user: { token, avatar, username, first_name, last_name } }) {
  const avatarFullPath =
    avatar && avatar.length > 3
      ? `${BASE}/media/${avatar}`
      : `${BASE}/static/frontend/images/avatar.png`;
  let fullName = last_name
    ? `${first_name} ${last_name.charAt(0)}.`
    : `Anonymous`;
  fullName = username && fullName === "Anonymous" ? `${username}` : `Anonymous`;
  const gifLoading = `${BASE}/static/loading-arrow.gif`;
  const [loading, setLoading] = useState(true);
  const img = loading ? gifLoading : avatarFullPath;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10 * 1000);
  }, []);
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
        <Link to="/accounts/login">
          <div className="navbar-profile">
            <div className="navbar-profile__picture">
              <img src={img} alt="Profile Picture" />
            </div>
            <div className="navbar-profile__name">{fullName}</div>
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
