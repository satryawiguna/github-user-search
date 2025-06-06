// GitHub API Types
export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  updated_at: string;
  created_at: string;
  topics: string[];
  owner: GitHubUser;
}

// API Response Types
export interface GitHubSearchUsersResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

// Application State Types
export interface SearchState {
  query: string;
  isLoading: boolean;
  error: string | null;
  users: GitHubUser[];
}

export interface RepositoriesState {
  isLoading: boolean;
  error: string | null;
  repositories: GitHubRepository[];
  selectedUser: GitHubUser | null;
}

// Error Types
export interface ApiError {
  message: string;
  status?: number;
  documentation_url?: string;
}
