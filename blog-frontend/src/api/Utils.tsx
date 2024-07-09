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
    image: string;
}

export interface CreatePostParams {
    title: string;
    content: string;
    slug: string;
    image: File;
}

export interface ErrorResponse {
    error: {
        message: string;
        code: string;
    };
}