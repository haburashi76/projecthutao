let posts = [
    { id: 1, title: "공부 게시판", category: "study", description: "공부를 주제로 이야기하는 게시판입니다." },
    { id: 2, title: "자유 게시판", category: "main", description: "특정한 주제가 없는 자유 게시판입니다."},
    { id: 3, title: "1학년 게시판", category: "1st-grade", description: "1학년에 관하여 이야기하는 게시판입니다." },
    { id: 4, title: "2학년 게시판", category: "2nd-grade", description: "2학년에 관하여 이야기하는 게시판입니다." },
    { id: 5, title: "3학년 게시판", category: "3rd-grade", description: "3학년에 관하여 이야기하는 게시판입니다." },
    { id: 6, title: "운동 게시판", category: "exercises", description: "운동을 주제로 이야기하는 게시판입니다." },
    { id: 7, title: "공지", category: "notification", description: "주로 공지사항이 올라갑니다." },
];

export const getAllPosts = (req, res) => {
    res.json(posts);
};

export const getPostsByCategory = (req, res) => {
    const { category } = req.params;

    const filtered = posts.filter(p => p.category === category);

    res.json(filtered);
};

export const createPost = (req, res) => {
    const newPost = {
        id: Date.now(),
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
    };

    posts.push(newPost);
    res.status(201).json(newPost);
};
