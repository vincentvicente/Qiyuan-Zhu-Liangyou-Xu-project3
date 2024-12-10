import React from 'react';
import { Link } from 'react-router-dom';
import LogoutHandler from './LogoutHandler';
import '../styling/NavBar.css'; // 导入样式

const NavBar = ({ isLoggedIn, username, onLogout }) => {
  return (
    <nav className="navbar">
      <h1>MyApp</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/user">User Page</Link>
        {isLoggedIn && username ? (
          <>
            <span>Hi, {username}</span>
            <LogoutHandler onLogout={onLogout} /> {/* 使用 LogoutHandler */}
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
