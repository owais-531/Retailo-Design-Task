// Library Imports
import mongoose from "mongoose";

/**
 * Connection to MongoDB
 */
const connectToDB = async () => {
  const mongoURI = process.env.MONGO_URI || "your_default_mongodb_uri";
  
  mongoose.connect(mongoURI, {});

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
};

export default connectToDB;
