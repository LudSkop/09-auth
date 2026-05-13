"use client";

import axios from "axios";

//const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
//const BASE_URL = "https://notehub-api.goit.study/notes"; //"https://notehub-public.goit.study/api/notes"//
//const BASE_URL =
//(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000") + "/api";
//const authHeader = {
//Authorization: `Bearer ${token}`,
//};
const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api";
const nextServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //щоб із браузера відправляти куки на сервер, якщо вони встановлені сервером
});

export default nextServer;
