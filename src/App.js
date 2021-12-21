import React from "react"
import Home from "./comps/Home";
import ApolloProvider from "./comps/context/ApolloProvider";

function App() {
	return (
		<ApolloProvider>
			<Home/>
		</ApolloProvider>
	);
}

export default App;
