import { GitHubApiError } from "../services/github";

const GITHUB_API_BASE =
  import.meta.env.VITE_GITHUB_API_BASE || "https://api.github.com";

export async function apiRequest<T>(
  endpoint: string,
  baseUrl?: string
): Promise<T> {
  const apiBase = baseUrl || GITHUB_API_BASE;
  try {
    const response = await fetch(`${apiBase}${endpoint}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new GitHubApiError(
        errorData.message || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData.documentation_url
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof GitHubApiError) {
      throw error;
    }
    throw new GitHubApiError("Network error occurred");
  }
}
