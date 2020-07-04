import { api, API_BOARDS, BASE } from "./api";
import { transform } from "./etl";

export const initBoard = () => {
  console.log("init grab data from server");
  return (dispatch) => {
    api.get(`${BASE}/${API_BOARDS}/1/`).then((res) => {
      const { columns, labels, members, name, owner } = res.data;
      dispatch(setColumns(transform(columns)));
    });
  };
};
