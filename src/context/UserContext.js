import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '홍길동' }); // 초기 로그인 상태 시뮬레이션
  const [status, setStatus] = useState('출근 전');

  return (
    <UserContext.Provider value={{ user, setUser, status, setStatus }}>
      {children}
    </UserContext.Provider>
  );
};
