import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";
import "./index.css";

const darkTheme = {
	textColor: "whitesmoke",
	backgroundColor: "#111",
};

const lightTheme = {
	textColor: "111",
	backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={darkTheme}>
		<App />
	</ThemeProvider>,
);
