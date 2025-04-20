import { Router } from "express";
import asyncHandler from "express-async-handler";

import { getVideoUrl, streamVideo } from "../controllers/video.controller";

const router = Router();

router.get("/:key/stream", asyncHandler(streamVideo));
router.get("/:key/url", asyncHandler(getVideoUrl));

export default router;
