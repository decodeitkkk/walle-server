import express from "express";
import * as dotenv from "dotenv";
import PostSchema from "../models/post.js";

dotenv.config();

const router = express.Router();

router.route("/").get(async (req, res) => {
    /*
        -   get post from DB
        -   send to frontend

    */

    try {
        let posts = await PostSchema.find();
        // console.log(posts);
        res.status(200).send({
            posts,
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;
