import dbConnect from "@/lib/db";
import Post from "@/models/postModel";
import User from "@/models/userModel";  // Import User model
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await dbConnect();
    try {
        const post = await Post.find()
            // .populate({ path: 'user', select: 'name email' }) // Correct path and schema
            // .populate('comments')
            // .populate({ path: 'comments', select: 'message', populate: { path: 'user', select: 'name email' } })
            // .populate({ path: 'likes', select: 'message', populate: { path: 'user', select: 'name email' } });
        return NextResponse.json({ post: post }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { content, user, likes, comments ,achievements} = await request.json();
        const newPost = new Post({
            content,
            user,
            achievements
        });
        await newPost.save();
        return NextResponse.json({ message: "Post created successfully", newPost: newPost }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
