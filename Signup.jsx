import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../App.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Optionally store user in Firestore here
      localStorage.setItem('userEmail', email);
      setLoading(false);
      navigate('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please log in or use a different email.');
      } else {
        setError(err.message || 'Signup failed.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-bg">
      <div className="auth-form enhanced-auth-form">
        <div className="auth-logo">
          <h2>KrishiSeva.in</h2>
        </div>
        <h1>Create Your Account</h1>
        <p className="auth-subtitle">Join the Community of Smart Farmers</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <div className="input-icon-group">
              <span className="input-icon"><img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Email" /></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
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
                placeholder="Create a password"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <div className="input-icon-group">
              <span className="input-icon"><img src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" alt="Confirm Password" /></span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </div>
          </div>
          <button type="submit" className="submit-button enhanced-btn" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
          {error && <div className="error-message" style={{ color: 'red', marginTop: 10 }}>{error}</div>}
        </form>
        <p className="auth-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;