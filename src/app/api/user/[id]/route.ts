import dbConnect from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

//getting specific user
export async function GET(request:Request,{params}:{params:{id:string}}) {
    await dbConnect()
    const id = params.id
    try {
        const user = await User.findById(id)
        return NextResponse.json({user:user}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}

//deleting spcicific user
export async function DELETE(request:Request,{params}:{params:{id:string}}) {
    await dbConnect()
    const id = params.id
    try {
        const user = await User.findByIdAndDelete(id)
        return NextResponse.json({message:"user deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}


//updating specific user
export async function PUT(request:Request,{params}:{params:{id:string}}) {
    await dbConnect()
    const {email,name,password} = await request.json()
    const id = params.id
    try {
        const user = await User.findByIdAndUpdate(id,{
            $set:{
                email,
                name,
                password
            }
        },{new:true})
        return NextResponse.json({message:"user updated successfully",user:user}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}