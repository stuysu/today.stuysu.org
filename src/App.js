import React from "react";
import Home from "./comps/Home";
import Edit from "./comps/Edit";
import Users from "./comps/Users";
import LoggedIn from "./comps/LoggedIn";
import ApolloProvider from "./comps/context/ApolloProvider";
import { ThemeProvider } from "./comps/context/ThemeProvider";
import { Route, BrowserRouter, Switch } from "react-router-dom";

function App() {
	return (
		<ThemeProvider>
			<ApolloProvider>
				<BrowserRouter>
					<Switch>
						<Route exact path="/">
							<Home/>
						</Route>
						<Route path="/">
							<LoggedIn>
								<Switch>
									<Route exact path="/edit">
										<Edit />
									</Route>
									<Route exact path="/edit/users">
										<Users />
									</Route>
								</Switch>
							</LoggedIn>
						</Route>
					</Switch>
				</BrowserRouter>
			</ApolloProvider>
		</ThemeProvider>
	);
}

export default App;
