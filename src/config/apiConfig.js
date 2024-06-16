const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  REGISTER: `${API_BASE_URL}/account/register`,
  FETCH_USER: `${API_BASE_URL}/user/me`, // 유저 정보를 가져오는 엔드포인트
  FETCH_TODOS: `${API_BASE_URL}/todo`,
  CREATE_TODO: `${API_BASE_URL}/todo/create`,
  UPDATE_TODO: `${API_BASE_URL}/todo/update`,
  DELETE_TODO: `${API_BASE_URL}/todo/delete`
};
