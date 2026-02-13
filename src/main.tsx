import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";
import { SelectedAppsProvider } from "./providers/selectedApps.provider.tsx";
import { SearchProvider } from "./providers/search.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchProvider>
      <SelectedAppsProvider>
        <App />
      </SelectedAppsProvider>
    </SearchProvider>
  </StrictMode>,
);
