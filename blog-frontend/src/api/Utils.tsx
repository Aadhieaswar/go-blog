export interface UserParams {
    username: string;
    password: string;
};

export interface UserInfo {
    id: number;
    username: string;
}

export interface PostParams {
    id: number;
    title: string;
    content: string;
    slug: string;
    author: UserInfo;
}

export interface CreatePostParams {
    title: string;
    content: string;
    slug: string;
}

export interface ErrorResponse {
    error: {
        message: string;
        code: string;
    };
}