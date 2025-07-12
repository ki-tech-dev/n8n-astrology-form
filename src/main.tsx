import { createRoot } from "react-dom/client";
import App from "./app";
import "./main.css";

const root = createRoot(document.querySelector("#root") as HTMLElement);

root.render(<App />);
