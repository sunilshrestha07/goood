import mongoose from "mongoose";

//creating schema for comment
const commentSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
},{timestamps: true});

const Comments = mongoose.models.Comment || mongoose.model("Comments", commentSchema);
export default Comments