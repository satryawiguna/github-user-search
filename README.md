# GitHub User Search

A beautiful and modern web app to search for GitHub users and explore their repositories. Built with React, TypeScript, Vite, Hero UI, Zustand, and Framer Motion.

## Features

- 🔍 **Search GitHub Users:** Find users by username and view their profiles.
- 📁 **Explore Repositories:** View user repositories, see details, and open them on GitHub.
- 🌗 **Dark Mode:** Toggle between light and dark themes.
- ⚡ **Fast & Modern UI:** Built with Hero UI, Framer Motion, and Tailwind CSS for a smooth experience.
- 🧩 **TypeScript & Vite:** Type-safe, fast development with hot module replacement.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Hero UI](https://heroui.dev/) (UI components)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [TanStack Query](https://tanstack.com/query/latest)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Lucide Icons](https://lucide.dev/) (icons)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/github-user-search.git
   cd github-user-search
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` (if provided) or create a `.env` file:
     ```sh
     echo 'VITE_GITHUB_API_BASE="https://api.github.com"' > .env
     ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
5. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

- `src/components/` – UI components (UserCard, RepositoryCard, Layout, etc.)
- `src/pages/` – Page components (HomePage, RepositoryDetailPage)
- `src/services/` – API service for GitHub
- `src/stores/` – Zustand stores for state management
- `src/utils/` – Utility functions
- `src/types/` – TypeScript types

## Customization

- Update the UI or add new features as needed.
- The project is easy to extend with more GitHub API endpoints.

## Credits

- Built by Satrya Wiguna
- Powered by [GitHub REST API](https://docs.github.com/en/rest)

## License

[MIT](LICENSE)
