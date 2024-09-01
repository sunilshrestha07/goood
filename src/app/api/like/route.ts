import dbConnect from "@/lib/db";
import Likes from "@/models/likesModel";
import Post from "@/models/postModel";
import { NextResponse } from "next/server";

export async function GET(request:Request) {
    await dbConnect()
    try {
        const likes = await Likes.find().countDocuments()
        return NextResponse.json({likes:likes}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}

export async function POST(request:Request) {
    await dbConnect()
    const {user,post} = await request.json()
    try {
        const likes = new Likes({
            user,
            post
        })
        await likes.save()
        await Post.findByIdAndUpdate({_id:post},{$push:{likes:likes._id}})
        return NextResponse.json({likes:likes}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}