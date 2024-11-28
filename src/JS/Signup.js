import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ toggleForm }) => {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setError('');

        if (!userDetails.email || !userDetails.password) {
            setError('Both email and password are required.');
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(userDetails.email)) {
            setError('Please enter a valid email address (e.g., example@example.com).');
            return;
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordPattern.test(userDetails.password)) {
            setError('Password must be at least 8 characters long and contain both letters and numbers.');
            return;
        }

        setIsLoading(true);

        try {
            await axios.post('https://wirefully-backend0.onrender.com/signup', userDetails);
            toggleForm();
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'An error occurred. Please try again.');
            } else if (err.request) {
                setError('Network error. Please check your connection and try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}
            <div className='input-group'>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    value={userDetails.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div className='input-group'>
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    value={userDetails.password} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <button type="submit" disabled={isLoading}> {isLoading ? 'Signing Up...' : 'Sign Up'}</button>
        </form>
    );
};

export default Signup;
