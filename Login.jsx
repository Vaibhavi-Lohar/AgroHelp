import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../App.css';

const Login = () => {
  const [identifier, setIdentifier] = useState(''); // Accepts email or username
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, identifier, password);
      localStorage.setItem('userEmail', identifier);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-bg">
      <div className="auth-form enhanced-auth-form">
        <div className="auth-logo">
          <h2>KrishiSeva.in</h2>
        </div>
        <h1>Welcome Back!</h1>
        <p className="auth-subtitle">Empowering Agriculture Through Sharing</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username or Email:</label>
            <div className="input-icon-group">
              <span className="input-icon"><img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="User" /></span>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder="Enter your email or username"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <div className="input-icon-group">
              <span className="input-icon"><img src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" alt="Password" /></span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button type="submit" className="submit-button enhanced-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          {error && <div className="error-message" style={{ color: 'red', marginTop: 10 }}>{error}</div>}
        </form>
        <p className="auth-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
