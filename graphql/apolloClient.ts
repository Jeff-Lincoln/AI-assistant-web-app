import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink, DefaultOptions } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const BASE_URL = process.env.NODE_ENV !== "development"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

const httpLink = createHttpLink({
    uri: `${BASE_URL}/api/graphql`,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
    mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    }
};

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    // SSR consideration: If needed, add `ssrMode: typeof window === 'undefined'`
    ssrMode: typeof window === 'undefined',
})

export default client;



// import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink, DefaultOptions } from '@apollo/client';

// export const BASE_URL = process.env.NODE_ENV !== "development"
//     ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
//     : "http://localhost:3000";

// const httpLink = createHttpLink({
//     uri: `${BASE_URL}/api/graphql`,
// });

// const defaultOptions: DefaultOptions = {
//     watchQuery: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'all',
//     },
//     query: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'all',
//     },
//     mutate: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'all',
//     }
// };

// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache(),
//     defaultOptions: defaultOptions,
// })

// export default client;