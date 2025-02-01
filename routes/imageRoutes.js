import { Router } from "express";
import {
    allPosts,
    createImage,
    postImage,
} from "../controllers/imageControllers/allPosts.js";

const router = Router();

router.route("/allposts").get(allPosts);
router.route("/post").post(postImage);
router.route("/dalle").post(createImage);

export default router;
