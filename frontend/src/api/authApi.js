import endpoints from "api/endpoints";
import { postFetcher } from "./api";

const login = ({ username, password }) => {
  return postFetcher(
    `${endpoints.login}?username=${username}&password=${password}`
  );
};

const logout = () => {
  return postFetcher(endpoints.logout, "", {
    withCredentials: true,
  });
};

const accountRegister = ({ username, password }) => {
  return postFetcher(endpoints.register, {
    username,
    password,
    role: "USER",
  });
};

export { login, logout, accountRegister };
