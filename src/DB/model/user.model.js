import mongoose from "mongoose";
import { GenderEnum } from "../../common/user.enum.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type:String,
    },
    gender: {
        type: Number,
        enum: Object.values(GenderEnum),
        default: GenderEnum.MALE,
    },
    DOB: Date,
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    profilepicpath: String,
    coverpicspath: [String],
    deletedAt: Date,
}, { timestaps: true, optimisticConcurrency: true })





const userModel1 = mongoose.model("users", userSchema);
export default userModel1
