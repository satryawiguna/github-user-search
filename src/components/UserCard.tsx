import { useState } from "react";
import { Card, CardBody, Avatar, Chip, Button } from "@heroui/react";
import { Users, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GitHubUser, GitHubRepository } from "../types";
import { githubService } from "../services";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";

interface UserCardProps {
  user: GitHubUser;
}

export function UserCard({ user }: UserCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRepositories = async (user: GitHubUser) => {
    setIsLoading(true);
    setError(null);

    try {
      const repos = await githubService.getUserRepositories(user.login);
      setRepositories(repos);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load repositories"
      );
      setRepositories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleExpand = () => {
    if (!isExpanded && repositories.length === 0) {
      loadRepositories(user);
    }
    setIsExpanded(!isExpanded);
  };
  return (
    <Card className="glass-card hover-lift border-0 overflow-hidden">
      <CardBody className="p-0">
        {/* Header Section with Gradient Background */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            <div className="self-center sm:self-start">
              <Avatar
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                size="lg"
                className="flex-shrink-0 ring-4 ring-white/50 shadow-xl w-16 h-16 sm:w-20 sm:h-20"
              />
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                <h3 className="font-bold text-lg sm:text-xl text-gray-800 truncate">
                  {user.name || user.login}
                </h3>
                <div className="self-center sm:self-start">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="primary"
                    as="a"
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-modern shadow-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} />
                  </Button>
                </div>
              </div>

              {user.name && user.name !== user.login && (
                <p className="text-sm text-gray-600 mb-3 font-medium">
                  @{user.login}
                </p>
              )}

              {user.bio && (
                <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
                  {user.bio}
                </p>
              )}
            </div>
          </div>
        </div>{" "}
        {/* Stats Section */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-white/60">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
            <div>
              <Chip
                startContent={<Users size={12} className="sm:w-3.5 sm:h-3.5" />}
                size="sm"
                variant="flat"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-sm text-xs"
              >
                {user.public_repos} repos
              </Chip>
            </div>

            <div>
              <Chip
                size="sm"
                variant="flat"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-sm text-xs"
              >
                {user.followers} followers
              </Chip>
            </div>

            <div>
              <Chip
                size="sm"
                variant="flat"
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium shadow-sm text-xs"
              >
                {user.following} following
              </Chip>
            </div>
          </div>

          {/* Expand Button */}
          {user.public_repos > 0 && (
            <div className="mt-3 sm:mt-4">
              <Button
                size="md"
                variant="flat"
                color="primary"
                endContent={
                  <div>
                    <ChevronDown size={16} className="sm:w-4.5 sm:h-4.5" />
                  </div>
                }
                onPress={handleToggleExpand}
                className="w-full button-modern bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg text-sm sm:text-base"
              >
                {isExpanded ? "Hide" : "Explore"} Repositories
              </Button>
            </div>
          )}
        </div>
        <AnimatePresence>
          {isExpanded && (
            <div className="overflow-hidden">
              {" "}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-3 py-3 sm:px-6 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <h4 className="font-bold text-base sm:text-lg gradient-text">
                    Repositories ({user.public_repos})
                  </h4>
                </div>

                {isLoading && (
                  <LoadingSpinner
                    label="Loading repositories..."
                    className="py-6 sm:py-8"
                  />
                )}

                {error && (
                  <ErrorMessage
                    message={error}
                    onRetry={() => loadRepositories(user)}
                  />
                )}

                {!isLoading && !error && repositories.length > 0 && (
                  <div className="space-y-2 sm:space-y-3 px-0 sm:px-6 pb-4 sm:pb-6">
                    {repositories.slice(0, 5).map((repo) => (
                      <div key={repo.id}>
                        {/* Inline Repository Card */}
                        <div>
                          <Card className="glass-card border-0 overflow-hidden hover:shadow-lg transition-all duration-300">
                            <CardBody className="p-3 sm:p-5">
                              {/* Repository Header */}
                              <div className="flex justify-between items-start mb-3 sm:mb-4">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                    <div>
                                      <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold text-base sm:text-lg text-gray-800 hover:text-blue-600 truncate transition-colors duration-200"
                                      >
                                        {repo.name}
                                      </a>
                                    </div>
                                    <div>
                                      <Button
                                        isIconOnly
                                        size="sm"
                                        variant="flat"
                                        color="primary"
                                        as="a"
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                                      >
                                        <ExternalLink
                                          size={12}
                                          className="sm:hidden"
                                        />
                                        <ExternalLink
                                          size={14}
                                          className="hidden sm:block"
                                        />
                                      </Button>
                                    </div>
                                  </div>

                                  {repo.description && (
                                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                                      {repo.description}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Repository Stats */}
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {repo.language && (
                                  <Chip
                                    size="sm"
                                    variant="flat"
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-sm text-xs"
                                  >
                                    {repo.language}
                                  </Chip>
                                )}

                                <Chip
                                  size="sm"
                                  variant="flat"
                                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium shadow-sm text-xs"
                                >
                                  ⭐ {repo.stargazers_count}
                                </Chip>

                                <Chip
                                  size="sm"
                                  variant="flat"
                                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-sm text-xs"
                                >
                                  🍴 {repo.forks_count}
                                </Chip>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </div>
                    ))}
                    {repositories.length > 5 && (
                      <div className="text-center pt-3 sm:pt-4">
                        <Button
                          size="sm"
                          variant="flat"
                          color="primary"
                          as="a"
                          href={`${user.html_url}?tab=repositories`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button-modern bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 font-medium text-xs sm:text-sm"
                          endContent={
                            <ExternalLink
                              size={12}
                              className="sm:w-3.5 sm:h-3.5"
                            />
                          }
                        >
                          View all {user.public_repos} repositories
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {!isLoading && !error && repositories.length === 0 && (
                  <div className="text-center py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl mx-0 sm:mx-6 mb-4 sm:mb-6">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📁</div>
                    <p className="text-gray-600 font-medium text-sm sm:text-base">
                      No public repositories found
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 px-4">
                      This user hasn't shared any public repositories yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>
      </CardBody>
    </Card>
  );
}
