import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f5f5f5' }}>
      <Link to="/">Home</Link>
      {user ? (
        <div>
          <span>Welcome, {user.username}</span>
          <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup" style={{ marginLeft: '10px' }}>Signup</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
