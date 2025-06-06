import type {
  GitHubUser,
  GitHubRepository,
  GitHubSearchUsersResponse,
} from "../types";
import { apiRequest } from "../utils/apiRequest";

export class GitHubApiError extends Error {
  public status?: number;
  public documentation_url?: string;

  constructor(message: string, status?: number, documentation_url?: string) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
    this.documentation_url = documentation_url;
  }
}

export class GitHubService {
  private async request<T>(endpoint: string): Promise<T> {
    return apiRequest<T>(endpoint);
  }

  async searchUsers(query: string, limit: number = 5): Promise<GitHubUser[]> {
    if (!query.trim()) {
      return [];
    }

    const searchParams = new URLSearchParams({
      q: query,
      per_page: limit.toString(),
    });

    const response = await this.request<GitHubSearchUsersResponse>(
      `/search/users?${searchParams}`
    );

    // Fetch full user details for each user to get complete data including public_repos
    const users = await Promise.all(
      response.items.slice(0, limit).map(async (user) => {
        try {
          return await this.getUser(user.login);
        } catch (error) {
          // If individual user fetch fails, return the basic data from search
          console.warn(
            `Failed to fetch full user data for ${user.login}:`,
            error
          );
          return user;
        }
      })
    );

    return users;
  }

  async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    const searchParams = new URLSearchParams({
      sort: "updated",
      per_page: "30",
    });

    return this.request<GitHubRepository[]>(
      `/users/${username}/repos?${searchParams}`
    );
  }

  async getUser(username: string): Promise<GitHubUser> {
    return this.request<GitHubUser>(`/users/${username}`);
  }
}

export const githubService = new GitHubService();
