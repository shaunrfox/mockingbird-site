import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@okshaun/components";
import "./index.css";
import App from "./App.tsx";
import sprite from "./assets/logos-sprite.svg?raw";

// Inject SVG sprite into document
const spriteContainer = document.createElement("div");
spriteContainer.innerHTML = sprite;
spriteContainer.style.display = "none";
spriteContainer.setAttribute("aria-hidden", "true");
document.body.appendChild(spriteContainer);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
