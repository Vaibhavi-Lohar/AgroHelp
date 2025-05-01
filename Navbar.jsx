import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import '../App.css';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="logo">
        <Link to="/">KRISHI SEVA</Link>
      </div>
      <div style={{ flex: 1 }} />

      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/RenterDashboard">Provider</Link>
            </li>
            <li>
              <Link to="/ResourceSelection">Buyer</Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="auth-button-container">
              <button
                onClick={async () => {
                  await signOut(auth);
                  window.location.href = '/';
                }}
                className="logout-button"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="auth-button-container">
            <Link to="/login" className="login-button">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;