import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserData } from '../services/userService';
import { getToken, setToken as saveToken } from '../utils/tokenManager';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    });
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState('출근 전');
    const [token, setToken] = useState(getToken());

    const addTodo = (todo) => {
        setTodos([...todos, { ...todo, id: Date.now() }]);
    };

    const completeTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const savedToken = getToken();
        if (savedToken) {
            setToken(savedToken);
            fetchUserData(savedToken).then((userData) => {
                if (userData) {
                    setUser(userData);
                }
            }).catch((error) => {
                console.error('Failed to fetch user data:', error);
            });
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                todos,
                selectedDate,
                setSelectedDate,
                user,
                setUser,
                status,
                setStatus,
                addTodo,
                completeTodo,
                deleteTodo,
                token,
                setToken,
                logout,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
