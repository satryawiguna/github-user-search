import React, { useState, useEffect } from "react";
import { Github, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar, NavbarBrand, NavbarContent, Button } from "@heroui/react";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className="min-h-screen relative">
      {/* Background with subtle pattern */}
      <div className="fixed inset-0 bg-gradient-to-br fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-950">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Modern Navbar with Hero UI */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {" "}
        <Navbar
          classNames={{
            base: "glass-card border-0 shadow-lg mx-2 sm:mx-4 mt-2 sm:mt-4 rounded-xl",
            wrapper: "px-3 sm:px-6 max-w-full",
          }}
          height="4rem"
          className="sm:h-20"
        >
          <NavbarBrand>
            <div className="flex items-center gap-2 sm:gap-3">
              <Github size={20} className="sm:w-6 sm:h-6" />
              <div>
                <h1 className="font-bold text-lg sm:text-xl gradient-text text-shadow">
                  Github User Search
                </h1>
                <p className="text-xs  dark:text-gray-300 hidden sm:block">
                  Discover amazing repositories
                </p>
              </div>
            </div>
          </NavbarBrand>
          <NavbarContent justify="end" className="gap-2 sm:gap-4">
            <Button
              isIconOnly
              variant="flat"
              color="primary"
              aria-label="Toggle dark mode"
              onClick={toggleDarkMode}
              className="transition-colors duration-200"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </NavbarContent>
        </Navbar>
      </motion.div>

      {/* Main content with enhßanced spacing and max width */}
      <main className="relative z-10 container mx-auto px-3 py-6 sm:px-6 sm:py-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 mt-10 sm:mt-20 py-6 sm:py-8 glass-card border-t-1"
      >
        <div className="container mx-auto px-3 sm:px-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            Built with ❤️ using React, TypeScript & Hero UI by Satrya Wiguna
          </p>
        </div>
      </motion.footer>
    </div>
  );
};
