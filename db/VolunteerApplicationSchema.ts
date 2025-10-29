import mongoose, { Schema, Types, Document, Model } from "mongoose";

export interface IVolunteerApplication extends Document {
  eventId: Types.ObjectId;
  name: string;
  email: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const volunteerApplicationSchema = new Schema<IVolunteerApplication>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const VolunteerApplication: Model<IVolunteerApplication> =
  mongoose.models.VolunteerApplication ||
  mongoose.model<IVolunteerApplication>(
    "VolunteerApplication",
    volunteerApplicationSchema
  );

export default VolunteerApplication;
