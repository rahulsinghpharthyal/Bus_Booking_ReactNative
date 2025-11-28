import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken } from './storage';
import { BASE_URL } from './config';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Request Interceptor
apiClient.interceptors.request.use(
  async config => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor

apiClient.interceptors.response.use(
    response => response,
    async error=> {
        if(error.response?.status===403){
            const refreshToken = await getRefreshToken();
            if(!refreshToken){
                return Promise.reject(error)
            }
            try{
                const {data} = await axios.post(`${BASE_URL}/api/v1/user/refresh-accesstoken` , {
                    refreshToken,
                });
                await setAccessToken(data?.accessToken);
                error.config.headers.Authorization = `Bearer ${data?.accessToken}`;
                return axios(error.config);
            }catch(refreshError){
                return Promise.reject(refreshError)
            }
        }
    }
)

export default apiClient;