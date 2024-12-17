import { createRoot } from "react-dom/client";
import { LoaderProvider } from "./contexts/LoaderContext.tsx";
import App from "./App.tsx";

import "./styles/reset.css";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  /*   <StrictMode> */
  <LoaderProvider>
    <App />
  </LoaderProvider>
  /*   </StrictMode> */
);
