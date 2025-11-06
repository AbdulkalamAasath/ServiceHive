import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../Hooks/UseLogout';

const Navbar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/user/login'); 
  };

  const tabs = [
    { name: 'Requests', path: '/user/requests' },
    { name: 'Data', path: '/user/data' },
    { name: 'Available Slots', path: '/user/swapable-data' },
    { name: 'Create Event', path: '/user/create' },
  ];

  return (
    <nav
      style={{
        backgroundColor: '#007bff',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '10px auto 20px',
        maxWidth: '900px',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: '600', color: 'white' }}>
        My Dashboard
      </div>

  
      <div style={{ display: 'flex', gap: '15px' }}>
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            style={({ isActive }) => ({
              backgroundColor: isActive ? '#fff' : 'transparent',
              color: isActive ? '#007bff' : '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.3s ease',
            })}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#dc3545',
          color: 'white',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#b02a37')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
