import gql from "graphql-tag";
import userTypeDefs from "./userTypedefs";
import postTypeDefs from "./postTypedefs";

const typeDefs = gql`
    ${userTypeDefs}
    ${postTypeDefs}
    `;

export default typeDefs