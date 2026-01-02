import mongoose from "mongoose";

// importing env variable
const url = process.env.MONGODB_URL;
if (!url) {
  throw new Error("MONGODB_URL is not defined");
}

// checking global connection
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

// connecting to database
const connectDB = async () => {
  // check if connection is already established
  if (cached.conn) {
    console.log("Using existing connection");
    return;
  }

  // check if promise is not established
  if (!cached.promise) {
    console.log("Creating new connection");
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    cached.promise = mongoose.connect(url, opts).then((mongoose) => mongoose.connection);
  }

  // check if promise is established
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
};

export default connectDB;
