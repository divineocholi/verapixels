import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from './supabase'


const AdminRegister: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteValid, setInviteValid] = useState(false);
  const [inviteData, setInviteData] = useState<any>(null);

  // Validate invite token
  useEffect(() => {
    const validateInvite = async () => {
      if (!token) {
        setError('No invite token provided');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('admin_invites')
          .select('*')
          .eq('token', token)
          .eq('used', false)
          .single();

        if (error || !data) {
          setError('Invalid or expired invite token');
          return;
        }

        const now = new Date();
        const expiresAt = new Date(data.expires_at);
        if (now > expiresAt) {
          setError('Invite token has expired');
          return;
        }

        setInviteValid(true);
        setInviteData(data);
        setEmail(data.email);

      } catch (err: any) {
        setError('Error validating invite: ' + err.message);
      }
    };

    validateInvite();
  }, [token]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      // First check if email matches invite
      if (email !== inviteData.email) {
        setError('Email must match the invite');
        setLoading(false);
        return;
      }

      // Hash password using Supabase's built-in auth (temporary solution)
      // In production, use proper bcrypt hashing
      const passwordHash = password; // This should be properly hashed

      // Create admin account
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .insert({
          name,
          email,
          password_hash: passwordHash, // In production, use proper hashing
          role: inviteData.role_assigned,
          created_by: inviteData.created_by,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (adminError) {
        // If admin already exists, just update their status
        if (adminError.code === '23505') { // Unique violation
          const { error: updateError } = await supabase
            .from('admins')
            .update({ 
              is_active: true,
              role: inviteData.role_assigned 
            })
            .eq('email', email);

          if (updateError) throw updateError;
        } else {
          throw adminError;
        }
      }

      // Mark invite as used
      await supabase
        .from('admin_invites')
        .update({ used: true })
        .eq('token', token);

      // Log security event
      await supabase
        .from('security_logs')
        .insert({
          admin_id: inviteData.created_by,
          action: 'admin_registered',
          details: { 
            invited_email: email,
            registered_name: name,
            role: inviteData.role_assigned 
          }
        });

      alert('Registration successful! You can now login.');
      navigate('/superadmin/login');

    } catch (err: any) {
      setError('Registration failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!inviteValid && error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          maxWidth: '500px',
          width: '90%'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#fee',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#c33',
            fontSize: '32px'
          }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>
            Invalid Invite
          </h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            {error}
          </p>
          <a 
            href="/superadmin/login"
            style={{
              padding: '12px 24px',
              background: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 500
            }}
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

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
            <i className="fas fa-user-plus"></i>
          </div>
          <h2 style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 600 }}>
            Complete Registration
          </h2>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
            You've been invited as an {inviteData?.role_assigned === 'super_admin' ? 'Super Admin' : 'Admin'}
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="John Doe"
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
              Email Address
            </label>
            <input
              type="email"
              value={email}
              disabled
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '14px',
                background: '#f9f9f9',
                color: '#666'
              }}
            />
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              This email was invited
            </div>
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
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="Minimum 8 characters"
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
              placeholder="Re-enter your password"
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
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Creating Account...
              </>
            ) : (
              'Complete Registration'
            )}
          </button>
        </form>

        <div style={{
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <a 
            href="/superadmin/login" 
            style={{
              color: '#667eea',
              fontSize: '12px',
              textDecoration: 'none'
            }}
          >
            Already have an account? Login here
          </a>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: '#f9f9f9',
          borderRadius: '10px',
          fontSize: '12px',
          color: '#666'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <i className="fas fa-shield-alt" style={{ color: '#667eea' }}></i>
            <span style={{ fontWeight: 500 }}>Security Note:</span>
          </div>
          <p style={{ margin: 0 }}>
            This invite expires on {inviteData ? new Date(inviteData.expires_at).toLocaleDateString() : 'Unknown'}. 
            After registration, you'll have {inviteData?.role_assigned === 'super_admin' ? 'full access' : 'limited access'} 
            to the admin dashboard.
          </p>
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

export default AdminRegister;