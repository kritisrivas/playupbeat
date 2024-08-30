import React, { useState, useContext } from 'react';
import axios from 'axios';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

import { AuthContext } from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isLoginMode){
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
        if(response.data.role === 'admin'){
          auth.login(response.data.userId, response.data.role, response.data.token)
          navigate('/admin/dashboard'); // Redirect to user dashboard
        }
        else{
          setError('Please login using admin account');
        }
      } catch (err) {
        setError('Invalid credentials');
      }
    }
    else{
      try {
        const role = 'admin';
        const response = await axios.post('http://localhost:5000/api/users/signup', { name, email, password, role });
        auth.login(response.data.userId, response.data.role, response.data.token)
        navigate('/admin/dashboard'); // Redirect to user dashboard
      } catch (err) {
        setError('Invalid credentials');
      }
    }
  };
  
  const switchModeHandler = () => {
    setIsLoginMode(prevMode => !prevMode);
  }

  return (
    <div className="bodyDiv">
      <Navbar />
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
        {!isLoginMode && (
            <div className="form-group">
            <label>Name:</label>
            <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
            />
            </div>
          )}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </button>
          <button className="switchLoginBtn" onClick={switchModeHandler}>Switch to {isLoginMode ? 'Signup' : 'Login'}</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
