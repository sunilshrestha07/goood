import mongoose from "mongoose";

//creating models for likes
const likesSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true});

const Likes = mongoose.models.Likes || mongoose.model("Likes", likesSchema);
export default Likes