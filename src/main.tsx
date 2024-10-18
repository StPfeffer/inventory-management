import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ThemeProvider
                defaultTheme="system"
                storageKey="vite-ui-theme"
            >
                <App />
                <Toaster />
            </ThemeProvider>
        </BrowserRouter>
    </StrictMode>
)
