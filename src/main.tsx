import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { ThemeProvider } from "./components/theme-provider.tsx"
import Header from "./components/header/header.tsx"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="system"
      storageKey="vite-ui-theme"
    >
      <Header />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
