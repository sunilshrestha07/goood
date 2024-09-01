import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";


//creating a server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError(error) {
        console.log("Error creating Apollo Server", error);
        return new Error(error.message);
    }
})

//creating handler
const handler = startServerAndCreateNextHandler<NextRequest>(server);

//api route handling
export async function POST(request:NextRequest) {
    return handler(request);
}
export async function GET(request:NextRequest) {
    return handler(request);
}