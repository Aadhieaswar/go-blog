import axios from "axios";
import { UserParams, UserInfo, ErrorResponse } from "./Utils";

export const RegisterUser = async ({ username, password }: UserParams): Promise<ErrorResponse | any> => {
    try 
    {
        const response = await axios.post(import.meta.env.VITE_APP_BACKEND_URL + '/api/create-user', { username, password });

        return await response.data;
    }
    catch (error) 
    {
        console.error('Error registering user:', error)
        throw error;
    }
}

export const LoginUser = async ({ username, password }: UserParams): Promise<ErrorResponse | any> => {
    try 
    {
        const response = await axios.post(import.meta.env.VITE_APP_BACKEND_URL + '/api/login', { username, password });
        
        return await response.data;
    }
    catch (error) 
    {
        console.error('Error logging in user:', error)
        throw error;
    }
}

export const GetUserInfo = async (token: string, id=""): Promise<ErrorResponse | UserInfo> => {
    try 
    {
        const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + `/api/user-info?id=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.data;

        return data;
    }
    catch (error) 
    {
        console.error('Error fetching user info:', error)
        throw error;
    }
}

export const GetBasicUserInfo = async (id: number): Promise<ErrorResponse | UserInfo> => {
    try 
    {
        const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL + `/api/basic-user-info?id=${id}`);
        const data = await response.data;

        return data;
    }
    catch (error) 
    {
        console.error('Error fetching user info:', error)
        throw error;
    }
}