import React from "react";
import Home from "./comps/Home";
import Edit from "./comps/Edit";
import ApolloProvider from "./comps/context/ApolloProvider";
import { ThemeProvider } from "./comps/context/ThemeProvider";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
	return (
		<ThemeProvider>
			<ApolloProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" exact element={<Home />} />
						<Route path="/edit" exact element={<Edit />} />
					</Routes>
				</BrowserRouter>
			</ApolloProvider>
		</ThemeProvider>
	);
}

export default App;
