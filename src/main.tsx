import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./app";
import "./main.css";

const root = createRoot(document.querySelector("#root") as HTMLElement);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
