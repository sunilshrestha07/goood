import gql from "graphql-tag";

const userTypeDefs = gql`
    type User {
        _id: ID
        name: String
        email: String
        password: String
        createdAt: String
        updatedAt: String
        avatar: String
    }

    input UserInput {
        name: String
        email: String
        password: String
    }
    
    type Query {
        user(_id: ID!): User
        users: [User]
    }

    type Mutation {
        createUser(userInput: UserInput!): User
        updateUser(_id: ID!, userInput: UserInput!): User
        deleteUser(_id: ID!): User
    }
`;

export default userTypeDefs;
