// src/components/LoginPage.js
import React from 'react';

const KAKAO_AUTH_URL = 'http://localhost:8080/oauth2/authorization/kakao';

const LoginPage = () => {
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={handleKakaoLogin}>카카오로 로그인하기</button>
    </div>
  );
};

export default LoginPage;
