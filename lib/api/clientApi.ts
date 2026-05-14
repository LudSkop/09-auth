"use client";

import type { CreateNotePayload, Note } from "@/types/note";
import nextServer from "@/lib/api/api";
import type { User } from "@/types/user";

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

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
export const getMe = async () => {
  const res = await nextServer.get<User>("/users/me");
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};

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
