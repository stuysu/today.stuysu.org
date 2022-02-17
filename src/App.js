import React from "react";
import Home from "./comps/Home";
import Edit from "./comps/Edit";
import Users from "./comps/Users";
import ApolloProvider from "./comps/context/ApolloProvider";
import { ThemeProvider } from "./comps/context/ThemeProvider";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
	return (
		<ThemeProvider>
			<ApolloProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<Home />} />
						{/* This doesn't work for some reason
							* So right now loggedin is used in both users and edit
							* FIXME
							* Could also make an edit index and put users in that
						<Route path="edit" element={<LoggedIn />}>
							<Route index element={<Edit />} />
							<Route path="users" element={<Users />} />
						</Route>
						 */}
						<Route exact path="/edit" element={<Edit />}/>
						<Route exact path="/edit/users" element={<Users />}/>
					</Routes>
				</BrowserRouter>
			</ApolloProvider>
		</ThemeProvider>
	);
}

export default App;
