import mongoose, { Document, Model, Schema, Types } from "mongoose"

interface IDonation extends Document {
  userEmail: string
  userID: Types.ObjectId
  amount: number
  eventID: Types.ObjectId
}

const DonationSchema = new Schema<IDonation>(
  {
    userEmail: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      lowercase: true,
      minLength: [3, "Minimum length of email is 3 characters"],
      maxLength: [32, "Maximum length of email is 32 characters"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    userID: {
      type: Schema.Types.ObjectId,
      required: [true, "UserID is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    eventID: {
      type: Schema.Types.ObjectId,
      required: [true, "EventID is required"],
    },
  },
  {
    timestamps: true,
  }
)

const Donation: Model<IDonation> =
  mongoose.models.Donation ||
  mongoose.model<IDonation>("Donation", DonationSchema)

export default Donation
