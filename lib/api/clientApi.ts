"use client";

import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

const nextServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //щоб із браузера відправляти куки на сервер, якщо вони встановлені сервером
});

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};
export interface User {
  email: string;
  username: string;
  avatar: string;
}
export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("auth/register", data);
  return res.data;
};
export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("auth/login", data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};
