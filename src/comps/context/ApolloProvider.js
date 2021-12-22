import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from "@apollo/client";

import { GRAPHQL_URI } from "../../constants";

// stuyactivities uses an "uploadLink" with credentials so maybe switch to that when authenticating? (TODO)
const client = new ApolloClient({
	uri: GRAPHQL_URI,
	cache: new InMemoryCache()
});

const ApolloProvider = props => {
	return <Provider client={client}>{props.children}</Provider>;
};

export default ApolloProvider;
