import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { myStore } from "./app/store";
import App from "./App";
import "./style/main.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
