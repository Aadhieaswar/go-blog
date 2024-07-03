import axios from "axios";

export const RegisterUser = async ({ username, password }) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/create-user', { username, password });

    return await response.data;
}

export const LoginUser = async ({ username, password }) => {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', { username, password });
    
    return await response.data;
}

export const GetUserInfo = async (token, id="") => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/user-info?id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await response.data;

    return data;
}

export const GetBasicUserInfo = async (id) => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/basic-user-info?id=${id}`);
    const data = await response.data;

    return data;
}