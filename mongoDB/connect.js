import mongoose from "mongoose";

const connectDB = (url) => {
    // mongoose.set("strictQuery", true);
    mongoose
        .connect(url+"walle")
        .then(() => {
            console.log(`Database connected successfully`);
        })
        .catch((error) => {
            console.log(`Database connection error : ${error}`);
        });
};
export default connectDB;
