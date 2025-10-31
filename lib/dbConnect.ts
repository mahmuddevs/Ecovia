import mongoose from "mongoose";

let isConnected: number | undefined = undefined;

const dbConnect = async () => {
    if (isConnected) {
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables!");
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI!);

        isConnected = db.connections[0].readyState;
    } catch (err) {
        console.error("Error Connecting DB:", err);
    }
};

export default dbConnect;
