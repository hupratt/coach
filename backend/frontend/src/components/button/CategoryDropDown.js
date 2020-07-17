import React from "react";
import { Dropdown } from "semantic-ui-react";
// import YConsistencylevel4 from "../../images/badges/YConsistency-level4.png";
// import Devlevel4 from "../../images/badges/Dev-level4.png";
// import MConsistencylevel4 from "../../images/badges/MConsistency-level4.png";
// import Readinglevel4 from "../../images/badges/Reading-level4.png";
// import Sportslevel4 from "../../images/badges/Sports-level4.png";
// import Writinglevel4 from "../../images/badges/Writing-level4.png";

const friendOptions = [
  {
    key: "Reading",
    text: "Reading",
    value: "Reading",
    image: {
      avatar: true,
      src: "static/frontend/images/badges/Dev-level2.png",
    },
  },
  {
    key: "Dev",
    text: "Dev",
    value: "Dev",
    image: {
      avatar: true,
      src: "static/frontend/images/badges/Dev-level2.png",
    },
  },
  {
    key: "Sports",
    text: "Sports",
    value: "Sports",
    image: {
      avatar: true,
      src: "static/frontend/images/badges/Dev-level2.png",
    },
  },
  {
    key: "Writing",
    text: "Writing",
    value: "Writing",
    image: {
      avatar: true,
      src: "static/frontend/images/badges/Dev-level2.png",
    },
  },
];

const CategoryDropDown = () => (
  <Dropdown
    placeholder="Select Friend"
    fluid
    selection
    options={friendOptions}
  />
);

export default CategoryDropDown;
