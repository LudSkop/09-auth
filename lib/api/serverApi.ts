import nextServer from "@/lib/api/api";
import { cookies } from "next/headers";
import type { User } from "@/types/user";
import type { FetchNotesParams, FetchNotesResponse } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";

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

  return res; // Тепер це може містити не тільки success, але й інші дані, якщо вони є
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

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  try {
    const cookieStore = await cookies();

    const response = await nextServer.get<FetchNotesResponse>("/notes", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params: {
        perPage: 12,
        page: params.page ?? 1,
        ...(params.search && { search: params.search }),
        ...(params.tag && { tag: params.tag }),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw new Error(`Failed to fetch notes: ${error}`);
  }
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};
