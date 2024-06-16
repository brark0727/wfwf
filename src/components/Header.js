import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

function Header() {
  const { user, setUser, status, setStatus, token, logout } = useAppContext();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch('http://localhost:8080/account/username', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUser({ ...user, name: data.username });
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };

    if (!user.name) {
      fetchUserName();
    }
  }, [setUser, user, token]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const getStatusColor = () => {
    switch (status) {
      case '출근 전': return '#D32F2F'; // 빨간색
      case '업무 중': return '#4CAF50'; // 초록색
      case '대기 중': return '#FF9800'; // 주황색
      default: return '#D32F2F'; // 기본 색상은 빨간색
    }
  };

  const headerStyle = {
    backgroundColor: getStatusColor(),
    color: 'white',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%' // 헤더가 화면 전체 너비를 차지하도록 설정
  };

  const centerStyle = {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center'
  };

  return (
      <header style={headerStyle}>
        <div>{user ? `${user.name}님 업무 일정` : '로그인이 필요합니다'}</div>
        <div style={centerStyle}>
          <select value={status} onChange={handleStatusChange}>
            <option value="출근 전">출근 전</option>
            <option value="대기 중">대기 중</option>
            <option value="업무 중">업무 중</option>
          </select>
        </div>
        {user ? (
            <button onClick={logout} style={{ color: 'white', background: 'none', border: 'none' }}>로그아웃</button>
        ) : (
            <button onClick={() => setUser({ name: "사용자명" })} style={{ color: 'white', background: 'none', border: 'none' }}>로그인</button>
        )}
      </header>
  );
}

export default Header;
