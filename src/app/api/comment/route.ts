import dbConnect from "@/lib/db";
import Comment from "@/models/commentModel";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";
import { comment } from "postcss";

export async function GET(request:Request) {
    await dbConnect()
    try {
        const comment = await Comment.findOne()
        // .populate('user')
        // .populate('post')
        return NextResponse.json({message:"all comments", comment: comment }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}

//ceating new comment
export async function POST(request:Request) {
    await dbConnect()
    //create comment for any post
    try {
        const {message, user, post} = await request.json()
        const newComment = new Comment({
            message,
            user,
            post
        })
        await newComment.save()
        //update the related post with the new comment
        await Post.findOneAndUpdate({_id: post}, {$push: {comments: newComment._id}})
        return NextResponse.json({message:"comment created successfully", newComment: newComment}, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}