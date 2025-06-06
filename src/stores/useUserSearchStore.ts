import { create } from "zustand";
import type { GitHubUser } from "../types/github";

interface UserSearchState {
  query: string;
  users: GitHubUser[];
  isLoading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  setUsers: (users: GitHubUser[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clear: () => void;
}

export const useUserSearchStore = create<UserSearchState>((set) => ({
  query: "",
  users: [],
  isLoading: false,
  error: null,
  setQuery: (query) => set({ query }),
  setUsers: (users) => set({ users }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clear: () => set({ query: "", users: [], isLoading: false, error: null }),
}));
