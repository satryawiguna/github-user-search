import React from "react";
import { useUsers } from "../hooks";
import { motion } from "framer-motion";
import { Search, Sparkles, TrendingUp, Users } from "lucide-react";
import { Card, CardBody } from "@heroui/react";
import { LoadingSpinner, SearchInput, UserCard } from "../components";
import { ErrorMessage } from "../components/ErrorMessage";

export const HomePage: React.FC = () => {
  const { query, users, isLoading, error, setQuery } = useUsers();

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-8 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 sm:space-y-8"
      >
        <div className="space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Sparkles size={14} className="sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">
              Discover Amazing Assesment Project
            </span>
            <span className="sm:hidden">Discover Projects</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold gradient-text text-shadow leading-tight px-2">
            GitHub User Search
          </h1>
          <p className="text-sm sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            <span className="hidden sm:inline">
              Search for talented developers and explore their incredible
              repositories. Discover trending projects, innovative code, and
              inspiring work.
            </span>
            <span className="sm:hidden">
              Find developers and explore their amazing repositories.
            </span>
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card hover-lift p-3 sm:p-6">
            <CardBody className="gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                <Search size={16} className="sm:w-5 sm:h-5 text-blue-500" />
                <span className="font-medium text-sm sm:text-base">
                  Github User Search
                </span>
              </div>
              <SearchInput
                value={query}
                onChange={setQuery}
                placeholder="Try 'satryawiguna' ..."
                isLoading={isLoading}
              />
              <div className="flex gap-2 text-xs text-gray-500">
                <span>
                  💡{" "}
                  <span className="hidden sm:inline">
                    Tip: Use partial names to find similar usernames
                  </span>
                  <span className="sm:hidden">Use partial names</span>
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      </motion.div>

      {/* Stats/Info Cards */}
      {!query && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
        >
          <Card className="glass-card hover-lift">
            <CardBody className="text-center p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm sm:text-base">
                Find Developers
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Search for up to 5 similar usernames and explore their profiles
              </p>
            </CardBody>
          </Card>

          <Card className="glass-card hover-lift">
            <CardBody className="text-center p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm sm:text-base">
                Explore Repos
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                View repositories with stars, forks, and latest updates
              </p>
            </CardBody>
          </Card>

          <Card className="glass-card hover-lift sm:col-span-2 md:col-span-1">
            <CardBody className="text-center p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Sparkles className="text-white" size={20} />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-sm sm:text-base">
                Discover
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Find inspiring projects and innovative solutions
              </p>
            </CardBody>
          </Card>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <ErrorMessage message={error} onRetry={() => setQuery(query)} />
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center py-12"
        >
          <LoadingSpinner
            label="Searching for amazing developers..."
            className="mt-8 dark:text-gray-100"
          />
        </motion.div>
      )}

      {/* Results Section */}
      {!isLoading && users.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
              Found {users.length} developer{users.length !== 1 ? "s" : ""} for
              "{query}"
            </h2>

            <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full self-start sm:self-auto">
              {users.length} of 5 results
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {users.map((user) => (
              <div key={user.id} className="will-change-transform">
                <UserCard user={user} />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && query && users.length === 0 && !error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <Card className="glass-card max-w-md mx-auto">
            <CardBody className="text-center p-8">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                No developers found
              </h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any users matching "{query}". Try searching
                with:
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• A different username or keyword</div>
                <div>• Partial names (e.g., "octo" for "octocat")</div>
                <div>• Popular developer names</div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
