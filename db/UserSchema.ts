import mongoose, { Schema, Document, Model } from "mongoose";

export enum UserType {
    ADMIN = "admin",
    VOLUNTEER = "volunteer",
    DONOR = "donor",
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    userType?: UserType;
    image?: string;
    otp?: string;
    otpExpiry?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minLength: [3, "Minimum length of name is 3 characters"],
            maxLength: [32, "Maximum length of name is 32 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            minLength: [3, "Minimum length of email is 3 characters"],
            maxLength: [32, "Maximum length of email is 32 characters"],
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        userType: {
            type: String,
            enum: Object.values(UserType),
            default: UserType.VOLUNTEER,
        },
        image: {
            type: String,
            default: process.env.DEFAULT_USER_IMAGE,
        },
        otp: {
            type: String,
        },
        otpExpiry: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
