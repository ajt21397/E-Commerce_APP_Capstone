// Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children, username, onLogout }) {
  return (
    <div className="app-container">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* Other navigation links */}
          </ul>
        </nav>
        {username ? (
          <div className="user-info">
            <p>Welcome, {username}!</p>
            <button onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </header>
      <main>{children}</main>
      {/* Footer or other layout elements */}
    </div>
  );
}

export default Layout;
