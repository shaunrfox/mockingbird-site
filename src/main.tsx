import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, useTheme } from "@okshaun/components";
import "./index.css";
import App from "./App.tsx";
import sprite from "./assets/logos-sprite.svg?raw";

// Force light mode on mount
function ForceLightMode({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, [setTheme]);
  return <>{children}</>;
}

// Inject SVG sprite into document
const spriteContainer = document.createElement("div");
spriteContainer.innerHTML = sprite;
spriteContainer.style.display = "none";
spriteContainer.setAttribute("aria-hidden", "true");
document.body.appendChild(spriteContainer);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ForceLightMode>
        <App />
      </ForceLightMode>
    </ThemeProvider>
  </StrictMode>
);
