import React, { useState } from 'react'
import { UseAuth } from '../Hooks/UseAuth'

const CreateTab = () => {
  const [Event, setEvent] = useState('')
  const [St, setSt] = useState('')
  const [Et, setEt] = useState('')
  const [status, setStatus] = useState('')
  const { User } = UseAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      title: Event,
      st_time: St,
      end_time: Et,
      status: status,
    }

    const response = await fetch('http://localhost:4000/user/action/create-event', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${User.token}`,
      },
    })
    const json = await response.json()

    if (!response.ok) {
      console.log(json.error)
    } else {
      console.log(response)
      window.alert('Event added successfully!')
      window.location.reload();
    }
  }

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '60px auto',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '30px 40px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '28px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '25px',
        }}
      >
        Create Event
      </h2>

      <form onSubmit={handleSubmit}>
        
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#555',
            }}
          >
            Event:
          </label>
          <input
            type="text"
            value={Event}
            onChange={(e) => setEvent(e.target.value)}
            placeholder="Enter event name"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>

      
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#555',
            }}
          >
            Start Time:
          </label>
          <input
            type="datetime-local"
            value={St}
            onChange={(e) => setSt(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>

   
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#555',
            }}
          >
            End Time:
          </label>
          <input
            type="datetime-local"
            value={Et}
            onChange={(e) => setEt(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#007bff')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>


        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#555',
            }}
          >
            Status:
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="">Select status</option>
            <option value="Busy">Busy</option>
            <option value="Swapable">Swapable</option>
          </select>
        </div>

       
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default CreateTab
