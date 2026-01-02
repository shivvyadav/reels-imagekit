import mongoose, {Schema, Document} from "mongoose";
import bcrypt from "bcryptjs";

// user interface
export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);



const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
