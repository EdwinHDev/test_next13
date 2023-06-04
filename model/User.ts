import mongoose, { Schema, model, Model } from "mongoose";
import { IUser } from "@/interfaces/User";

const userSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;