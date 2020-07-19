import React, { useState, useEffect } from "react";
import "./Profilepage.css";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { BASE } from "../../actions/api";

function renderBadges() {
  return (
    <div className="profile-social-links">
      <ReactTooltip
        place="top"
        effect="solid"
        delayHide={1000}
        data-event="click"
      />
      <a className="badge-level social-btn" href="#" data-tip="Devlevel2">
        <img
          className="home-icon"
          src={`${BASE}/static/frontend/images/badges/Dev-level2.png`}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
      <a className="badge-level social-btn" href="#" data-tip="Sportslevel2">
        <img
          className="home-icon"
          src={`${BASE}/static/frontend/images/badges/Dev-level2.png`}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
      <a className="badge-level social-btn" href="#" data-tip="Writinglevel2">
        <img
          className="home-icon"
          src={`${BASE}/static/frontend/images/badges/Dev-level2.png`}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
      <a
        className="badge-level social-btn"
        href="#"
        data-tip="MConsistencylevel2"
      >
        <img
          className="home-icon"
          src={`${BASE}/static/frontend/images/badges/Dev-level2.png`}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
      <a
        className="badge-level social-btn"
        href="#"
        data-tip="YConsistencylevel2"
      >
        <img
          className="home-icon"
          src={`${BASE}/static/frontend/images/badges/Dev-level2.png`}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
      <a className="badge-level social-btn" href="#" data-tip="Readinglevel2">
        <img
          className="home-icon"
          src={`${BASE}/static/frontend/images/badges/Dev-level2.png`}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
    </div>
  );
}
function ProfilePage({
  user: { token, avatar, username, first_name, last_name },
}) {
  const fullName = last_name ? `${first_name} ${last_name}` : `Anonymous`;
  const avatarFullPath = avatar
    ? `${BASE}/media/${avatar}`
    : `${BASE}/static/frontend/images/avatar.png`;
  const gifLoading = `${BASE}/static/loading-arrow.gif`;
  const [loading, setLoading] = useState(true);
  const img = loading ? gifLoading : avatarFullPath;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10 * 1000);
  }, []);

  return (
    <React.Fragment>
      <Link to="/" style={{ zIndex: 1, position: "relative" }}>
        <img
          className="home-icon"
          src={`${BASE}/static/frontend/images/long-arrow-pointing-to-left-white.svg`}
          width="60px"
          height="60px"
          alt="Home"
        />
      </Link>
      <div className="profile-panel profile-panel-orange">
        <div className="profile-header">
          <h1>{fullName}</h1>
          <h2></h2>
          <div className="profile-image">
            <img src={img} />
            <div className="profile-status profile-status-online"></div>
          </div>
        </div>
        {/* {renderBadges()} */}
      </div>
    </React.Fragment>
  );
}

export default ProfilePage;
