import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <button type="button">
        <Link to="/login">Login</Link>
      </button>
      <button type="button">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Homepage;
