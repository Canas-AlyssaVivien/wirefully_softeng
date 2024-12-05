import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import '../CSS/Signup.css';
import back from '../CSS/left.png';

const Login = () => {
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(credentials);
            navigate('/home');
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='SignUp'>
                <button className='Back-container'  onClick={handleBackClick}>
                    <img src={back} />
                    <button type="button" className="back-button">
                        Back
                    </button>
                </button>
                <h1 className='Signup-h1'>Log into your account</h1>
                {error && <p style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}
                <div className='input-group'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={credentials.email} 
                        onChange={handleChange}
                        className='Signup-input'
                        required 
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={credentials.password} 
                        onChange={handleChange}
                        className='Signup-input'
                        required 
                    />
                </div>
                <button className='Signup-button' type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Log in'}</button>
                <p className='Signup-p'>
                    Don't have an account? {" "}
                    <span 
                        className='login-link' 
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </form>
    );
};

export default Login;
