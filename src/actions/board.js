import { api, API_BOARDS, BASE } from "./api";
import { transform } from "./etl";
import { setColumns } from "./columns";
import axios from "axios";

export const initBoard = () => {
  console.log("init grab data from server");
  return (dispatch) => {
    api.get
      ? api.get(`${BASE}/${API_BOARDS}/1/`).then((res) => {
          // columns, labels, members, name, owner
          const { columns } = res.data;
          dispatch(setColumns(transform(columns)));
        })
      : axios.get(`${BASE}/${API_BOARDS}/1/`).then((res) => {
          // columns, labels, members, name, owner
          const { columns } = res.data;
          dispatch(setColumns(transform(columns)));
        });
  };
};
