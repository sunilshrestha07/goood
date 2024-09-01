import dbConnect from "@/lib/db"
import Comment from "@/models/commentModel"
import { NextResponse } from "next/server"

export async function GET(request:Request,{params}:{params:{id:string}}) {
    const id = params.id
    await dbConnect()
    try {
        const comment=await Comment.findById(id)
        .populate({path:'user',select:'name email image'})
        return NextResponse.json({comment:comment}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}

//updating comment
export async function PUT(request:Request,{params}:{params:{id:string}}) {
    const {message} = await request.json()
    const id = params.id
    await dbConnect()
    try {
        const comment=await Comment.findByIdAndUpdate(id,{
            $set:{
                message
            }
        },{new:true})
        .populate({path:'user',select:'name email image'})
        return NextResponse.json({comment:comment}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}