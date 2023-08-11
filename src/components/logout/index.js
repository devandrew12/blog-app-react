import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
