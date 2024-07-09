'use client'

import client from "@/graphql/apolloClient"
import { ApolloProvider } from "@apollo/client"
import { Children } from "react"

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider
        client={client}>{children}
    </ApolloProvider>
}

export default ApolloProviderWrapper;