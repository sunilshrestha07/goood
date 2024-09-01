import dbConnect from "@/lib/db";
import User from "@/models/userModel";
import { userInput } from "@/types/declare";
import { Query } from "mongoose";
import { NextResponse } from "next/server";

//creating resolvers

const userResolver = {
   Query: {
    //finding specific user
      async user(_: any, { _id }: { _id: string }) {
        await dbConnect()
         try {
            //if no id provided
            if(!_id){
                return NextResponse.json({message: "Id is required"}, {status: 404})
            }
            //finding user
            const user = await User.findById(_id);
            NextResponse.json({user: user}, {status: 200})

            if(!user){
                return NextResponse.json({message: "user not found"}, {status: 404})
            }
         } catch (error) {
            return NextResponse.json({message: "Something went wrong"}, {status: 500})
         }
      },

      //finding all users
      async users() {
         await dbConnect();
         try {
            const users = await User.find();
            return users
         } catch (error) {
            throw new Error("Something went wrong");
         }
      },
   },

   Mutation: {
      //creating user
      async createUser(_: any, { userInput }: { userInput: userInput }) {
         await dbConnect();
         try {
            const newuser = new User(userInput);
            await newuser.save();
            return newuser;  
         } catch (error) {
            throw new Error("Something went wrong");
         }
      },

      //delete user
      async deleteUser(_: any, { _id }: { _id: string }) {
         await dbConnect();
         try {
            const user = await User.findByIdAndDelete(_id);
            return user;
         } catch (error) {
            throw new Error("Something went wrong");
         }
      },

      //update user
      async updateUser(_: any, { _id, userInput }: { _id: string, userInput: userInput }) {
         await dbConnect();
         try {
            const user = await User.findByIdAndUpdate(_id, userInput, { new: true });
            return user;
         } catch (error) {
            throw new Error("Something went wrong");
         }
      }
   }
};

export default userResolver