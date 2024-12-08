import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Loading.css';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/verify-token', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Authentication failed:', error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        const response = await axios.post('http://localhost:8000/login', credentials);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
        setIsAuthenticated(true);
    };

    const logout = async () => {
            console.log("Token before logout:", localStorage.getItem('token'));
            localStorage.removeItem('token'); 
               
            setUser(null);
            setIsAuthenticated(false);
            
            await axios.post('http://localhost:8000/logout', null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }); 

            /*await axios.post('https://wirefully-backend0.onrender.com/logout', null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });*/
            window.location.href = '/';  
    };
    
    const token = localStorage.getItem('token');

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated, token }}>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
