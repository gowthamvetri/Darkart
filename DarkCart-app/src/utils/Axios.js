import axios from 'axios';
import { baseURL } from '../common/SummaryApi';

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

//set the authorization header

Axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//extend the token

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async(error) => {
        const originalRequest = error.config;

        
        if (error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            const refreshToken = localStorage.getItem("refreshToken");
            
            if(refreshToken){
                const newAccessToken = await refreshAccessToken(refreshToken);
                if(newAccessToken){
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originalRequest);
            }
            
        }    
    }
    return Promise.reject(error);
    }
);

const refreshAccessToken = async(refreshToken) => {
    try {
        const response = await Axios({
            url: SummaryApi.refreshToken.url,
            method: SummaryApi.refreshToken.method,
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        localStorage.setItem("accessToken", response.data.data.accessToken);
        return response.data.data.accessToken;
    } catch (error) {
        console.log(error);
    }
}

export default Axios;