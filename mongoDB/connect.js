import mongoose from "mongoose";

/*
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
*/



let connectDB = async (url) =>{
    try {
        let connectionInstance = await mongoose.connect(`${url}walle`)
        console.log(`\n mongoDB connected successfully !!! HOST: ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log(`mongoDB connection error : ${error}`)
        process.exit(1)
    }
}

export default connectDB 