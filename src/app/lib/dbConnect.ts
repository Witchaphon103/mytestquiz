import mongoose from "mongoose";
 
const uri = process.env.MONGODB_URI  || "mongodb+srv://admin:ONeJp2Qi8btRz4B7@cluster0.bfxvz.mongodb.net/ ";

let cachedDb: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  if(uri){
    const opts = { dbName: "mytestquiz"};
    const conn = await mongoose.connect(uri, opts);
    cachedDb = conn.connection;
    return cachedDb;
  }
  return null;
} 