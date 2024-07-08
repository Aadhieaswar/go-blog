import axios from "axios"
import { CreatePostParams, ErrorResponse, PostParams } from "./Utils";

export const GetAllPosts = async (): Promise<ErrorResponse | PostParams[]> => {
    try
    {
        const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + '/api/posts');
        const data = await response.data;
        return data;
    }
    catch (error)
    {
        console.error("Error fetching all the posts:", error);
        throw error;
    }
}

export const CreatePost = async ({ title, content, slug }: CreatePostParams, token: string): Promise<ErrorResponse | any> => {
    try
    {
        const response = await axios.post(
            import.meta.env.VITE_APP_BACKEND_URL + '/api/create-post',
            { title, content, slug },
            {
                headers: {
                    'Content-Type': 'application/json',
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
