import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "aos/dist/aos.css";
import Aos from "aos";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import AuthProvider from "./contexts/AuthProvider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ AOS init
Aos.init();

// ✅ Create a QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="font-urbanist max-w-7xl mx-auto">
      {/* ✅ Provide the queryClient */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
