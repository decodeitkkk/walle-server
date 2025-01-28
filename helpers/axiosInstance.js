import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

// Base API client
export const clipdroptClient = axios.create({
    baseURL: `${process.env.CLIPDROP_URL}`,
    headers: {
        "x-api-key": process.env.CLIPDROP_API_KEY, // Use the API key from .env
    },
});
