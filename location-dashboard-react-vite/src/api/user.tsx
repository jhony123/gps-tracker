import axios, { AxiosResponse } from "axios";

const userApi = axios.create({
  baseURL: import.meta.env.VITE_LOCATION_API_URL + "/user",
  timeout: 2000,
});

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export const postLogin = ({ username, password }: LoginRequest) =>
  userApi.post<LoginRequest, AxiosResponse<LoginResponse>>("/login", {
    username,
    password,
  });
