import { apiRequest } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../config/apiConfig';

export const fetchUserData = async (token) => {
    const response = await apiRequest(API_ENDPOINTS.FETCH_USER, 'GET', null, token);
    return response;
};

export const updateUserName = async (username, token) => {
    const response = await apiRequest(API_ENDPOINTS.REGISTER, 'POST', { username }, token); // 'register' 엔드포인트 사용
    return response;
};
