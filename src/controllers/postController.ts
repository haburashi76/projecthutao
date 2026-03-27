import type {Request, Response} from "express";

let posts = [
    { id: 1, title: "공부 글", category: "study" },
    { id: 2, title: "연애 글", category: "love" },
];

// 전체
export const getAllPosts = (req: Request, res: Response) => {
    res.json(posts);
};

// 카테고리별
export const getPostsByCategory = (req: Request, res: Response) => {
    const { category } = req.params;

    const filtered = posts.filter(p => p.category === category);

    res.json(filtered);
};

// 생성
export const createPost = (req: Request, res: Response) => {
    const newPost = {
        id: Date.now(),
        title: req.body.title,
        category: req.body.category, // 🔥 핵심
    };

    posts.push(newPost);
    res.status(201).json(newPost);
};

export function getPosts(req: Request, res: Response) {
    res.json(posts);
}