import React from 'react';

const TestAdmin = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333' }}>✅ Admin Route is Working!</h1>
        <p style={{ color: '#666', margin: '20px 0' }}>
          If you can see this page, your routes are working.
        </p>
        <div style={{ marginTop: '20px' }}>
          <a 
            href="/admin" 
            style={{
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginRight: '10px'
            }}
          >
            Go to Admin
          </a>
          <a 
            href="/" 
            style={{
              padding: '10px 20px',
              background: '#ddd',
              color: '#333',
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestAdmin;