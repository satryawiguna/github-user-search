import React from "react";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "GitHub user search...",
  isLoading = false,
}) => {
  return (
    <>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        startContent={
          <motion.div
            animate={{ rotate: isLoading ? 360 : 0 }}
            transition={{
              duration: isLoading ? 1 : 0,
              repeat: isLoading ? Infinity : 0,
              ease: "linear",
            }}
          >
            <Search className="text-gray-400" size={20} />
          </motion.div>
        }
        variant="bordered"
        size="lg"
        className="w-full"
        classNames={{
          input:
            "text-gray-700 dark:text-gray-300 placeholder:text-gray-400 text-sm sm:text-base",
          inputWrapper:
            "glass-card border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 focus-within:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md",
        }}
        data-testid="search-input"
      />
    </>
  );
};
