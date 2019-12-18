import axios from "./axios";

export const getTodoListRequest = () => {
  return axios.get(
    "https://www.fastmock.site/mock/630768a82b1e71435d970c4620fee4aa/todo/todo"
  );
};
