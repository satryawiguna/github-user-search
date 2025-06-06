import React from "react";
import { Github } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar, NavbarBrand, NavbarContent } from "@heroui/react";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative">
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
                <p className="text-xs text-gray-600 hidden sm:block">
                  Discover amazing repositories
                </p>
              </div>
            </div>
          </NavbarBrand>
          <NavbarContent
            justify="end"
            className="gap-2 sm:gap-4"
          ></NavbarContent>
        </Navbar>
      </motion.div>

      {/* Main content with enhanced spacing and max width */}
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
          <p className="text-gray-600 text-xs sm:text-sm">
            Built with ❤️ using React, TypeScript & Hero UI by Satrya Wiguna
          </p>
        </div>
      </motion.footer>
    </div>
  );
};
