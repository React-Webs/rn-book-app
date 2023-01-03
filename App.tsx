import React from 'react';

import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import { useColorScheme} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import Navigation from "./src/navigation/Navigation";


const API_KEY = 'boda::stepzen.net+1000::1a4039032c29cfa1d5637c51263362ee4d7e9cc6a9b64cd8108eb7122298ea46';

const client = new ApolloClient({
    uri: "https://boda.stepzen.net/api/veering-wildebeest/__graphql",
    headers: {
        Authorization: `Apikey ${API_KEY}`,
    },
    cache: new InMemoryCache(),
});

export default function App() {
    const colorScheme = useColorScheme();
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
            <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
      </SafeAreaProvider>

    );
}
