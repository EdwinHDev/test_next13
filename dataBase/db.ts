import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Conectados a CRUD");
  } catch (error) {
    console.log(error);
  }
}

export const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("Desconectado...");
  } catch (error) {
    console.log(error);
  }
}