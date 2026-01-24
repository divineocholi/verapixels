import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './supabase'; // ✅ Your REAL Supabase import

const AdminRegister: React.FC = () => {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inviteValid, setInviteValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    
    console.log('📧 Token from URL:', tokenFromUrl); // Debug log
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      validateInvite(tokenFromUrl);
    } else {
      setError('No invite token found in URL');
    }
  }, [location]);

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;
    
    setPasswordStrength(Math.min(strength, 100));
  }, [password]);

  const validateInvite = async (inviteToken: string) => {
    try {
      console.log('🔍 Validating invite token:', inviteToken);
      
      // ✅ Query REAL Supabase database
      const { data, error } = await supabase
        .from('admin_invites')
        .select('*')
        .eq('token', inviteToken)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      console.log('📊 Invite data from DB:', data);
      console.log('❌ Any errors?:', error);

      if (error || !data) {
        setError('Invalid or expired invite');
        console.error('Invite validation failed:', error);
        return;
      }

      console.log('✅ Email from invite:', data.email);
      setEmail(data.email); // ✅ Set REAL email from database
      setInviteValid(true);
    } catch (error: any) {
      console.error('Exception during validation:', error);
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
      console.log('🔐 Starting registration for:', email);

      // 1. Get the invite details
      const { data: invite, error: inviteError } = await supabase
        .from('admin_invites')
        .select('*')
        .eq('token', token)
        .single();

      if (inviteError || !invite) {
        throw new Error('Invite not found');
      }

      console.log('📧 Invite details:', invite);

      // 2. Update the user's password using the auth_user_id from invite
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        invite.auth_user_id,
        { password: password }
      );

      if (updateError) {
        console.error('❌ Password update failed:', updateError);
        throw updateError;
      }

      console.log('✅ Password updated successfully');

      // 3. Create admin record
      const { error: adminError } = await supabase
        .from('admins')
        .insert({
          auth_user_id: invite.auth_user_id,
          name: name || invite.email.split('@')[0],
          email: invite.email,
          role: invite.role_assigned,
          is_active: true,
          settings: {}
        });

      if (adminError) {
        console.error('❌ Admin record creation failed:', adminError);
        throw adminError;
      }

      console.log('✅ Admin record created');

      // 4. Mark invite as used
      await supabase
        .from('admin_invites')
        .update({ used: true, used_at: new Date().toISOString() })
        .eq('token', token);

      console.log('✅ Invite marked as used');

      // 5. Redirect to login
      alert('✅ Registration successful! You can now login with your email and new password.');
      navigate('/superadmin/login');

    } catch (error: any) {
      console.error('❌ Registration error:', error);
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return '#ef4444';
    if (passwordStrength < 70) return '#f59e0b';
    return '#10b981';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 40) return 'Weak';
    if (passwordStrength < 70) return 'Medium';
    return 'Strong';
  };

  if (!inviteValid && !error) {
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
          textAlign: 'center'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#666' }}>Validating invite...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error && !inviteValid) {
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
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <i className="fas fa-times-circle" style={{ fontSize: '30px', color: '#ef4444' }}></i>
          </div>
          <h2 style={{ margin: '0 0 10px', fontSize: '24px' }}>Invalid Invite</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            {error || 'This invite link is invalid or has expired.'}
          </p>
          <button 
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '12px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Return Home
          </button>
        </div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
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
      padding: '20px',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '20px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px',
            color: 'white',
            fontSize: '24px'
          }}>
            <i className="fas fa-user-shield"></i>
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 600, color: '#0f172a' }}>
            Complete Registration
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Set up your admin account
          </p>
        </div>

        {/* Email Display */}
        <div style={{ 
          background: '#f8fafc', 
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            color: '#475569'
          }}>
            <i className="fas fa-envelope" style={{ color: '#6366f1' }}></i>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '2px' }}>
                Email Address
              </div>
              <div style={{ fontWeight: 500, fontSize: '14px' }}>{email}</div>
            </div>
            <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
          </div>
        </div>

        {error && (
          <div style={{ 
            background: '#fee2e2', 
            color: '#991b1b', 
            padding: '12px 16px', 
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Name Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: 500,
              color: '#0f172a'
            }}>
              Full Name <span style={{ color: '#94a3b8' }}></span>
            </label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-user" style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }}></i>
            <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter your full name"
  style={{
    width: '100%',
    padding: '12px 12px 12px 40px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    color: '#0f172a',  // ✅ ADD THIS LINE
    backgroundColor: 'white'  // ✅ ADD THIS LINE TOO
  }}
  onFocus={(e) => e.currentTarget.style.borderColor = '#6366f1'}
  onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
/>
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: 500,
              color: '#0f172a'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-lock" style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }}></i>
              <input
  type={showPassword ? 'text' : 'password'}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Create a strong password"
  style={{
    width: '100%',
    padding: '12px 40px 12px 40px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    color: '#0f172a',  // ✅ ADD THIS LINE
    backgroundColor: 'white'  // ✅ ADD THIS LINE TOO
  }}
  onFocus={(e) => e.currentTarget.style.borderColor = '#6366f1'}
  onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
  required
/>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: '4px'
                }}
              >
                <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {password && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '4px'
                }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Password strength:
                  </span>
                  <span style={{ 
                    fontSize: '12px', 
                    fontWeight: 500,
                    color: getPasswordStrengthColor()
                  }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '4px', 
                  background: '#e2e8f0',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${passwordStrength}%`,
                    height: '100%',
                    background: getPasswordStrengthColor(),
                    transition: 'width 0.3s, background 0.3s'
                  }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password Input */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              fontWeight: 500,
              color: '#0f172a'
            }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-lock" style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }}></i>
             <input
  type={showConfirmPassword ? 'text' : 'password'}
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  placeholder="Confirm your password"
  style={{
    width: '100%',
    padding: '12px 40px 12px 40px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    color: '#0f172a',  // ✅ ADD THIS LINE
    backgroundColor: 'white'  // ✅ ADD THIS LINE TOO
  }}
  onFocus={(e) => e.currentTarget.style.borderColor = '#6366f1'}
  onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
  required
/>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: '4px'
                }}
              >
                <i className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p style={{ 
                fontSize: '12px', 
                color: '#ef4444', 
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                margin: '6px 0 0'
              }}>
                <i className="fas fa-times-circle"></i>
                Passwords don't match
              </p>
            )}
            {confirmPassword && password === confirmPassword && (
              <p style={{ 
                fontSize: '12px', 
                color: '#10b981', 
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                margin: '6px 0 0'
              }}>
                <i className="fas fa-check-circle"></i>
                Passwords match
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div style={{ 
            background: '#f8fafc', 
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ 
              fontSize: '12px', 
              color: '#475569', 
              margin: '0 0 8px',
              fontWeight: 500
            }}>
              Password must contain:
            </p>
            <ul style={{ 
              margin: 0, 
              padding: '0 0 0 20px',
              fontSize: '12px',
              color: '#64748b'
            }}>
              <li style={{ marginBottom: '4px' }}>At least 8 characters</li>
              <li style={{ marginBottom: '4px' }}>Uppercase and lowercase letters</li>
              <li>Numbers and special characters</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !password || password !== confirmPassword}
            style={{
              width: '100%',
              padding: '14px',
              background: loading || !password || password !== confirmPassword ? '#cbd5e1' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading || !password || password !== confirmPassword ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: loading || !password || password !== confirmPassword ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-check-circle"></i>
                Complete Registration
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{ 
          marginTop: '24px', 
          textAlign: 'center',
          paddingTop: '24px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            Already have an account?{' '}
            <a 
              href="/admin" 
              style={{ 
                color: '#6366f1', 
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
          }
      `}</style>
    </div>
  );
};

export default AdminRegister;
