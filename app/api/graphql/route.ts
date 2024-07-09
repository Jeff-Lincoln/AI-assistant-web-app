import { serverClient } from "@/lib/server/serverClient";
import { gql } from "@apollo/client";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
    const { query, variables } = await request.json();

    console.log("Received Query is:", query);
    console.log("Received Variables:", variables);

    try {
        let result;

        if (query.trim().startsWith("mutation")) {
            // Handle mutation
            result = await serverClient.mutate({
                mutation: gql`${query}`,
                variables,
            });
        } else {
            // Handle queries
            result = await serverClient.query({
                query: gql`${query}`,
                variables,
            });
        }

        console.log("Results:", result);

        if (result.errors) {
            console.error("GraphQL Errors:", result.errors);
            return NextResponse.json(
                { errors: result.errors },
                { headers: corsHeaders }
            );
        }

        let data = result.data;
        console.log("GraphQL Data:", data);

        return NextResponse.json(
            { data },
            { headers: corsHeaders }
        );
    } catch (error) {
        console.error("Error:", error);

        return NextResponse.json(
            { error: error.message || "An error occurred" },
            { headers: corsHeaders }
        );
    }
}



// import { serverClient } from "@/lib/server/serverClient";
// import { gql } from "@apollo/client";
// import { NextRequest, NextResponse } from "next/server";

// const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };


// export async function POST(request: NextRequest) {
//     const { query, variables } = await request.json();

//     // console.log("Debug 1:", query)
//     // console.log("Debug 1:", variables)

//     try {
//         let result;


//         if (query.trim().startsWith("mutation")) {
//             //Handle mutation
//             result = await serverClient.mutate({
//                 mutation: gql`
//                 ${query}`,
//                 variables,
//             });
//         } else {
//             // Handle queries
//             result = await serverClient.query({
//                 query: gql`
//                 ${query}`,
//                 variables,
//             });
//         }

//         let data = result.data;
//         console.log("DATA>>>", data);

//         return NextResponse.json(
//             {
//                 data,
//             },
//             {
//                 headers: corsHeaders,
//             }
//         )
//     } catch (error) {
//         console.log("ERROR>>>", error);
//     }
// } ``