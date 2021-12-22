import React from "react";
import Home from "./comps/Home";
import Edit from "./comps/Edit";
import ApolloProvider from "./comps/context/ApolloProvider";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
	return (
		<ApolloProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/edit" exact element={<Edit />} />
				</Routes>
			</BrowserRouter>
		</ApolloProvider>
	);
}

export default App;
