import postResolvers from "./postResolver";
import userResolver from "./userResolver";

const resolvers = {
    ...userResolver,
    ...postResolvers
}

export default resolvers;
