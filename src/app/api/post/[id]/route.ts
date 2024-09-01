import dbConnect from "@/lib/db"
import Post from "@/models/postModel"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params}:{params:{id:string}}) {
    await dbConnect()
    const {id} = params
    try {
        let post = await Post.findById(id)
        .populate({ path: 'user', select: 'name '})

        if (post.likes && post.likes.length > 0) {
            post = await Post.populate(post, { path: 'likes.user', select: 'name email' });
        }

        if (post.comments && post.comments.length > 0) {
            post = await Post.populate(post, { path: 'comments.user', select: 'name image' });
        }
        // .populate({ path: 'likes', select: 'message', populate: { path: 'user', select: 'name email' } })
        // .populate({ path: 'comments', select: 'message', populate: { path: 'user', select: 'name image' } });
        return NextResponse.json({message:"post found",post:post}, {status: 200})
    } catch (error :any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}

//deleteign specifc post
export async function DELETE(request:Request,{params}:{params:{id:string}}) {   
    await dbConnect()
    const id = params.id
    try {
        const user = await Post.findByIdAndDelete(id)
        return NextResponse.json({message:"user deleted successfully"})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}

//updating user
export async function PUT(request:Request,{params}:{params:{id:string}}) {
    await dbConnect()
    const {content} = await request.json()
    const id = params.id
    try {
        const post = await Post.findByIdAndUpdate(id,
            {$set:{
                content
        }},{new:true})
        .populate('user')
        .populate('comments.user')
        // .populate('likes').countDocuments()
        return NextResponse.json({message:"user updated successfully",post}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}