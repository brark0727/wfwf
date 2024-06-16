import { apiRequest } from '../utils/apiHelper';
import { API_ENDPOINTS } from '../config/apiConfig';

export const fetchTodos = () => {
  return apiRequest(API_ENDPOINTS.FETCH_TODOS);
};

export const createTodo = (todo) => {
  return apiRequest(API_ENDPOINTS.CREATE_TODO, 'POST', todo);
};

export const updateTodo = (todoId, updates) => {
  return apiRequest(API_ENDPOINTS.UPDATE_TODO, 'POST', { todoId, ...updates });
};

export const deleteTodo = (todoId) => {
  return apiRequest(API_ENDPOINTS.DELETE_TODO, 'POST', { todoId });
};

export const loadTodos = () => {
  return apiRequest(API_ENDPOINTS.LOAD_TODOS);
};
