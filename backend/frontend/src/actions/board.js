import { api, API_BOARDS, BASE } from "./api";
import { transform } from "./etl";
import { setColumns } from "./columns";
import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

export const initBoard = () => {
  console.log("init grab data from server");
  return (dispatch) => {
    setTimeout(
      () =>
        axios
          .get(`${BASE}/${API_BOARDS}/`)
          .then((res) => {
            const data = res.data;
            let boardIds = [];
            data.forEach((el) => boardIds.push(el.id));
            dispatch(setBoardIds(boardIds));
            return boardIds[0];
          })
          .then((res) =>
            axios.get(`${BASE}/${API_BOARDS}/${res}/`).then((res) => {
              // columns, labels, members, name, owner
              const { columns } = res.data;
              dispatch(setColumns(transform(columns)));
            })
          ),
      2000
    );
  };
};

export const setBoardIds = (board) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SET_BOARD_IDS,
      boards: board,
    });
  };
};
export const toggleBackground = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.TOGGLE_BACKGROUND,
    });
  };
};
