import express from "express";
import {
    getAllPosts,
    getPostsByCategory,
    createPost,
} from "../controllers/postController";

const router = express.Router();

// 전체
router.get("/", getAllPosts);

// 카테고리
router.get("/:category", getPostsByCategory);

// 글 생성
router.post("/", createPost);

export default router;