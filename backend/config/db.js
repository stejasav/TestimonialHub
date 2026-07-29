import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!connUri) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    await mongoose.connect(connUri);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;