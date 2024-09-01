import gql from "graphql-tag";

const postTypeDefs = gql`
    type Post {
        _id: ID
        content: String
        image: String
        createdAt: String
        updatedAt: String
    }

    input PostInput {
        image: String
        content: String
        user: String
    }
    
    type Query {
        post(_id: ID!): Post
        posts: [Post]
    }

    type Mutation {
        createPost(postInput: PostInput!): Post
        updatePost(_id: ID!, postInput: PostInput!): Post
        deletePost(_id: ID!): Post
    }
`;

export default postTypeDefs;
