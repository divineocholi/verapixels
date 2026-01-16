import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

interface AdminData {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  last_login: string | null;
}

const SimpleSuperadminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'admins' | 'analytics' | 'settings'>('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('admin-theme') as 'light' | 'dark' || 'light';
  });

  // Load admin data
  useEffect(() => {
    const loadAdminData = async () => {
      const adminData = localStorage.getItem('admin_data');
      if (!adminData) {
        navigate('/superadmin/login');
        return;
      }

      try {
        const parsedData = JSON.parse(adminData);
        setAdmin(parsedData);
      } catch (error) {
        console.error('Error loading admin data:', error);
        navigate('/superadmin/login');
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_data');
    navigate('/superadmin/login');
  };

  // Mock analytics data
  const mockAnalytics = useMemo(() => ({
    totalVisits: 15234,
    visitsToday: 234,
    totalBookings: 89,
    pendingBookings: 12,
    totalConversations: 156,
    unreadConversations: 8,
    totalSubscribers: 567,
    totalAdmins: 3,
    activeAdmins: 2,
  }), []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
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
          <p style={{ color: '#666' }}>Loading dashboard...</p>
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

  const colors = {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
    light: '#f8fafc',
    dark: '#1e293b'
  };

  const styles = {
    background: theme === 'dark' ? colors.dark : colors.light,
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    cardBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    mutedText: theme === 'dark' ? '#94a3b8' : '#64748b',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: styles.background,
      color: styles.text,
      fontFamily: "'Inter', sans-serif",
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: theme === 'dark' ? '#0f172a' : '#f8fafc',
        borderRight: `1px solid ${styles.border}`,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px'
            }}>
              <i className="fas fa-shield-alt"></i>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '16px' }}>Verapixel Admin</div>
              <div style={{ fontSize: '12px', color: colors.primary }}>
                {admin?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </div>
            </div>
          </div>

          <div style={{
            padding: '10px',
            background: theme === 'dark' ? '#2d3748' : '#f1f5f9',
            borderRadius: '8px',
            fontSize: '13px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-user" style={{ color: colors.primary }}></i>
              <span style={{ fontWeight: 500 }}>{admin?.name}</span>
            </div>
            <div style={{ fontSize: '11px', color: styles.mutedText, marginTop: '4px' }}>
              {admin?.email}
            </div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: 'overview', icon: 'fas fa-chart-line', label: 'Overview' },
            { id: 'admins', icon: 'fas fa-users', label: 'Admin Management' },
            { id: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
            { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                marginBottom: '8px',
                border: 'none',
                background: activeTab === item.id 
                  ? theme === 'dark' ? '#3730a3' : '#e0e7ff' 
                  : 'transparent',
                color: activeTab === item.id ? colors.primary : styles.text,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s'
              }}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: `1px solid ${styles.border}` }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              background: theme === 'dark' ? '#2d3748' : '#f1f5f9',
              border: `1px solid ${styles.border}`,
              color: styles.text,
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'center'
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Header */}
        <div style={{
          padding: '20px 30px',
          borderBottom: `1px solid ${styles.border}`,
          background: styles.cardBg,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600 }}>
            {activeTab === 'overview' ? 'Dashboard Overview' :
             activeTab === 'admins' ? 'Admin Management' :
             activeTab === 'analytics' ? 'Analytics' : 'Settings'}
          </h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              padding: '6px 12px',
              background: theme === 'dark' ? '#2d3748' : '#f1f5f9',
              borderRadius: '20px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <i className="fas fa-user-shield"></i>
              {admin?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
            </div>
            
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              style={{
                padding: '8px 12px',
                background: theme === 'dark' ? '#2d3748' : '#f1f5f9',
                border: `1px solid ${styles.border}`,
                borderRadius: '8px',
                color: styles.text,
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              <i className={theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'}></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                {[
                  { 
                    title: 'Total Visits', 
                    value: mockAnalytics.totalVisits.toLocaleString(),
                    icon: 'fas fa-eye',
                    color: colors.primary
                  },
                  { 
                    title: 'Pending Bookings', 
                    value: mockAnalytics.pendingBookings,
                    icon: 'fas fa-calendar-check',
                    color: colors.success
                  },
                  { 
                    title: 'Unread Messages', 
                    value: mockAnalytics.unreadConversations,
                    icon: 'fas fa-envelope',
                    color: colors.warning
                  },
                  { 
                    title: 'Total Subscribers', 
                    value: mockAnalytics.totalSubscribers,
                    icon: 'fas fa-users',
                    color: colors.info
                  }
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      background: styles.cardBg,
                      borderRadius: '12px',
                      padding: '24px',
                      border: `1px solid ${styles.border}`,
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '14px', color: styles.mutedText, marginBottom: '8px' }}>
                          {stat.title}
                        </div>
                        <div style={{ fontSize: '32px', fontWeight: 700, color: styles.text }}>
                          {stat.value}
                        </div>
                      </div>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `${stat.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: stat.color,
                        fontSize: '20px'
                      }}>
                        <i className={stat.icon}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Welcome Message */}
              <div style={{
                background: styles.cardBg,
                borderRadius: '12px',
                padding: '40px',
                border: `1px solid ${styles.border}`,
                textAlign: 'center',
                marginBottom: '30px'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px' }}>
                  Welcome to Verapixel Admin!
                </h2>
                <p style={{ color: styles.mutedText, fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
                  You have successfully logged in as a Super Admin. You now have full access to manage the website, analytics, and admin accounts.
                </p>
                <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                  <button style={{
                    padding: '12px 24px',
                    background: colors.primary,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}>
                    <i className="fas fa-cog"></i> Configure Settings
                  </button>
                  <button style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: `1px solid ${styles.border}`,
                    color: styles.text,
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>
                    <i className="fas fa-book"></i> View Documentation
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'admins' && (
            <div style={{
              background: styles.cardBg,
              borderRadius: '12px',
              padding: '30px',
              border: `1px solid ${styles.border}`
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
                Admin Management
              </h2>
              <p style={{ color: styles.mutedText }}>
                Admin management features will be available soon.
              </p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={{
              background: styles.cardBg,
              borderRadius: '12px',
              padding: '30px',
              border: `1px solid ${styles.border}`,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>
                System Settings
              </h2>
              <p style={{ color: styles.mutedText, marginBottom: '30px' }}>
                Configure your website settings here.
              </p>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 500,
                  color: styles.text
                }}>
                  Website Name
                </label>
                <input
                  type="text"
                  defaultValue="Verapixel"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${styles.border}`,
                    borderRadius: '8px',
                    background: styles.background,
                    color: styles.text,
                    fontSize: '14px'
                  }}
                />
              </div>

              <button
                style={{
                  padding: '12px 24px',
                  background: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Font Awesome */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default SimpleSuperadminDashboard;