import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import RedirectPage from './components/RedirectPage';
import UserNameInputPopup from './components/UserNameInputPopup';
import './App.css';

function MainApp() {
    const { user } = useAppContext();
    const [isUserNamePopupOpen, setIsUserNamePopupOpen] = useState(false);

    useEffect(() => {
        if (user && !user.name) {
            setIsUserNamePopupOpen(true);
        }
    }, [user]);

    const handleUserNamePopupClose = () => {
        setIsUserNamePopupOpen(false);
    };

    if (!user) {
        return <LoginPage />;
    }

    return (
        <div className="app-container">
            <Header />
            {isUserNamePopupOpen && <UserNameInputPopup onClose={handleUserNamePopupClose} />}
            <div className="main-content">
                <Calendar />
                <TodoList />
            </div>
        </div>
    );
}

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/redirection" element={<RedirectPage />} />
                    <Route path="/" element={<MainApp />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;
