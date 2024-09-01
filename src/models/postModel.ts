import mongoose from "mongoose";

// Creating schema for post
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    achievements: [
      {
        type: String,
      },
    ],
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Likes",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
