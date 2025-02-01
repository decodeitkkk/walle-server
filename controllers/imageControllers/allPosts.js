import express from "express";
import * as dotenv from "dotenv";
import PostSchema from "../../models/post.js";

import { v2 as cloudinary } from "cloudinary";
import Post from "../../models/post.js";
import ImageKit from "imagekit";
import axios from "axios";
dotenv.config();

// INITIALIZE IMAGEKIT HERE
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://upload.imagekit.io/api/v1/files/upload",
});

// all posts controller
const allPosts = async (req, res) => {
    /*
        -   get post from DB
        -   send to frontend

    */

    try {
        let posts = await PostSchema.find().sort({ createdAt: -1 });
        // console.log(posts);
        res.status(200).send({
            posts,
        });
    } catch (error) {
        console.log(error);
    }
};

// share to community posts controller
const postImage = async (req, res) => {
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

// create image via clipdrop's LLM controller
const createImage = async (req, res) => {
    /*
        > name form frontend
        > check prompt isn't empty
        > call the clipdrop api
        > recieve it and save it in IMAGEKIT
        > send the IMAGEKIT image link in frontend

    */

    try {
        // name form frontend
        let { name, prompt } = req.body;
        console.log(`name of sender: ${name}, prompt: ${prompt}`);

        // check prompt isn't empty
        if (!prompt || prompt.trim() === "") {
            return res.status(400).send("prompt is empty !!");
        }

        // call the clipdrop api
        let response = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            {
                prompt,
            },
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API_KEY, // Use the API key from .env
                },
                responseType: "arraybuffer", // Ensure the response is binary data
            }
        );
        console.log(`response: ${response}`);

        //  CONVERT THE RESPONSE TO A BASE64 STRING FOR UPLOADING TO IMAGEKIT
        const imageBase64 = Buffer.from(response?.data, "binary").toString(
            "base64"
        );
        console.log(`imageBase64: ${imageBase64}`);

        // UPLOAD IT TO IMAGEKIT
        const result = await imagekit.upload({
            file: imageBase64, // Convert buffer to base64
            fileName: `${name || "generated-image"}-${Date.now()}.png`,
        });
        console.log(`Imagekit response:`, result);

        res.status(200).send({
            result,
            success: true,
            message: "Image generated and uploaded successfully!",
            imageUrl: result.url,
        });

        // res.send("Hello from something somehtinng");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong!");
    }
};

export { allPosts, createImage, postImage };
