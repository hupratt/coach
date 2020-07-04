import * as actionTypes from "../actions/actionTypes";
import json from "../data.json";

export const grabQuoteOfTheDay = () => {
  return (dispatch) => {
    const rand = Math.floor(Math.random() * 501) + 1;
    const { quote, author } = json.data[rand];
    dispatch({
      type: actionTypes.GRAB_QUOTE,
      quote,
      author,
    });
  };
};
