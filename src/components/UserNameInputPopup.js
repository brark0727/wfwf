import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { updateUserName } from '../services/userService';
import './UserNameInputPopup.css';

const UserNameInputPopup = ({ onClose }) => {
    const { user, setUser, token } = useAppContext();
    const [username, setUsername] = useState('');

    const handleUsernameSubmit = async (event) => {
        event.preventDefault();
        try {
            if (token) {
                await updateUserName(username, token.replace('Bearer ', '')); // Bearer 제거
                setUser({ ...user, name: username });
                onClose(); // 성공적으로 업데이트 후 팝업 닫기
            } else {
                console.error('Token is not available');
            }
        } catch (error) {
            console.error('Failed to update username:', error);
        }
    };

    return (
        <div className="username-popup">
            <form onSubmit={handleUsernameSubmit}>
                <label>
                    Enter your username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserNameInputPopup;
