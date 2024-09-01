import mongoose, { Schema } from "mongoose";
// import {Schema,model,models} from mongoose;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toSafeObjectWithOnlyUserName = function () {
  const user = this.toObject();
  delete user.email;
  delete user.password;
  return user;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;