import axios from "axios";
import type { Register } from "react-router-dom";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // Adjust the base URL as needed
});

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export async function registerUser(credentials: RegisterCredentials) {
  const response = await api.post<{ user: User }>("/register", credentials);
  return response.data.user;
}

export async function loginUser(credentials: LoginCredentials) {
  const response = await api.post<{ user: User }>("/login", credentials);
  return response.data.user;
}

export async function getCurrentUser() {
  const response = await api.get<{ user: User }>("/me");
  return response.data;
}
