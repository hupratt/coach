import * as actionTypes from "../actions/actionTypes";
import { API_QUOTE, BASE } from "../actions/api";
import axios from "axios";
import json from "../quotedata.json";

export const grabQuoteOfTheDay = () => {
  return (dispatch) => {
    const rand = Math.floor(Math.random() * 501) + 1;
    // axios
    //   .get(`${BASE}/${API_QUOTE}`, {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Headers": "Content-Type, Authorization",
    //     },
    //   })
    //   .then((res) => {
    //     console.log("res", res);
    //     dispatch({
    //       type: actionTypes.GRAB_QUOTE,
    //       // quote,
    //       // author,
    //     });
    //   });
    const { quote, author } = json.data[rand];
    dispatch({
      type: actionTypes.GRAB_QUOTE,
      quote,
      author,
    });
  };
};
