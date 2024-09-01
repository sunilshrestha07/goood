import dbConnect from "@/lib/db";
import Post from "@/models/postModel";
import { PostInput } from "@/types/declare";

const postResolvers = {
  Query: {
    // Finding specific post
    async post(_: any, { _id }: { _id: string }) {
      await dbConnect();
      try {
        const post = await Post.findById(_id);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (error) {
        console.error("Error finding post:", error);
        throw new Error("Error finding post");
      }
    },

    // Finding all posts
    async posts() {
      await dbConnect();
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        console.error("Error finding posts:", error);
        throw new Error("Error finding posts");
      }
    },
  },

  Mutation: {
    // Creating a post
    async createPost(_: any, { postInput }: { postInput: PostInput }) {
      await dbConnect();
      try {
        const newPost = new Post(postInput);
        await newPost.save();
        return newPost;
      } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Error creating post");
      }
    },

    // Deleting a post
    async deletePost(_: any, { _id }: { _id: string }) {
      await dbConnect();
      try {
        const post = await Post.findByIdAndDelete(_id);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (error) {
        console.error("Error deleting post:", error);
        throw new Error("Error deleting post");
      }
    },

    // Updating a post
    async updatePost(_: any, { _id, postInput }: { _id: string, postInput: PostInput }) {
      await dbConnect();
      try {
        const post = await Post.findByIdAndUpdate(_id, postInput, { new: true });
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (error) {
        console.error("Error updating post:", error);
        throw new Error("Error updating post");
      }
    },
  },
};

export default postResolvers;
