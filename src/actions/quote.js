import { BASE } from "../constants";
import { api } from "./api";
import * as actionTypes from "../actions/actionTypes";

export const grabQuoteOfTheDay = () => {
  return (dispatch) => {
    api.get(`https://quotes.rest/qod`).then((res) => {
      console.log("res", res);
      dispatch({
        type: actionTypes.GRAB_QUOTE,
      });
    });
  };
};
