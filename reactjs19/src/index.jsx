import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LoaderProvider } from "./context/LoaderContext";

ReactDOM.render(
  <LoaderProvider>
    <App />
  </LoaderProvider>,
  document.getElementById("root")
);
