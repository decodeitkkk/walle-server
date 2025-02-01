import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../../models/post.js";
import ImageKit from "imagekit";

dotenv.config();
const router = express.Router();

// INITIALIZE IMAGEKIT HERE
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://upload.imagekit.io/api/v1/files/upload",
});
const postRoutes = async (req, res) => {
    try {
        let { name, prompt, photo } = await req.body;

        // CHECK FOR EMPTY FIELDS HERE
        if (
            !prompt ||
            prompt.trim() === "" ||
            !name ||
            name.trim() === "" ||
            photo === "" ||
            !photo
        ) {
            return res.status(404).send("all fields are mandatory !!!");
        }

        // IMAGEKIT FILE UPLOAD HERE
        /*
        const uploadResponse = await imagekit.upload({
            file: photo,
            fileName: name,
        });
        */

        // SAVE IN DATABASE
        const newPost = await Post.create({
            name,
            prompt,
            image: photo,
        });

        console.log(newPost);

        res.status(200).send({
            newPost,
            success: true,
            message: "Image shared successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(`error !!! ${error}`);
    }
};

export default postRoutes;
