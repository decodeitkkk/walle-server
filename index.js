import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import allPostsRoutes from "./routes/allPosts.js"

dotenv.config();
let PORT = process.env.PORT || 8080;
let url = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/allposts",allPostsRoutes)
app.use("/api/v1/dalle", dalleRoutes);
app.get("/", async (req, res) => {
    res.send("hello form wall-e");
});

const startServer = async () => {
    try {
        connectDB(url);
        app.listen(PORT, () => {
            console.log(`server started at port:http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
