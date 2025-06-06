import { useCallback } from "react";
import { githubService } from "../services";
import { useUserStore } from "../stores/useUserStore";
import { debounce } from "../utils";

export const useUsers = () => {
  const {
    query,
    users,
    isLoading,
    error,
    setQuery,
    setUsers,
    setLoading,
    setError,
    clear,
  } = useUserStore();

  const searchUsers = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setUsers([]);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const users = await githubService.searchUsers(searchQuery, 5);
        setUsers(users);
        setLoading(false);
        setError(null);
      } catch (error) {
        setUsers([]);
        setLoading(false);
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    },
    [setUsers, setLoading, setError]
  );

  const debouncedSearch = useCallback(debounce(searchUsers, 300), [
    searchUsers,
  ]);

  const handleSetQuery = useCallback(
    (q: string) => {
      setQuery(q);
      debouncedSearch(q);
    },
    [setQuery, debouncedSearch]
  );

  return {
    query,
    users,
    isLoading,
    error,
    setQuery: handleSetQuery,
    clear,
  };
};
