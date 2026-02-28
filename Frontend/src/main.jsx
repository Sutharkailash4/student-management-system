import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import StudentContext from "./studentContext/SudentContext.jsx";
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
    <BrowserRouter>
  <StudentContext>
  <App />
  <ToastContainer /> 
    </StudentContext>
  </BrowserRouter>
)