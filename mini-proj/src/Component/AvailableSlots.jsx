import React, { useEffect, useState } from 'react';
import { UseAuth } from '../Hooks/UseAuth';

const AvailableSlots = () => {
  const { User } = UseAuth();
  const [Data, setData] = useState([]);
  const [MySlots, setMySlots] = useState([]);
  const [SelectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await fetch('http://localhost:4000/user/action/api/swappable-slots', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${User?.token}`,
          },
        });
        const json = await response.json();
        setData(json);

      
        const myRes = await fetch('http://localhost:4000/user/action/api/my-slots', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${User?.token}`,
          },
        });

        const mySlotsJson = await myRes.json();
        setMySlots(mySlotsJson);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (User?.token) fetchData();
  }, [User]);

  const handleChange = async (e, targetSlot) => {
    e.preventDefault();

    if (!SelectedSlot) {
      window.alert("Please select one of your slots to swap with.");
      return;
    }

    const mySlot = MySlots.find(slot => slot._id === SelectedSlot);
    if (!mySlot) {
      window.alert("Selected slot not found.");
      return;
    }

    const data = {
      from_id: mySlot.uid,
      to_id: targetSlot.uid,
      swap_from_uid: mySlot._id,
      swap_to_uid: targetSlot._id,
    };

    const data1 = { eid: targetSlot._id };

    try {
      const response = await fetch('http://localhost:4000/user/action/api/req-data', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${User.token}`,
        },
      });

      const response1 = await fetch('http://localhost:4000/user/action/api/processdata', {
        method: 'POST',
        body: JSON.stringify(data1),
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

      if (!response1.ok) {
        console.log("Error updating data");
        return;
      }

      window.alert('Swap request sent successfully!');
      setData(prev =>
        prev.map(item =>
          item._id === targetSlot._id ? { ...item, status: 'Pending' } : item
        )
      );
      window.location.reload();
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
      <h1 style={{ textAlign: 'center', color: '#333' }}>Swappable Slots</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label style={{ fontWeight: '600' }}>Select your slot to swap:</label>
        <select
          value={SelectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          style={{
            padding: '8px',
            marginLeft: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="">-- Choose your slot --</option>
          {MySlots.map(slot => (
            <option key={slot._id} value={slot._id}>
              {slot.title} ({formatDateTime(slot.st_time)} - {formatDateTime(slot.end_time)})
            </option>
          ))}
        </select>
      </div>

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
                  {item.status === "Pending" ? (
                    <span style={{ color: 'green', fontWeight: 'bold' }}>
                      Swapping in progress
                    </span>
                  ) : (
                    <button
                      style={btnStyle}
                      onClick={(e) => handleChange(e, item)}
                    >
                      Request
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

const btnStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default AvailableSlots;
