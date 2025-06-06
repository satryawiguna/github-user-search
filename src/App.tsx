import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components";
import { HomePage } from "./pages";

const queryClient = new QueryClient();

function App() {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <HomePage />
        </Layout>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}

export default App;
