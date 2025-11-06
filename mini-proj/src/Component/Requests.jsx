import React, { useEffect, useState } from 'react';
import { UseAuth } from '../Hooks/UseAuth';

const Requests = () => {
  const { User } = UseAuth();
  const [Data, setData] = useState([]);
  console.log(User.token)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/user/action/api/swap-request', {
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

  const formatDateTime = (isoString) => {
    if (!isoString) return '-';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const handleAccept = async (e, item) => {
    e.preventDefault();

    const data = {
      id: item.id,
      from_id: item.from_id,
      from_eid: item.from_eid,
      to_eid: item.to_eid,
      fevn: item.fevn,
      tevn: item.tevn,
      status: "Accepted"
    };

    try {
      const response = await fetch('http://localhost:4000/user/action/api/swap-response', {
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

      window.alert('Swap successfully completed!');

    
      setData(prev =>
        prev.map(req =>
          req._id === item._id ? { ...req, swap: "Accepted" } : req
        )
      );
    window.location.reload();

    } catch (error) {
      console.error("Error during swap:", error);
    }
  };







  const handleDecline = async(e,item) => {

     e.preventDefault();

    const data = {
      id: item.id,
      from_id: item.from_id,
      from_eid: item.from_eid,
      to_eid: item.to_eid,
      fevn: item.fevn,
      tevn: item.tevn,
      status: "Declined"
    };

    try {
      const response = await fetch('http://localhost:4000/user/action/api/swap-response', {
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

      window.alert('Swap cancelled!');

    
       setData(prev =>
      prev.map(req =>
        req._id === item._id ? { ...req, swap: "Declined" } : req
      )
    );
       window.location.reload();
    } catch (error) {
      console.error("Error during swap:", error);
    }
  };
   

  return (
    <div style={{ padding: '20px' }}>
      <h1>Swap Requests</h1>

      {!Data || Data.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            textAlign: 'left',
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              <th style={thStyle}>From</th>
              <th style={thStyle}>For the Event</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Start Time</th>
              <th style={thStyle}>End Time</th>
              <th style={thStyle}>Options</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr key={item._id}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{item.from_name || '-'}</td>
                <td style={tdStyle}>{item.fevn}</td>
                <td style={tdStyle}>{item.swap || 'Pending'}</td>
                <td style={tdStyle}>{formatDateTime(item.st_time)}</td>
                <td style={tdStyle}>{formatDateTime(item.end_time)}</td>
                <td style={tdStyle}>
                  {item.swap === "Accepted" ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>Accepted</span>
                  ) : item.swap === "Declined" ? (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>Declined</span>
                  ) : (
                    <>
                      <button style={acceptBtnStyle} onClick={(e) => handleAccept(e, item)}>
                        Accept
                      </button>
                      <button style={declineBtnStyle} onClick={(e) => handleDecline(e,item)}>
                        Decline
                      </button>
                    </>
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
  padding: '8px',
  background: '#f5f5f5',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
};

const acceptBtnStyle = {
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '8px',
};

const declineBtnStyle = {
  backgroundColor: '#dc3545',
  color: '#fff',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Requests;
