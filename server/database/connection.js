import mongoose from "mongoose";

// mongodb connection
const connection = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("DB Connected"));
};

export default connection;
