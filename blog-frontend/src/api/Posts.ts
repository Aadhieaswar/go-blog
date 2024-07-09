import axios from "axios"
import { CreatePostParams, ErrorResponse, PostParams } from "./Utils";

export const GetAllPosts = async (): Promise<ErrorResponse | PostParams[]> => {
    try
    {
        const response = await axios.get<PostParams[]>(import.meta.env.VITE_APP_BACKEND_URL + '/api/posts');
        const data = await response.data;

        const postsWithImages = await Promise.all(data.map(async (post) => {
            const image = await GetPostImageBySlug(post.slug);

            return {
                ...post,
                image: image as string
            }
        }));

        return postsWithImages;
    }
    catch (error)
    {
        console.error("Error fetching all the posts:", error);
        throw error;
    }
}

export const CreatePost = async (createPostParams: CreatePostParams, token: string): Promise<ErrorResponse | any> => {
    try
    {
        const formData = new FormData();

        formData.append('title', createPostParams.title);
        formData.append('content', createPostParams.content);
        formData.append('slug', createPostParams.slug);
        formData.append('image', createPostParams.image);

        const response = await axios.post(
            import.meta.env.VITE_APP_BACKEND_URL + '/api/create-post',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });
        
        return await response.data;
    }
    catch (error)
    {
        console.error("Error creating post:", error);
        throw error;
    }
}

export const GetPostBySlug = async (slug: string): Promise<ErrorResponse | PostParams> => {
    try
    {
        const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + `/api/post/${slug}`);
        const data = await response.data;
        return data;
    }
    catch (error)
    {
        console.error(`Error fetching post using slug ${slug}:`, error);
        throw error;
    }
}

export const GetPostImageBySlug = async (slug: string): Promise<ErrorResponse | string> => {
    try
    {
        const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + `/api/post/${slug}/image`, {
            responseType: "arraybuffer"
        });
        const imageData = await response.data;
        const base64Image = btoa(
            new Uint8Array(imageData).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
                ));

        return `data:image/jpeg;base64,${base64Image}`;
    }
    catch (error)
    {
        console.error(`Error fetching image for post using slug ${slug}:`, error);
        throw error;
    }
}
