import { apiRequest } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../config/apiConfig';
import { setToken, clearToken } from '../utils/tokenManager';

export const login = (email, password) => {
  return apiRequest(API_ENDPOINTS.LOGIN, 'POST', { email, password })
    .then(data => {
      setToken(data.token);
      return data;
    });
};

export const signUp = (email, password, username) => {
  return apiRequest(API_ENDPOINTS.SIGNUP, 'POST', { email, password, username })
    .then(data => {
      setToken(data.token);
      return data;
    });
};

export const logout = () => {
  clearToken();
};