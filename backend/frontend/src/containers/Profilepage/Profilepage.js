import React from "react";
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
function ProfilePage({ name = "Anon Müller", title = "Web Developer" }) {
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
          <h1>{name}</h1>
          <h2></h2>
          <div className="profile-image">
            <img src={`${BASE}/static/frontend/images/avatar.png`} />
            <div className="profile-status profile-status-online"></div>
          </div>
        </div>
        {/* {renderBadges()} */}
      </div>
    </React.Fragment>
  );
}

export default ProfilePage;
