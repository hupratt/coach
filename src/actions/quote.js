import { QUOTE } from "../constants";
import * as actionTypes from "../actions/actionTypes";

export const grabQuoteOfTheDay = () => {
  return (dispatch) => {
    fetch(`${QUOTE}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }).then((res) => {
      console.log("res", res);
      dispatch({
        type: actionTypes.GRAB_QUOTE,
      });
    });
  };
};
