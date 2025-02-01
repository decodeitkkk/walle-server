import app from "./app.js";
import connectDB from "./mongoDB/connect.js";
import * as dotenv from "dotenv";

dotenv.config();
let url = process.env.MONGO_URL;


connectDB(url).then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(
                `⚙️ server started at http://localhost:${process.env.PORT}`
            );
        });
        console.log("connected");
    })
    .catch((err) => {
        console.log(`Error on starting server : ${err}`);
        throw err;
    });
