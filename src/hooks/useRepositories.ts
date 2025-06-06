import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import type { GitHubUser } from "../types";
import { githubService } from "../services";

export const useRepositories = () => {
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null);

  const {
    data: repositories = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userRepositories", selectedUser?.login],
    queryFn: () =>
      selectedUser ? githubService.getUserRepositories(selectedUser.login) : [],
    enabled: !!selectedUser,
    retry: 1,
  });

  const loadRepositories = useCallback((user: GitHubUser) => {
    setSelectedUser(user);
  }, []);

  const clearRepositories = useCallback(() => {
    setSelectedUser(null);
  }, []);

  return {
    isLoading,
    error: error instanceof Error ? error.message : null,
    repositories,
    selectedUser,
    loadRepositories,
    clearRepositories,
    refetch,
  };
};
