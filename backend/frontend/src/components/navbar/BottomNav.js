import React from "react";
// import { useTranslation } from "react-i18next";
// import SubscriptionForm from "./SubscriptionForm";
import { Link } from "react-router-dom";
import "./BottomNav.css";

const BottomNavigation = () => {
  //   const { t } = useTranslation();

  return (
    <React.Fragment>
      {/* Footer Section Begin */}
      <footer className="footer-section">
        <div className="container footer-left footer-flex">
          <div className="centermyitems">
            <h2 className="bottom-nav-h2"> {"Design"}</h2>

            <ul>
              <li>
                <a href="https://tympanus.net/codrops/">Codrops</a>
              </li>
            </ul>
          </div>
          <div className="centermyitems">
            <h2 className="bottom-nav-h2"> {"Opening Times"}</h2>

            <ul>
              <li> {"Monday-Friday "}12:00 - 15:00</li>
              <li> {"Saturday "}15:00 - 17:00</li>
              <li> {"Sunday "}15:00 - 17:00 </li>
            </ul>
          </div>
          <div className="footer-widget centermyitems">
            <h2 className="bottom-nav-h2">Legal</h2>
            <ul>
              <li>
                <Link to="/privacy-policy/">{"Privacy Policy"}</Link>
              </li>
              <li>
                <Link to="/terms-of-use/">{"Terms of Use"}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright-reserved">
          <div className="copyright-text">
            {"Made With"} <i className="far fa-heart" />
            <a href="https://www.craftstudios.tech/">{"By Craft Studios"}</a>
          </div>
        </div>
      </footer>
      {/* Footer Section End */}
    </React.Fragment>
  );
};

export default BottomNavigation;
