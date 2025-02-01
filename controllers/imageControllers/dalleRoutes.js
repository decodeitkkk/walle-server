import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";
import ImageKit from "imagekit";

dotenv.config();

const router = express.Router();

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://upload.imagekit.io/api/v1/files/upload",
});

const dalleRoutes = (async (req, res) => {
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
});

export default dalleRoutes;

/*
// Convert image data to base64
        const base64Image = Buffer.from(response.data, "binary").toString(
            "base64"
        );

        // Send the image as a base64 string to the frontend
        res.status(200).json({
            photo: `data:image/png;base64,${base64Image}`,
        });
*/
