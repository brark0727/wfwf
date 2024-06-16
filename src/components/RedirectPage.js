import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { fetchUserData } from '../services/userService';
import { setToken as saveToken } from '../utils/tokenManager';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAppContext();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      saveToken(token);
      setToken(token);
      fetchUserData(token).then((userData) => {
        if (userData) {
          setUser(userData);
        }
        navigate('/'); // 메인 페이지로 리다이렉션
      }).catch((error) => {
        console.error('Failed to fetch user data:', error);
        navigate('/'); // 에러 발생 시에도 메인 페이지로 리다이렉션
      });
    } else {
      navigate('/'); // 토큰이 없으면 로그인 페이지로 리다이렉션
    }
  }, [navigate, setToken, setUser]);

  return (
      <div>Loading...</div>
  );
};

export default RedirectPage;
