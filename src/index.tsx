import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<RecoilRoot>
		<RecoilRoot>
			<ThemeProvider theme={darkTheme}>
				<App />
			</ThemeProvider>
		</RecoilRoot>
	</RecoilRoot>,
);
