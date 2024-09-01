import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/userModel";

//getting user
export async function GET(request: Request) {
   await dbConnect();
   try {
      const users = await User.find();
      return NextResponse.json({ users: users }, { status: 200 });
   } catch (error) {
      return NextResponse.json(
         { message: "Something went wrong" },
         { status: 500 }
      );
   }
}


//creting new user
export async function POST(request: Request) {
   await dbConnect();
   try {
      const {name ,email, password,avatar} = await request.json();
      const newUser = new User({
         name,
         email,
         password,
         avatar
      });
      await newUser.save();
      return NextResponse.json({message:"user created successfully",newUser:newUser}, { status: 200 });
   } catch (error) {
      return NextResponse.json(
         { message: "Something went wrong" },
         { status: 500 }
      );
   }
}