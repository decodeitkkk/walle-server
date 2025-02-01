import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import imageRoutes from "./routes/imageRoutes.js"

dotenv.config();

const app = express();

// all app.use() are middlewares
// who can talk to my db; for now * (i.e. anyone)
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// recieve all types of data from url (i.e. searchquery, formdate, & all)
// app.use(urlencoded({ extended: true, limit: "16kb" }));

// data limit to be recieved by backend is 16kb
app.use(express.json({ limit: "16kb" }));

// public folder can be access by any file on backend for media purposes
app.use(express.static("public"));

// app.use(cookieParser());

// ---------------------------------< IMPORTING ROUTES HERE

app.use("/api/v1", imageRoutes );

app.get("/", async (req, res) => {
    res.send("hello form wall-e");
});
export default app;
