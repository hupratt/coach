// export const grabCookies = () => {
//     return (dispatch) => {
//       dispatch({
//         type: actionTypes.AUTH_GRAB_TOKEN_DISTINCT_ID,
//         data: posthogCookieDistinctId(),
//         cookies: grabCookieConsent(),
//       });
//     };
//   };
import axios from "axios";
import { BASE } from "../constants";
import { API_LOGIN } from "./api";

export const reoderColumns = () => {
  axios
    .post(
      `${BASE}/sort/column/`,
      {
        order: [12, 5, 7, 6, 17, 18],
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((res) => {
      console.log("res", res);
    });
};

export const data = () => {
  axios
    .get(`${BASE}/boards/2/`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log("res", res);
    });
};
