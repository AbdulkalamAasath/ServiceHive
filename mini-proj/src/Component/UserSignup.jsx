import React, { useState } from 'react';
import { useSignup } from '../Hooks/UseSignup';

const UserSignup = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(Name, Email, password);
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '80px auto',
        padding: '30px 25px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '12px',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}>Name</label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              outline: 'none',
              fontSize: '14px',
            }}
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}>Email</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              outline: 'none',
              fontSize: '14px',
            }}
          />
        </div>

        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#444' }}>Password</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                flex: 1,
                padding: '10px 12px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '14px',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                marginLeft: '8px',
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>

        {error && (
          <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
          Already have an account?{' '}
          <a
            href="/User/Login"
            style={{ color: '#007bff', textDecoration: 'none', fontWeight: '500' }}
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default UserSignup;
