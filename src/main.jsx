import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
// import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "react-modal";
import Header from "./components/navbarHeader";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer";
import AuthProvider from "./contexts/authProvider";
import { Toaster } from "react-hot-toast";

Modal.setAppElement("#root");

const queryClient = new QueryClient({
  defaultOptions: {
    // Globally applied to all queries by default
    queries: {
      retry: 1, // Retry failed requests once
      staleTime: 5 * 60 * 1000, // Data is stale after 5 minutes
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          {/* <App /> */}
          <main>Main</main>
          <Footer />
        </BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: { fontSize: "0.95rem" },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
