import nextServer from "@/lib/api/api";
import { cookies } from "next/headers";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(), // Передаємо всі куки з запиту
    },
  });
  return res.data.success;
};
