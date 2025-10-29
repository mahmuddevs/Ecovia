import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEvent extends Document {
    name: string,
    description: string,
    eventType: "Awareness Campaign" | "Clean-up Drive" | "Webinar",
    date: Date,
    location: string,
    maxVolunteer: number,
    deadline: Date,
    bannerImage: string,
}


const EventSchema = new Schema<IEvent>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        eventType: {
            type: String,
            required: true,
            enum: ["Awareness Campaign", "Clean-up Drive", "Webinar"]
        },
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        maxVolunteer: {
            type: Number,
            required: true,
            min: 1,
        },
        deadline: {
            type: Date,
            required: true,
        },
        bannerImage: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)
const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema)


export default Event