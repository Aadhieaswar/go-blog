import axios from "axios"

export const GetAllPosts = async () => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/posts');
    const data = await response.data;
    return data;
}

export const CreatePost = async ({ title, content, token, slug }) => {
    const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/api/create-post',
        { title, content, slug },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
    
    return await response.data;
}

export const GetPostBySlug = async (slug) => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/post/${slug}`);
    const data = await response.data;
    return data;
}

export const GetPostyId = async (id) => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/get-post/${id}`);
    const data = await response.data;
    return data;
}