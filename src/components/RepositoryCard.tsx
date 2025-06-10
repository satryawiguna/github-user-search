import React from "react";
import { Card, CardBody, Chip, Button } from "@heroui/react";
import { Star, GitFork, ExternalLink, Calendar, Code } from "lucide-react";
import { motion } from "framer-motion";
import type { GitHubRepository } from "../types";
import { formatDate, formatNumber } from "../utils";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="glass-card border-0 overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardBody className="p-3 sm:p-5">
          {/* Header with Repository Name */}
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 justify-between">
                <div>
                  <a
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-base sm:text-lg text-gray-800 dark:text-gray-100 hover:text-blue-600 truncate transition-colors duration-200"
                    data-testid={`repo-link-${repository.name}`}
                  >
                    {repository.name}
                  </a>
                </div>
                <div>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="primary"
                    as="a"
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                  >
                    <ExternalLink size={12} className="sm:hidden" />
                    <ExternalLink size={14} className="hidden sm:block" />
                  </Button>
                </div>
              </div>

              {repository.description && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                  {repository.description}
                </p>
              )}
            </div>
          </div>

          {/* Stats Chips */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            {repository.language && (
              <div>
                <Chip
                  startContent={
                    <>
                      <Code size={10} className="sm:hidden" />
                      <Code size={12} className="hidden sm:block" />
                    </>
                  }
                  size="sm"
                  variant="flat"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-sm text-xs"
                >
                  {repository.language}
                </Chip>
              </div>
            )}

            <div>
              <Chip
                startContent={
                  <>
                    <Star size={10} className="sm:hidden" />
                    <Star size={12} className="hidden sm:block" />
                  </>
                }
                size="sm"
                variant="flat"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium shadow-sm text-xs"
              >
                {formatNumber(repository.stargazers_count)}
              </Chip>
            </div>

            <div>
              <Chip
                startContent={
                  <>
                    <GitFork size={10} className="sm:hidden" />
                    <GitFork size={12} className="hidden sm:block" />
                  </>
                }
                size="sm"
                variant="flat"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium shadow-sm text-xs"
              >
                {formatNumber(repository.forks_count)}
              </Chip>
            </div>

            <div>
              <Chip
                startContent={
                  <>
                    <Calendar size={10} className="sm:hidden" />
                    <Calendar size={12} className="hidden sm:block" />
                  </>
                }
                size="sm"
                variant="flat"
                className="bg-gradient-to-r from-gray-500 to-gray-600 text-white font-medium shadow-sm text-xs"
              >
                {formatDate(repository.updated_at)}
              </Chip>
            </div>
          </div>

          {/* Topics */}
          {repository.topics && repository.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {repository.topics.slice(0, 3).map((topic) => (
                <div key={topic}>
                  <Chip
                    size="sm"
                    variant="bordered"
                    className="text-xs border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600
dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    #{topic}
                  </Chip>
                </div>
              ))}
              {repository.topics.length > 3 && (
                <div>
                  <Chip
                    size="sm"
                    variant="bordered"
                    className="text-xs border-gray-300 text-gray-500 bg-gray-50"
                  >
                    +{repository.topics.length - 3} more
                  </Chip>
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
};
