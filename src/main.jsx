import React from "react";
import ReactGA from "react-ga4";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/styles.css";
import { Buffer } from "buffer";
window.Buffer = Buffer;
ReactGA.initialize("G-17V03G6HJ8");
createRoot(document.getElementById("root")).render(<App />);
