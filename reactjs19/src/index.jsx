import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LoaderProvider } from "./context/LoaderContext";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
  <LoaderProvider>
    <App />
  </LoaderProvider>,
  document.getElementById("root")
);
