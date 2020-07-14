import React from "react";
import "./Profilepage.css";
import defaultAvatar from "../../images/avatar.png";
import Devlevel2 from "../../images/badges/Dev-level2.png";
import MConsistencylevel2 from "../../images/badges/MConsistency-level2.png";
import YConsistencylevel2 from "../../images/badges/YConsistency-level2.png";
import Readinglevel2 from "../../images/badges/Reading-level2.png";
import Sportslevel2 from "../../images/badges/Sports-level2.png";
import Writinglevel2 from "../../images/badges/Writing-level2.png";
import arrowleft from "../../images/long-arrow-pointing-to-left-white.svg";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

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
          src={Devlevel2}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
      <a className="badge-level social-btn" href="#" data-tip="Sportslevel2">
        <img
          className="home-icon"
          src={Sportslevel2}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
      <a className="badge-level social-btn" href="#" data-tip="Writinglevel2">
        <img
          className="home-icon"
          src={Writinglevel2}
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
          src={MConsistencylevel2}
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
          src={YConsistencylevel2}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
      <a className="badge-level social-btn" href="#" data-tip="Readinglevel2">
        <img
          className="home-icon"
          src={Readinglevel2}
          width="60px"
          height="60px"
          alt="Home"
        />
      </a>
    </div>
  );
}
function ProfilePage({ name = "Anon Mouse", title = "Web Developer" }) {
  return (
    <React.Fragment>
      <Link to="/" style={{ zIndex: 1, position: "relative" }}>
        <img
          className="home-icon"
          src={arrowleft}
          width="60px"
          height="60px"
          alt="Home"
        />
      </Link>
      <div className="profile-panel profile-panel-orange">
        <div className="profile-header">
          <h1>{name}</h1>
          {/* <h2>{title}</h2> */}
          <div className="profile-image">
            <img src={defaultAvatar} />
            <div className="profile-status profile-status-online"></div>
          </div>
        </div>
        {/* {renderBadges()} */}
      </div>
    </React.Fragment>
  );
}

export default ProfilePage;
