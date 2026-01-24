import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "./supabase"; // CHANGED THIS LINE

const SuperadminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    console.log('Attempting login with:', email);
    
    // Check if admins table exists by trying to query it
   // FIX THIS LINE IN YOUR LOGIN COMPONENT
const { data: adminData, error: adminError } = await supabase
  .from('admins')
  .select('*')
  .eq('email', email)
  .eq('is_active', true)
  .maybeSingle(); // ← CHANGE THIS from .single()
    console.log('Query result:', { adminData, adminError });

    if (adminError) {
      console.error('Database error:', adminError);
      
      // If table doesn't exist yet
      if (adminError.code === '42P01') {
        setError('Admins table not created yet. Run the SQL first.');
      } else {
        setError(`Database error: ${adminError.message}`);
      }
      setLoading(false);
      return;
    }

    if (!adminData) {
      setError('No admin found with this email. Create account first.');
      setLoading(false);
      return;
    }

    // SIMPLE PASSWORD CHECK (for now)
    // We're storing plain text password temporarily
    if (password === adminData.password_hash) {
      // Store admin data in localStorage
      localStorage.setItem('admin_data', JSON.stringify({
        id: adminData.id,
        name: adminData.name,
        email: adminData.email,
        role: adminData.role,
        last_login: new Date().toISOString()
      }));

      // Update last login in database
      await supabase
        .from('admins')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.id);

      setSuccess(`Welcome ${adminData.name}! Redirecting...`);
      
      setTimeout(() => {
        navigate('/superadmin/dashboard');
      }, 1500);

    } else {
      setError('Incorrect password');
    }

  } catch (err: any) {
    console.error('Login error:', err);
    setError(`Login failed: ${err.message}`);
  } finally {
    setLoading(false);
  }
};
  // Remove the createSuperAdmin function for now
  // Just show simple login

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'white',
            fontSize: '24px'
          }}>
            <i className="fas fa-shield-alt"></i>
          </div>
          <h2 style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 600 }}>
            Super Admin Login
          </h2>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
            Use the email you created in the database
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '14px',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              placeholder="admin@verapixel.com"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '14px',
                transition: 'all 0.3s',
                outline: 'none'
              }}
              placeholder="Any password for now"
            />
          </div>

          {error && (
            <div style={{
              padding: '12px',
              background: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              color: '#c33',
              fontSize: '14px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              padding: '12px',
              background: '#dfd',
              border: '1px solid #afa',
              borderRadius: '8px',
              color: '#3a3',
              fontSize: '14px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-check-circle"></i>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s'
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Signing in...
              </>
            ) : (
              'Login as Super Admin'
            )}
          </button>
        </form>

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #eee',
          textAlign: 'center'
        }}>
          <p style={{ color: '#777', fontSize: '12px', marginBottom: '10px' }}>
              Don't have admin access?
          </p>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Contact management for account approval
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <a 
            href="/" 
            style={{
              color: '#667eea',
              fontSize: '12px',
              textDecoration: 'none'
            }}
          >
            <i className="fas fa-arrow-left"></i> Back to Main Site
          </a>
        </div>
      </div>

      {/* Add Font Awesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />
    </div>
  );
};

export default SuperadminLogin;