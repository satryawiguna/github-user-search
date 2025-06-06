// Add vitest imports first
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "../../src/pages/HomePage";

vi.mock("../../src/services/github", () => ({
  githubService: {
    searchUsers: vi.fn(async () => {
      console.log("MOCK searchUsers called");
      return [
        {
          id: 1,
          login: "testuser",
          name: "Test User",
          avatar_url: "https://example.com/avatar.png",
          public_repos: 2,
          followers: 10,
          following: 5,
          bio: "Test bio",
          html_url: "https://github.com/testuser",
        },
      ];
    }),
    getUserRepositories: vi.fn(async () => [
      {
        id: 1,
        name: "repo-1",
        description: "First repo",
        stargazers_count: 5,
        forks_count: 2,
        html_url: "https://github.com/test/repo-1",
        full_name: "testuser/repo-1",
        language: "TypeScript",
        updated_at: "2023-01-01T00:00:00Z",
        created_at: "2022-01-01T00:00:00Z",
        topics: ["topic1"],
        owner: {
          id: 1,
          login: "testuser",
          avatar_url: "https://example.com/avatar.png",
          html_url: "https://github.com/testuser",
          public_repos: 2,
          followers: 10,
          following: 5,
        },
      },
      {
        id: 2,
        name: "repo-2",
        description: "Second repo",
        stargazers_count: 3,
        forks_count: 1,
        html_url: "https://github.com/test/repo-2",
        full_name: "testuser/repo-2",
        language: "JavaScript",
        updated_at: "2023-01-02T00:00:00Z",
        created_at: "2022-01-02T00:00:00Z",
        topics: ["topic2"],
        owner: {
          id: 1,
          login: "testuser",
          avatar_url: "https://example.com/avatar.png",
          html_url: "https://github.com/testuser",
          public_repos: 2,
          followers: 10,
          following: 5,
        },
      },
    ]),
  },
}));
vi.mock("../../src/services", () => ({
  githubService: {
    searchUsers: vi.fn(async () => {
      console.log("MOCK searchUsers called");
      return [
        {
          id: 1,
          login: "testuser",
          name: "Test User",
          avatar_url: "https://example.com/avatar.png",
          public_repos: 2,
          followers: 10,
          following: 5,
          bio: "Test bio",
          html_url: "https://github.com/testuser",
        },
      ];
    }),
    getUserRepositories: vi.fn(async () => [
      {
        id: 1,
        name: "repo-1",
        description: "First repo",
        stargazers_count: 5,
        forks_count: 2,
        html_url: "https://github.com/test/repo-1",
        full_name: "testuser/repo-1",
        language: "TypeScript",
        updated_at: "2023-01-01T00:00:00Z",
        created_at: "2022-01-01T00:00:00Z",
        topics: ["topic1"],
        owner: {
          id: 1,
          login: "testuser",
          avatar_url: "https://example.com/avatar.png",
          html_url: "https://github.com/testuser",
          public_repos: 2,
          followers: 10,
          following: 5,
        },
      },
      {
        id: 2,
        name: "repo-2",
        description: "Second repo",
        stargazers_count: 3,
        forks_count: 1,
        html_url: "https://github.com/test/repo-2",
        full_name: "testuser/repo-2",
        language: "JavaScript",
        updated_at: "2023-01-02T00:00:00Z",
        created_at: "2022-01-02T00:00:00Z",
        topics: ["topic2"],
        owner: {
          id: 1,
          login: "testuser",
          avatar_url: "https://example.com/avatar.png",
          html_url: "https://github.com/testuser",
          public_repos: 2,
          followers: 10,
          following: 5,
        },
      },
    ]),
  },
}));

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

describe("HomePage Integration", () => {
  it("should search and display user info and repositories", async () => {
    const queryClient = new QueryClient();
    render(
      <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </HeroUIProvider>
    );

    const input = screen.getByPlaceholderText("Try 'satryawiguna' ...");
    await userEvent.type(input, "testuser");
    await wait(400);

    expect(await screen.findByText("Test User")).toBeInTheDocument();
    expect(await screen.findByText("Test bio")).toBeInTheDocument();

    const exploreBtn = await screen.findByRole("button", { name: /explore/i });
    await userEvent.click(exploreBtn);

    expect(await screen.findByText("repo-1")).toBeInTheDocument();
    expect(await screen.findByText("repo-2")).toBeInTheDocument();
  });
});
