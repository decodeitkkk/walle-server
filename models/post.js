import mongoose from "mongoose";

const post = new mongoose.Schema(
    {
        name: { type: String, required: true },
        prompt: { type: String, required: true },
        image: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const PostSchema = mongoose.model("Post", post);

export default PostSchema;
