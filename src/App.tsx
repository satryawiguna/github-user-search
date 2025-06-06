import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./components";
import { AppRoutes } from "./AppRoutes";

const queryClient = new QueryClient();

function App() {
  return (
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </HeroUIProvider>
  );
}

export default App;
