import React from 'react';
import { useLogout } from '../Hooks/UseLogout';

const UserHome = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <div>
      <h2>Hello</h2>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default UserHome;
