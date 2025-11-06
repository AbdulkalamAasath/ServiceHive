import React, { useEffect, useState } from 'react';
import { UseAuth } from '../Hooks/UseAuth';

const UserData = () => {
  const { User } = UseAuth();
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/user/action/api/get-data', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${User?.token}`,
          },
        });

        if (!response.ok) {
          console.log("Response not OK");
          return;
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (User?.token) {
      fetchData();
    }
  }, [User]);

  const handleChange = async (e, value) => {
    e.preventDefault();

    const data = {
      obj_id: value,
      swap_req: true,
    };

    try {
      const response = await fetch('http://localhost:4000/user/action/api/update-data', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${User.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.message || json.error || "Error updating data");
        return;
      }

      window.alert('Swap request sent successfully!');

      setData(prev =>
        prev.map(item =>
          item._id === value ? { ...item, swap_req: true } : item
        )
      );
      window.location.reload()

    } catch (error) {
      console.error("Error during swap:", error);
    }
  };

  
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>User Data</h1>

      {!Data || Data.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No records found.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            textAlign: 'left',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Start Time</th>
              <th style={thStyle}>End Time</th>
              <th style={thStyle}>Swap</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr key={item._id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{item.title || '-'}</td>
                <td style={tdStyle}>{item.status || '-'}</td>
                <td style={tdStyle}>{formatDateTime(item.st_time)}</td>
                <td style={tdStyle}>{formatDateTime(item.end_time)}</td>
                <td style={tdStyle}>
                  {item.status === "Swapable" ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                      Time slot shown to others for swapping
                    </span>
                  ) : (
                    <button
                      style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => handleChange(e, item._id)}
                    >
                      Swap
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  background: '#f0f0f0',
  fontWeight: '600',
  color: '#333',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
};

export default UserData;
