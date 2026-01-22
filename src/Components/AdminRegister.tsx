// AdminRegister.tsx - New component for admin registration
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './supabase';

const AdminRegister: React.FC = () => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inviteValid, setInviteValid] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      validateInvite(tokenFromUrl);
    }
  }, [location]);

  const validateInvite = async (inviteToken: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_invites')
        .select('*')
        .eq('token', inviteToken)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        setError('Invalid or expired invite');
        return;
      }

      setEmail(data.email);
      setInviteValid(true);
    } catch (error: any) {
      setError('Failed to validate invite');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      // 1. Update password in Supabase Auth
      const { error: authError } = await supabase.auth.updateUser({
        password: password
      });

      if (authError) {
        // If user doesn't exist, sign them up
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name }
          }
        });

        if (signUpError) throw signUpError;
      }

      // 2. Get the auth user
      const { data: authUser } = await supabase.auth.getUser();
      
      if (!authUser.user) {
        throw new Error('User not found in auth');
      }

      // 3. Create admin record
      const { data: invite } = await supabase
        .from('admin_invites')
        .select('*')
        .eq('token', token)
        .single();

      const { error: adminError } = await supabase
        .from('admins')
        .insert({
          auth_user_id: authUser.user.id,
          name: name || invite.email.split('@')[0],
          email: invite.email,
          role: invite.role_assigned,
          is_active: true,
          settings: {}
        });

      if (adminError) throw adminError;

      // 4. Mark invite as used
      await supabase
        .from('admin_invites')
        .update({ used: true, used_at: new Date().toISOString() })
        .eq('token', token);

      // 5. Redirect to login
      alert('✅ Registration successful! You can now login.');
      navigate('/superadmin/login');

    } catch (error: any) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (!inviteValid) {
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
          maxWidth: '400px',
          width: '100%'
        }}>
          <h2>Invalid Invite</h2>
          <p>{error || 'This invite link is invalid or has expired.'}</p>
          <button onClick={() => navigate('/')}>Return Home</button>
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
      padding: '20px'
    }}>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '20px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Complete Admin Registration</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Registering as admin for: <strong>{email}</strong>
        </p>

        {error && (
          <div style={{ 
            background: '#fee', 
            color: '#c33', 
            padding: '12px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '20px' }}>
            <label>Name (Optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginTop: '5px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginTop: '5px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                marginTop: '5px'
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#999' : '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 600
            }}
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;