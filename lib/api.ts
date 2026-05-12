import axios from "axios";
import type { CreateNotePayload, Note } from "../types/note";

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

export interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params: {
      perPage: 12,
      page: params.page ?? 1,
      ...(params.search && { search: params.search }),
      ...(params.tag && { tag: params.tag }),
    },
    //headers: authHeader,
  });

  return response.data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response = await nextServer.post<Note>(`/notes`, note, {
    //headers: authHeader,
  });

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`, {
    //headers: authHeader,
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    //headers: authHeader,
  });

  return res.data;
};
