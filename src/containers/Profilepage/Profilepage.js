import React from "react";
import "./Profilepage.css";
import Devlevel2 from "../../images/badges/Dev-level2.png";
import MConsistencylevel2 from "../../images/badges/MConsistency-level2.png";
import YConsistencylevel2 from "../../images/badges/YConsistency-level2.png";
import Readinglevel2 from "../../images/badges/Reading-level2.png";
import Sportslevel2 from "../../images/badges/Sports-level2.png";
import Writinglevel2 from "../../images/badges/Writing-level2.png";
import arrowleft from "../../images/long-arrow-pointing-to-left-white.svg";
import { Link } from "react-router-dom";

function ProfilePage({}) {
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
      <div class="profile-panel profile-panel-orange">
        <div class="profile-header">
          <h1>Hendra Susanto</h1>
          <h2>Web Developer</h2>
          <div class="profile-image">
            <img src="https://randomuser.me/api/portraits/men/4.jpg" />
            <div class="profile-status profile-status-away"></div>
          </div>
        </div>
        <div class="profile-social-links">
          <a class="badge-level social-btn" href="#">
            <img
              className="home-icon"
              src={Devlevel2}
              width="60px"
              height="60px"
              alt="Home"
            />
          </a>
          <a class="badge-level social-btn" href="#">
            <img
              className="home-icon"
              src={Sportslevel2}
              width="60px"
              height="60px"
              alt="Home"
            />
          </a>
          <a class="badge-level social-btn" href="#">
            <img
              className="home-icon"
              src={Writinglevel2}
              width="60px"
              height="60px"
              alt="Home"
            />
          </a>
          <a class="badge-level social-btn" href="#">
            <img
              className="home-icon"
              src={MConsistencylevel2}
              width="60px"
              height="60px"
              alt="Home"
            />
          </a>
          <a class="badge-level social-btn" href="#">
            <img
              className="home-icon"
              src={YConsistencylevel2}
              width="60px"
              height="60px"
              alt="Home"
            />
          </a>
          <a class="badge-level social-btn" href="#">
            <img
              className="home-icon"
              src={Readinglevel2}
              width="60px"
              height="60px"
              alt="Home"
            />
          </a>
        </div>
        {/* <div class="profile-footer">
          <a class="btn" href="#">
            Follow
          </a>
        </div> */}
      </div>
    </React.Fragment>
  );
}

export default ProfilePage;
