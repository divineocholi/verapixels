import React from 'react'
import { Link } from 'react-router-dom'

const TestRoute = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>✅ Routes Working!</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Your Vite app on port 5173 is working correctly!
      </p>
      
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        padding: '30px',
        borderRadius: '15px',
        backdropFilter: 'blur(10px)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <h3>Test these URLs:</h3>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/admin" style={linkStyle}>
            🔐 Chat Admin Dashboard
          </Link>
          <Link to="/superadmin/login" style={linkStyle}>
            👑 Super Admin Login
          </Link>
          <Link to="/" style={linkStyle}>
            🏠 Back to Home
          </Link>
        </div>
        
        <div style={{ marginTop: '30px', fontSize: '14px', opacity: 0.8 }}>
          <p>Server running on: <code>http://localhost:5173</code></p>
          <p>React Router is properly configured</p>
        </div>
      </div>
    </div>
  )
}

const linkStyle = {
  display: 'block',
  padding: '12px 20px',
  background: 'rgba(255,255,255,0.2)',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  transition: 'all 0.3s'
}

export default TestRoute