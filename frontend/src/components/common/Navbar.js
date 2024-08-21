import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../Navbar.css'; // Import your CSS file
import { AuthContext } from '../context/auth-context';
const Navbar = () => {
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">PlayUpbeat</a>
      </div>
      <button className="navbar-toggler" onClick={toggleNavbar}>
        ☰
      </button>
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {!auth.isLoggedIn && (
          <li>
            <Link to="/login">Login</Link>
          </li>
          )}    
          {auth.isLoggedIn && auth.userRole === 'admin' &&
          (
            <li>
              <Link to="/admin/dashboard">My Dashboard</Link>
            </li>
          )}
          {auth.isLoggedIn && auth.userRole === 'user' &&
          (
            <li>
              <Link to="/dashboard">My Dashboard</Link>
            </li>
          )}     
          {auth.userRole === 'admin' &&
            <li>
              <Link to="/admin/createTournament">Create Tournament</Link>
            </li>
          }
          {auth.userRole !== 'admin' &&
            <li>
              <Link to="/admin/login">Organizer Login</Link>
            </li>
          }
          {auth.isLoggedIn && (
            <li>
              <Link to="/" onClick={auth.logout}>Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
