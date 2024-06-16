import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const { token, setToken } = useAppContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username })
    });

    const data = await response.json();
    if (response.ok) {
      setToken(data.data.token); // 새로 발급된 USER 토큰 저장
      localStorage.setItem('token', data.data.token);
      window.location.reload(); // 페이지를 리로드하여 새 토큰 적용
    } else {
      console.error('Failed to register user:', data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
