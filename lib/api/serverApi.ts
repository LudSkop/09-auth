import nextServer from "@/lib/api/api";
import { cookies } from "next/headers";
import type { User } from "@/types/user";

//export const checkServerSession = async () => {
//const cookieStore = await cookies();
//const res = await nextServer.get("/auth/session", {
//headers: {
//Cookie: cookieStore.toString(), // Передаємо всі куки з запиту
//},
//});
//  return res.data.success;
//};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  // ✅ Повертайте весь об'єкт відповіді, а не тільки success
  return {
    success: res.data.success,
    headers: res.headers, // Додати headers
    data: res.data, // Додати дані якщо потрібні
  };
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
