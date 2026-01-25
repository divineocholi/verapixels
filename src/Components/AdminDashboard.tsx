// AdminDashboard.tsx - COMPLETE WORKING VERSION WITH ALL FIXES
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from './supabase';
import emailjs from '@emailjs/browser';
import {
  FiPhone,
  FiVideo,
  FiMail,
  FiCalendar,
  FiClock,
  FiUser,
  FiMessageCircle,
  FiCheckCircle,
  FiSend,
  FiX,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiBell,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiHome,
  FiMoon,
  FiSun,
  FiBook,
  FiUpload,
  FiInfo,
  FiRefreshCw,
  FiEye,
  FiFilter,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiGlobe,
  FiCheck,
  FiAlertCircle,
  FiInbox,
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiLock,
  FiLogIn,
  FiMenu
} from 'react-icons/fi';
import io, { Socket } from 'socket.io-client';

// ========== CONFIGURATION ==========
const EMAILJS_CONFIG = {
  serviceId: 'service_w8wwd8e',
  publicKey: 'NUKm-dvMLR7ftwvbF',
  adminTemplateId: 'template_503vbvj',
  userTemplateId: 'template_6zgl8ml'
};

const BUSINESS_TIMEZONE = 'Africa/Lagos';

const TIMEZONES = [
  'Africa/Lagos', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
  'Europe/Paris', 'Asia/Tokyo', 'Asia/Singapore', 'Australia/Sydney'
];

const SOCKET_URL = import.meta.env.PROD
  ? 'https://verapixels-server.onrender.com'
  : 'http://localhost:5001';
  
const CONTACT_METHODS = [
  { id: 'video', label: 'Video Call', icon: <FiVideo />, color: '#0063f4' },
  { id: 'audio', label: 'Audio Call', icon: <FiPhone />, color: '#00bfff' },
  { id: 'phone', label: 'Phone Call', icon: <FiPhone />, color: '#ff6b9d' },
  { id: 'whatsapp', label: 'WhatsApp', icon: <FiMessageCircle />, color: '#25D366' },
  { id: 'zoom', label: 'Zoom Call', icon: <FiVideo />, color: '#2D8CFF' },
  { id: 'google-meet', label: 'Google Meet', icon: <FiVideo />, color: '#4285F4' }
];

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM'
];

// ========== TYPES ==========
interface Conversation {
  id: string;
  conversation_id: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  user_timezone: string;
  status: 'active' | 'inactive' | 'awaiting_admin' | 'admin_handling' | 'resolved';
  is_admin_takeover: boolean;
  started_at: string;
  last_activity: string;
  admin_id?: string;
  transfer_reason?: string;
  has_user_message: boolean;
  last_message?: string;
  unread_count: number;
  is_complex: boolean;
}

interface Message {
  id?: string;
  message_id: string;
  conversation_id: string;
  sender_type: 'user' | 'bot' | 'admin';
  sender_name: string;
  message_text: string;
  timestamp: string;
  read_by_admin: boolean;
  read_by_user: boolean;
}

interface Notification {
  id: string;
  notification_id: string;
  conversation_id?: string;
  consultation_id?: string;
  notification_type: string;
  message_preview: string;
  reason?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'acknowledged' | 'resolved';
  created_at: string;
}

interface AdminData {
  id: string;
  auth_user_id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  last_login: string | null;
  profile_picture_url?: string;
  settings?: {
    theme?: 'light' | 'dark';
    notifications?: boolean;
    email_notifications?: boolean;
    timezone?: string;
  };
}

interface Consultation {
  id: string;
  consultation_id: string;
  name: string;
  email: string;
  phone: string;
  contact_method: string;
  booking_date: string;
  booking_time: string;
  user_timezone: string;
  business_time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'finished' | 'replied';
  created_at: string;
  updated_at: string;
  admin_notes?: string;
  admin_reply_sent: boolean;
  reply_timestamp?: string;
  assigned_admin_id?: string;
  is_complex: boolean;
  booked_by: 'user' | 'admin' | 'chatbot';
}

interface AdminNote {
  id: string;
  note_id: string;
  admin_id: string;
  title: string;
  content: string;
  color: string;
  font_style: string;
  font_size: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

interface AnalyticsData {
  id: string;
  admin_id: string;
  session_id: string;
  consultation_id?: string;
  start_time: string;
  end_time?: string;
  duration_seconds?: number;
  activity_type: 'admin' | 'consultation' | 'chat' | 'email';
  created_at: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  contact_method: string;
  booking_date: string;
  booking_time: string;
  user_timezone: string;
  message: string;
  business_time: string;
  status: 'pending';
  booked_by: 'admin';
}

interface LoginFormData {
  email: string;
  password: string;
}

// ========== LOGIN COMPONENT ==========
const LoginComponent: React.FC<{
  onLogin: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
}> = ({ onLogin }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const result = await onLogin(formData.email, formData.password);
      if (result.success) {
        setMessage(result.message);
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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
        borderRadius: '20px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'white',
            fontSize: '32px'
          }}>
            <FiLock />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Verapixels Administration Portal
          </p>
        </div>

        {error && (
          <div style={{
            padding: '12px',
            background: '#fee',
            border: '1px solid #f99',
            borderRadius: '8px',
            color: '#c00',
            fontSize: '14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FiAlertCircle />
            {error}
          </div>
        )}

        {message && (
          <div style={{
            padding: '12px',
            background: '#e8f8ef',
            border: '1px solid #a3e9c4',
            borderRadius: '8px',
            color: '#0a8',
            fontSize: '14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FiCheckCircle />
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#555', fontWeight: '500' }}>
              <FiMail style={{ marginRight: '8px' }} />
              Admin Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter admin email"
              style={{
                width: '100%',
                color: '#333',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#555', fontWeight: '500' }}>
              <FiLock style={{ marginRight: '8px' }} />
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: loading ? '#aaa' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '10px',
              color: 'black',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
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
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Authenticating...
              </>
            ) : (
              <>
                <FiLogIn />
                Login to Dashboard
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#999' }}>
            For security reasons, please use your admin credentials provided by Verapixels
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ========== TOP NAVIGATION COMPONENT ==========
const TopNavigation: React.FC<{
  activeSection: string;
  setActiveSection: (section: any) => void;
  theme: 'light' | 'dark';
  adminData: AdminData | null;
  unreadNotifications: number;
  unreadChats: number;
}> = ({ activeSection, setActiveSection, theme, adminData, unreadNotifications, unreadChats }) => {
  const styles = {
    background: theme === 'dark' ? '#1e293b' : '#ffffff',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    primary: '#6366f1',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
  };

  const navItems = [
    { id: 'dashboard', icon: <FiHome />, label: 'Dashboard' },
    { id: 'conversations', icon: <FiMessageCircle />, label: `Live Chats ${unreadChats > 0 ? `(${unreadChats})` : ''}` },
    { id: 'consultations', icon: <FiCalendar />, label: 'Consultations' },
    { id: 'notifications', icon: <FiBell />, label: `Notifications ${unreadNotifications > 0 ? `(${unreadNotifications})` : ''}` },
    { id: 'analytics', icon: <FiBarChart2 />, label: 'Analytics' },
    { id: 'notes', icon: <FiBook />, label: 'Notes' },
    { id: 'settings', icon: <FiSettings />, label: 'Settings' },
  ];

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: styles.background,
      borderBottom: `1px solid ${styles.border}`,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      padding: '0 20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Logo and Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: `linear-gradient(135deg, ${styles.primary}, #8b5cf6)`,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            V
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: styles.text }}>
              Admin Dashboard
            </h1>
            <p style={{ margin: 0, fontSize: '12px', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
              {adminData?.name || 'Admin'} • {adminData?.role || 'Admin'}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ display: 'flex', gap: '5px' }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                padding: '10px 20px',
                background: activeSection === item.id ? styles.primary : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: activeSection === item.id ? 'white' : styles.text,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.background = styles.hoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => setActiveSection('settings')}
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: adminData?.profile_picture_url ? `url(${adminData.profile_picture_url})` : `linear-gradient(135deg, ${styles.primary}, #8b5cf6)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: 'none',
              cursor: 'pointer',
              overflow: 'hidden',
              padding: 0,
              position: 'relative'
            }}
            title="Settings"
          >
            {!adminData?.profile_picture_url && (
              <div style={{ 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                {adminData?.name?.charAt(0) || 'A'}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== UTILITY COMPONENTS ==========
const CustomAlert: React.FC<{
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  theme: 'light' | 'dark';
}> = ({ type, message, onClose, theme }) => {
  const styles = {
    background: theme === 'dark' ? '#1e293b' : '#ffffff',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
  };

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
          border: '#10b981',
          icon: <FiCheckCircle style={{ color: '#10b981' }} />
        };
      case 'error':
        return {
          bg: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
          border: '#ef4444',
          icon: <FiAlertCircle style={{ color: '#ef4444' }} />
        };
      case 'warning':
        return {
          bg: theme === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.1)',
          border: '#f59e0b',
          icon: <FiAlertCircle style={{ color: '#f59e0b' }} />
        };
      case 'info':
        return {
          bg: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
          border: '#3b82f6',
          icon: <FiAlertCircle style={{ color: '#3b82f6' }} />
        };
      default:
        return {
          bg: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
          border: '#3b82f6',
          icon: <FiAlertCircle style={{ color: '#3b82f6' }} />
        };
    }
  };

  const alertStyles = getAlertStyles();

  return (
    <div style={{
      padding: '16px 20px',
      background: alertStyles.bg,
      border: `2px solid ${alertStyles.border}`,
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
      animation: 'slideDown 0.3s ease',
      position: 'relative'
    }}>
      <div style={{ fontSize: '20px' }}>
        {alertStyles.icon}
      </div>
      <div style={{ flex: 1, fontSize: '14px', color: styles.text }}>
        {message}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: styles.text,
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <FiX />
        </button>
      )}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// ========== NOTIFICATIONS COMPONENT ==========
const NotificationsComponent: React.FC<{
  notifications: Notification[];
  theme: 'light' | 'dark';
  onMarkAsRead: (notificationId: string) => Promise<void>;
  onMarkAllAsRead: () => Promise<void>;
}> = ({ notifications, theme, onMarkAsRead, onMarkAllAsRead }) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(false);

  const styles = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    cardBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
    mutedText: theme === 'dark' ? '#94a3b8' : '#64748b',
    primary: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return styles.danger;
      case 'high': return styles.warning;
      case 'medium': return styles.info;
      case 'low': return styles.success;
      default: return styles.mutedText;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <FiAlertCircle style={{ color: styles.danger }} />;
      case 'high': return <FiAlertCircle style={{ color: styles.warning }} />;
      case 'medium': return <FiInfo style={{ color: styles.info }} />;
      case 'low': return <FiCheckCircle style={{ color: styles.success }} />;
      default: return <FiBell style={{ color: styles.mutedText }} />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return notif.status === 'pending';
    if (filter === 'high') return notif.priority === 'high' || notif.priority === 'urgent';
    return true;
  });

  const unreadCount = notifications.filter(n => n.status === 'pending').length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' || n.priority === 'urgent').length;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: styles.text }}>
            <FiBell style={{ marginRight: '10px', color: styles.primary }} />
            Notifications
            {unreadCount > 0 && (
              <span style={{
                marginLeft: '10px',
                background: styles.danger,
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '2px 8px',
                borderRadius: '12px',
                verticalAlign: 'middle'
              }}>
                {unreadCount}
              </span>
            )}
          </h1>
          <button
            onClick={onMarkAllAsRead}
            disabled={unreadCount === 0 || loading}
            style={{
              padding: '10px 20px',
              background: unreadCount === 0 ? styles.mutedText : styles.primary,
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              cursor: unreadCount === 0 || loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiCheckCircle />
            Mark All as Read
          </button>
        </div>
        <p style={{ color: styles.mutedText, fontSize: '16px' }}>
          System alerts and important updates
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: styles.primary }}>
            {notifications.length}
          </div>
          <div style={{ fontSize: '14px', color: styles.mutedText }}>Total</div>
        </div>
        <div style={{
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: styles.warning }}>
            {unreadCount}
          </div>
          <div style={{ fontSize: '14px', color: styles.mutedText }}>Unread</div>
        </div>
        <div style={{
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: styles.danger }}>
            {highPriorityCount}
          </div>
          <div style={{ fontSize: '14px', color: styles.mutedText }}>High Priority</div>
        </div>
        <div style={{
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: styles.success }}>
            {notifications.filter(n => n.status === 'resolved').length}
          </div>
          <div style={{ fontSize: '14px', color: styles.mutedText }}>Resolved</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: styles.cardBg,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        border: `1px solid ${styles.border}`
      }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '10px 20px',
              background: filter === 'all' ? styles.primary : styles.background,
              border: `1px solid ${styles.border}`,
              borderRadius: '8px',
              color: filter === 'all' ? 'white' : styles.text,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiBell />
            All Notifications
          </button>
          <button
            onClick={() => setFilter('unread')}
            style={{
              padding: '10px 20px',
              background: filter === 'unread' ? styles.warning : styles.background,
              border: `1px solid ${styles.border}`,
              borderRadius: '8px',
              color: filter === 'unread' ? 'white' : styles.text,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiBell />
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('high')}
            style={{
              padding: '10px 20px',
              background: filter === 'high' ? styles.danger : styles.background,
              border: `1px solid ${styles.border}`,
              borderRadius: '8px',
              color: filter === 'high' ? 'white' : styles.text,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiAlertCircle />
            High Priority ({highPriorityCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div style={{
        background: styles.cardBg,
        borderRadius: '12px',
        border: `1px solid ${styles.border}`,
        overflow: 'hidden'
      }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: styles.mutedText }}>
            <FiBell style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }} />
            <p style={{ fontSize: '18px', marginBottom: '10px' }}>No notifications found</p>
            <p style={{ fontSize: '14px' }}>You're all caught up!</p>
          </div>
        ) : (
          <div>
            {filteredNotifications.map((notification, index) => (
              <div
                key={notification.id}
                style={{
                  padding: '20px',
                  borderBottom: index < filteredNotifications.length - 1 ? `1px solid ${styles.border}` : 'none',
                  background: notification.status === 'pending' ? styles.hoverBg : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onClick={() => {
                  setSelectedNotification(notification);
                  if (notification.status === 'pending') {
                    onMarkAsRead(notification.notification_id);
                  }
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = styles.hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = notification.status === 'pending' ? styles.hoverBg : 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{
                    padding: '8px',
                    background: getPriorityColor(notification.priority) + '20',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getPriorityIcon(notification.priority)}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <span style={{
                          fontSize: '16px',
                          fontWeight: 600,
                          color: styles.text,
                          marginRight: '10px'
                        }}>
                          {notification.notification_type}
                        </span>
                        <span style={{
                          padding: '4px 8px',
                          background: getPriorityColor(notification.priority) + '20',
                          color: getPriorityColor(notification.priority),
                          fontSize: '12px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}>
                          {notification.priority.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: styles.mutedText }}>
                        {formatTime(notification.created_at)}
                      </div>
                    </div>
                    
                    <div style={{ fontSize: '14px', color: styles.text, marginBottom: '8px' }}>
                      {notification.message_preview}
                    </div>
                    
                    {notification.reason && (
                      <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '8px' }}>
                        <strong>Reason:</strong> {notification.reason}
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{
                        padding: '4px 8px',
                        background: notification.status === 'pending' ? styles.warning + '20' : styles.success + '20',
                        color: notification.status === 'pending' ? styles.warning : styles.success,
                        fontSize: '12px',
                        borderRadius: '4px',
                        fontWeight: 600
                      }}>
                        {notification.status.toUpperCase()}
                      </span>
                      
                      {notification.status === 'pending' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsRead(notification.notification_id);
                          }}
                          style={{
                            padding: '6px 12px',
                            background: styles.primary,
                            border: 'none',
                            borderRadius: '6px',
                            color: 'white',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <FiCheckCircle />
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ========== DASHBOARD CARDS COMPONENT ==========
interface DashboardCardsProps {
  unreadChats: number;
  pendingConsultations: number;
  unreadNotifications: number;
  activeConversations: number;
  onCardClick: (section: "dashboard" | "consultations" | "conversations" | "notifications" | "analytics" | "settings" | "notes") => void;
  theme: 'light' | 'dark';
  onBookConsultation: () => void;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ 
  unreadChats, 
  pendingConsultations, 
  unreadNotifications, 
  activeConversations,
  onCardClick, 
  theme, 
  onBookConsultation 
}) => {
  const styles = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    cardBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
    mutedText: theme === 'dark' ? '#94a3b8' : '#64748b',
    primary: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const cards = [
    {
      id: 'book',
      title: 'Book Consultation',
      description: 'Schedule new consultation',
      icon: 'fas fa-calendar-plus',
      color: styles.success,
      count: 0,
      countLabel: 'new',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      onClick: onBookConsultation
    },
    {
      id: 'conversations',
      title: 'Live Chats',
      description: 'Active conversations',
      icon: 'fas fa-comments',
      color: styles.primary,
      count: unreadChats,
      countLabel: 'unread',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      onClick: () => onCardClick('conversations')
    },
    {
      id: 'consultations',
      title: 'Consultations',
      description: 'Manage bookings',
      icon: 'fas fa-calendar-check',
      color: styles.warning,
      count: pendingConsultations,
      countLabel: 'pending',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      onClick: () => onCardClick('consultations')
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'System alerts',
      icon: 'fas fa-bell',
      color: styles.danger,
      count: unreadNotifications,
      countLabel: 'unread',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
      onClick: () => onCardClick('notifications')
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View statistics',
      icon: 'fas fa-chart-line',
      color: '#00bfff',
      count: activeConversations,
      countLabel: 'active',
      gradient: 'linear-gradient(135deg, #00bfff 0%, #0080ff 100%)',
      onClick: () => onCardClick('analytics')
    },
    {
      id: 'notes',
      title: 'Personal Notes',
      description: 'Private notes',
      icon: 'fas fa-book',
      color: '#8b5cf6',
      count: 0,
      countLabel: 'private',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      onClick: () => onCardClick('notes')
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'System configuration',
      icon: 'fas fa-cog',
      color: styles.mutedText,
      count: 0,
      countLabel: 'configure',
      gradient: 'linear-gradient(135deg, #64748b 0%, #94a3b8 100%)',
      onClick: () => onCardClick('settings')
    },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', color: styles.text }}>
          Admin Dashboard
        </h1>
        <p style={{ color: styles.mutedText, fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Welcome back! Manage your consultations, chats, and system notifications.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={card.onClick}
            style={{
              background: styles.cardBg,
              borderRadius: '20px',
              padding: '24px',
              cursor: 'pointer',
              border: `1px solid ${styles.border}`,
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}
          >
            {card.count > 0 && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: card.color,
                color: 'white',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                zIndex: 2,
                animation: card.id === 'notifications' || card.id === 'conversations' ? 'pulse 2s infinite' : 'none',
              }}>
                {card.count > 99 ? '99+' : card.count}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: card.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                color: 'white',
                fontSize: '24px',
                flexShrink: 0,
              }}>
                <i className={card.icon}></i>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: styles.text, marginBottom: '4px' }}>
                  {card.title}
                </h3>
                <p style={{ margin: 0, fontSize: '14px', color: styles.mutedText }}>
                  {card.description}
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '16px',
              borderTop: `1px solid ${styles.border}`,
            }}>
              <span style={{ fontSize: '13px', color: styles.mutedText, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fas fa-circle" style={{ fontSize: '8px', color: card.color }}></i>
                {card.countLabel}
              </span>
              <div style={{ fontSize: '28px', fontWeight: '700', color: card.count > 0 ? card.color : styles.mutedText, lineHeight: 1 }}>
                {card.count}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
      
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />
    </div>
  );
};

// ========== BOOKING MODAL COMPONENT ==========
const BookingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onSubmit: (bookingData: Consultation) => Promise<void>;
}> = ({ isOpen, onClose, theme, onSubmit }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    contact_method: 'Video Call',
    booking_date: '',
    booking_time: TIME_SLOTS[0],
    user_timezone: TIMEZONES[0],
    message: '',
    business_time: '',
    status: 'pending',
    booked_by: 'admin',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const styles = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    cardBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
    mutedText: theme === 'dark' ? '#94a3b8' : '#64748b',
    primary: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.booking_date) {
        setBookedSlots([]);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select('booking_time')
          .eq('booking_date', formData.booking_date)
          .in('status', ['confirmed', 'pending']);
        
        if (error) throw error;
        
        const bookedTimes = data?.map(item => item.booking_time) || [];
        setBookedSlots(bookedTimes);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
        setBookedSlots([]);
      }
    };
    
    fetchBookedSlots();
  }, [formData.booking_date]);

  const isTimeBooked = (time: string) => bookedSlots.includes(time);

  useEffect(() => {
    if (formData.booking_time && formData.user_timezone) {
      try {
        const userTime = new Date(`2000-01-01T${formData.booking_time}`);
        const businessTime = new Date(userTime.toLocaleString('en-US', {
          timeZone: BUSINESS_TIMEZONE
        }));
        
        const hours = businessTime.getHours();
        const minutes = businessTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        
        setFormData(prev => ({
          ...prev,
          business_time: `${formattedHours}:${formattedMinutes} ${ampm}`
        }));
      } catch (error) {
        console.error('Error calculating business time:', error);
      }
    }
  }, [formData.booking_time, formData.user_timezone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { data: existingBookings, error: bookingError } = await supabase
        .from('consultations')
        .select('*')
        .eq('booking_date', formData.booking_date)
        .eq('booking_time', formData.booking_time)
        .in('status', ['confirmed', 'pending']);

      if (bookingError) {
        console.error('Error checking bookings:', bookingError);
        throw new Error('Failed to check availability. Please try again.');
      }

      if (existingBookings && existingBookings.length > 0) {
        throw new Error('This time slot is already booked! Please choose another time.');
      }

      const consultationId = `CONS_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const bookingData: Consultation = {
        id: '',
        consultation_id: consultationId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        contact_method: formData.contact_method,
        booking_date: formData.booking_date,
        booking_time: formData.booking_time,
        user_timezone: formData.user_timezone,
        business_time: formData.business_time || '',
        message: formData.message,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        admin_notes: '',
        admin_reply_sent: false,
        assigned_admin_id: undefined,
        is_complex: false,
        reply_timestamp: undefined,
        booked_by: 'admin'
      };

      await onSubmit(bookingData);
      setSuccess(true);
      
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          contact_method: 'Video Call',
          booking_date: '',
          booking_time: TIME_SLOTS[0],
          user_timezone: TIMEZONES[0],
          message: '',
          business_time: '',
          status: 'pending',
          booked_by: 'admin',
        });
        onClose();
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Failed to book consultation');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        background: styles.cardBg,
        borderRadius: '16px',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: `1px solid ${styles.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: styles.text }}>
            <FiCalendar style={{ marginRight: '10px', color: styles.primary }} />
            Book New Consultation
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: styles.mutedText,
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px'
            }}
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          {error && (
            <CustomAlert
              type="error"
              message={error}
              theme={theme}
              onClose={() => setError(null)}
            />
          )}

          {success && (
            <CustomAlert
              type="success"
              message="Consultation booked successfully! Sending confirmation email..."
              theme={theme}
            />
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                <FiUser style={{ marginRight: '6px' }} />
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px'
                }}
                placeholder="Enter customer name"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                <FiMail style={{ marginRight: '6px' }} />
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px'
                }}
                placeholder="Enter customer email"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                <FiPhone style={{ marginRight: '6px' }} />
                Phone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px'
                }}
                placeholder="Enter customer phone number"
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                <FiVideo style={{ marginRight: '6px' }} />
                Contact Method *
              </label>
              <select
                value={formData.contact_method}
                onChange={(e) => setFormData({ ...formData, contact_method: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px'
                }}
              >
                {CONTACT_METHODS.map(method => (
                  <option key={method.id} value={method.label}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                <FiCalendar style={{ marginRight: '6px' }} />
                Booking Date *
              </label>
              <input
                type="date"
                required
                value={formData.booking_date}
                onChange={(e) => setFormData({ ...formData, booking_date: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px'
                }}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                <FiClock style={{ marginRight: '6px' }} />
                Booking Time *
              </label>
              <select
                value={formData.booking_time}
                onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px'
                }}
              >
                {TIME_SLOTS.map(time => (
                  <option key={time} value={time} style={{ 
                    color: isTimeBooked(time) ? styles.danger : styles.text,
                    background: isTimeBooked(time) ? styles.danger + '10' : 'transparent'
                  }}>
                    {time} {isTimeBooked(time) ? '(Booked)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                <FiGlobe style={{ marginRight: '6px' }} />
                Customer Timezone *
              </label>
              <select
                value={formData.user_timezone}
                onChange={(e) => setFormData({ ...formData, user_timezone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px'
                }}
              >
                {TIMEZONES.map(tz => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                <FiClock style={{ marginRight: '6px' }} />
                Business Time (Lagos)
              </label>
              <input
                type="text"
                readOnly
                value={formData.business_time || 'Calculating...'}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.mutedText,
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
              <FiMessageCircle style={{ marginRight: '6px' }} />
              Additional Message (Optional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                background: styles.background,
                border: `1px solid ${styles.border}`,
                borderRadius: '8px',
                color: styles.text,
                fontSize: '14px',
                resize: 'vertical'
              }}
              placeholder="Any additional notes for the customer..."
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: `1px solid ${styles.border}`,
                borderRadius: '8px',
                color: styles.text,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.booking_date}
              style={{
                padding: '12px 24px',
                background: isSubmitting ? styles.mutedText : styles.success,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isSubmitting ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Booking...
                </>
              ) : (
                <>
                  <FiCalendar />
                  Book Consultation
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ========== LIVE CHATS COMPONENT ==========
interface LiveChatsComponentProps {
  conversations: Conversation[];
  theme: 'light' | 'dark';
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversation: Conversation | null;
  adminData: AdminData | null;
  socket: Socket | null;
  isSocketConnected: boolean;
}

const LiveChatsComponent: React.FC<LiveChatsComponentProps> = ({ 
  conversations, 
  theme, 
  onSelectConversation, 
  selectedConversation,
  adminData,
  socket,
  isSocketConnected
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'unread' | 'complex'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const styles = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    cardBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
    mutedText: theme === 'dark' ? '#94a3b8' : '#64748b',
    primary: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.conversation_id);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async (conversationId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
        return;
      }
      
      setMessages(data || []);
      
      await supabase
        .from('chat_messages')
        .update({ read_by_admin: true })
        .eq('conversation_id', conversationId)
        .eq('read_by_admin', false);
        
      await supabase
        .from('chat_conversations')
        .update({ unread_count: 0 })
        .eq('conversation_id', conversationId);
        
    } catch (error) {
      console.error('Error in fetchMessages:', error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const messageData = {
        conversationId: selectedConversation.conversation_id,
        message: newMessage,
        adminName: adminData?.name || 'Admin'
      };

      if (socket && socket.connected) {
        console.log('📤 Sending admin message via WebSocket');
        socket.emit('admin_message', messageData);
        socket.emit('send_message', {
          conversation_id: selectedConversation.conversation_id,
          message_text: newMessage,
          adminName: adminData?.name,
          sender: 'admin',
          messageType: 'text'
        });
      }

      const messageId = `admin_msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          message_id: messageId,
          conversation_id: selectedConversation.conversation_id,
          sender_type: 'admin',
          sender_name: adminData?.name || 'Admin',
          message_text: newMessage,
          timestamp: new Date().toISOString(),
          read_by_admin: true,
          read_by_user: false,
          intent_detected: 'admin_response',
          classification: 'ADMIN_RESPONSE'
        }]);

      if (error) throw error;

      setMessages(prev => [...prev, {
        id: messageId,
        message_id: messageId,
        conversation_id: selectedConversation.conversation_id,
        sender_type: 'admin',
        sender_name: adminData?.name || 'Admin',
        message_text: newMessage,
        timestamp: new Date().toISOString(),
        read_by_admin: true,
        read_by_user: false
      }]);
      
      setNewMessage('');

    } catch (error) {
      console.error('❌ Error sending admin message:', error);
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'active') return conv.status === 'active' && conv.is_complex;
    if (filter === 'unread') return conv.unread_count > 0 && conv.is_complex;
    if (filter === 'complex') return conv.is_complex;
    return conv.is_complex;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', minHeight: 'calc(100vh - 200px)' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px', color: styles.text }}>
          <FiMessageCircle style={{ marginRight: '10px', color: styles.primary }} />
          Live Chats (Complex Conversations Only)
        </h1>
        <p style={{ color: styles.mutedText, fontSize: '16px' }}>
          Only showing conversations that require admin assistance
        </p>
      </div>

      <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 200px)' }}>
        {/* Conversation List */}
        <div style={{
          flex: '0 0 350px',
          background: styles.cardBg,
          borderRadius: '12px',
          border: `1px solid ${styles.border}`,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div style={{ padding: '20px', borderBottom: `1px solid ${styles.border}` }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              {(['all', 'active', 'unread', 'complex'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '8px 16px',
                    background: filter === f ? styles.primary : styles.background,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '20px',
                    color: filter === f ? 'white' : styles.text,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ position: 'relative' }}>
              <FiSearch style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: styles.mutedText
              }} />
              <input
                type="text"
                placeholder="Search complex chats..."
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredConversations.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: styles.mutedText }}>
                <FiMessageCircle style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
                <p>No complex conversations found</p>
                <p style={{ fontSize: '14px', marginTop: '8px' }}>
                  Simple conversations are handled automatically by the chatbot
                </p>
              </div>
            ) : (
              filteredConversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv)}
                  style={{
                    padding: '15px',
                    borderBottom: `1px solid ${styles.border}`,
                    cursor: 'pointer',
                    background: selectedConversation?.id === conv.id ? styles.hoverBg : 'transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: styles.text }}>
                      {conv.user_name || 'Unknown User'}
                      {conv.is_complex && (
                        <span style={{
                          marginLeft: '8px',
                          padding: '2px 6px',
                          background: styles.warning + '20',
                          color: styles.warning,
                          fontSize: '10px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}>
                          COMPLEX
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: styles.mutedText }}>
                      {formatDate(conv.last_activity)}
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '8px' }}>
                    {conv.last_message || 'No messages yet'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      background: conv.status === 'active' ? styles.success + '20' : styles.warning + '20',
                      color: conv.status === 'active' ? styles.success : styles.warning,
                      fontSize: '11px',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {conv.status.toUpperCase()}
                    </span>
                    {conv.unread_count > 0 && (
                      <span style={{
                        background: styles.danger,
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {conv.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area - FIXED POSITIONING */}
        <div style={{
          flex: 1,
          background: styles.cardBg,
          borderRadius: '12px',
          border: `1px solid ${styles.border}`,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative'
        }}>
          {selectedConversation ? (
            <>
              {/* Chat Header - Fixed at top */}
              <div style={{
                padding: '20px',
                borderBottom: `1px solid ${styles.border}`,
                background: styles.hoverBg,
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: styles.text, marginBottom: '4px' }}>
                      {selectedConversation.user_name || 'Unknown User'}
                      {selectedConversation.is_complex && (
                        <span style={{
                          marginLeft: '8px',
                          padding: '4px 8px',
                          background: styles.warning + '20',
                          color: styles.warning,
                          fontSize: '12px',
                          borderRadius: '4px',
                          fontWeight: 600
                        }}>
                          REQUIRES ADMIN
                        </span>
                      )}
                    </h3>
                    <div style={{ fontSize: '13px', color: styles.mutedText }}>
                      {selectedConversation.user_email || 'No email provided'} • {selectedConversation.user_timezone}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      padding: '6px 12px',
                      background: selectedConversation.status === 'active' ? styles.success + '20' : styles.warning + '20',
                      color: selectedConversation.status === 'active' ? styles.success : styles.warning,
                      fontSize: '12px',
                      borderRadius: '20px',
                      fontWeight: 600
                    }}>
                      {selectedConversation.status.toUpperCase()}
                    </span>
                    <button
                      onClick={async () => {
                        try {
                          await supabase
                            .from('chat_conversations')
                            .update({ status: 'resolved' })
                            .eq('conversation_id', selectedConversation.conversation_id);
                          
                          onSelectConversation({...selectedConversation, status: 'resolved'});
                        } catch (error) {
                          console.error('Error resolving conversation:', error);
                        }
                      }}
                      style={{
                        padding: '8px 16px',
                        background: styles.primary,
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FiCheckCircle />
                      Resolve
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Container - Scrollable */}
              <div style={{ 
                flex: 1, 
                padding: '20px', 
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {isLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      border: '3px solid #f3f3f3',
                      borderTop: `3px solid ${styles.primary}`,
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto'
                    }} />
                  </div>
                ) : messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: styles.mutedText, marginTop: '40px' }}>
                    <FiMessageCircle style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {messages.map((msg, index) => (
                      <div
                        key={msg.id || index}
                        style={{
                          marginBottom: '15px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: msg.sender_type === 'admin' ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <div style={{
                          maxWidth: '70%',
                          background: msg.sender_type === 'admin' ? styles.primary : styles.background,
                          color: msg.sender_type === 'admin' ? 'white' : styles.text,
                          padding: '12px 16px',
                          borderRadius: msg.sender_type === 'admin' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          fontSize: '14px',
                          lineHeight: 1.5
                        }}>
                          {msg.message_text}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: styles.mutedText,
                          marginTop: '4px',
                          marginLeft: msg.sender_type === 'admin' ? 0 : '10px',
                          marginRight: msg.sender_type === 'admin' ? '10px' : 0
                        }}>
                          {formatTime(msg.timestamp)}
                          {msg.sender_type !== 'admin' && ` • ${msg.sender_name}`}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Message Input - Fixed at bottom */}
              <div style={{
                padding: '20px',
                borderTop: `1px solid ${styles.border}`,
                background: styles.cardBg,
                position: 'sticky',
                bottom: 0,
                zIndex: 10,
                flexShrink: 0
              }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      background: styles.background,
                      border: `1px solid ${styles.border}`,
                      borderRadius: '24px',
                      color: styles.text,
                      fontSize: '14px'
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    style={{
                      padding: '12px 24px',
                      background: newMessage.trim() ? styles.primary : styles.mutedText,
                      border: 'none',
                      borderRadius: '24px',
                      color: 'white',
                      fontSize: '14px',
                      cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexShrink: 0
                    }}
                  >
                    <FiSend />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: styles.mutedText
            }}>
              <div style={{ textAlign: 'center' }}>
                <FiMessageCircle style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }} />
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>Select a complex conversation</p>
                <p style={{ fontSize: '14px' }}>Only conversations requiring admin assistance are shown here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ========== CONSULTATIONS MANAGEMENT ==========
const ConsultationsManagement: React.FC<{
  consultations: Consultation[];
  onUpdateConsultation: (consultationId: string, updates: Partial<Consultation>) => Promise<void>;
  onDeleteConsultation: (consultationId: string) => Promise<void>;
  theme: 'light' | 'dark';
  onBookConsultation: () => void;
}> = ({ consultations, onUpdateConsultation, onDeleteConsultation, theme, onBookConsultation }) => {
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Consultation>>({});

  const styles = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    cardBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
    mutedText: theme === 'dark' ? '#94a3b8' : '#64748b',
    primary: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return styles.warning;
      case 'confirmed': return styles.success;
      case 'cancelled': return styles.danger;
      case 'completed': return styles.info;
      case 'finished': return '#8b5cf6';
      case 'replied': return styles.primary;
      default: return styles.mutedText;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredConsultations = consultations
    .filter(consult => {
      const matchesStatus = statusFilter === 'all' || consult.status === statusFilter;
      const matchesSearch = searchTerm === '' || 
        consult.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consult.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consult.phone.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.booking_date + 'T' + a.booking_time).getTime();
          bValue = new Date(b.booking_date + 'T' + b.booking_time).getTime();
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = new Date(a.booking_date + 'T' + a.booking_time).getTime();
          bValue = new Date(b.booking_date + 'T' + b.booking_time).getTime();
      }
    
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleEdit = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setEditForm({
      status: consultation.status,
      admin_notes: consultation.admin_notes || ''
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (selectedConsultation && editForm) {
      await onUpdateConsultation(selectedConsultation.consultation_id, editForm);
      setIsEditing(false);
      setEditForm({});
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: styles.text }}>
            <FiCalendar style={{ marginRight: '10px', color: styles.primary }} />
            Consultations Management
          </h1>
          <button
            onClick={onBookConsultation}
            style={{
              padding: '12px 24px',
              background: styles.success,
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600
            }}
          >
            <FiPlus />
            Book New Consultation
          </button>
        </div>
        <p style={{ color: styles.mutedText, fontSize: '16px' }}>
          View, manage, and update customer consultations
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: styles.primary }}>
            {consultations.length}
          </div>
          <div style={{ fontSize: '14px', color: styles.mutedText }}>Total Bookings</div>
        </div>
        <div style={{
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: styles.warning }}>
            {consultations.filter(c => c.status === 'pending').length}
          </div>
          <div style={{ fontSize: '14px', color: styles.mutedText }}>Pending</div>
        </div>
        <div style={{
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: styles.success }}>
            {consultations.filter(c => c.status === 'confirmed').length}
          </div>
          <div style={{ fontSize: '14px', color: styles.mutedText }}>Confirmed</div>
        </div>
        <div style={{
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>
            {consultations.filter(c => c.status === 'finished').length}
          </div>
          <div style={{ fontSize: '14px', color: styles.mutedText }}>Finished</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        background: styles.cardBg,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        border: `1px solid ${styles.border}`
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
              <FiSearch style={{ marginRight: '8px' }} />
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, or phone..."
              style={{
                width: '100%',
                padding: '12px 16px',
                background: styles.background,
                border: `1px solid ${styles.border}`,
                borderRadius: '10px',
                color: styles.text,
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
              <FiFilter style={{ marginRight: '8px' }} />
              Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: styles.background,
                border: `1px solid ${styles.border}`,
                borderRadius: '10px',
                color: styles.text,
                fontSize: '14px'
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
              <option value="finished">Finished</option>
              <option value="replied">Replied</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
              <FiBarChart2 style={{ marginRight: '8px' }} />
              Sort By
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '10px',
                  color: styles.text,
                  fontSize: '14px'
                }}
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="status">Status</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                style={{
                  padding: '12px 16px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '10px',
                  color: styles.text,
                  cursor: 'pointer'
                }}
              >
                {sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Consultations Table */}
      <div style={{
        background: styles.cardBg,
        borderRadius: '12px',
        border: `1px solid ${styles.border}`,
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
          padding: '15px 20px',
          background: theme === 'dark' ? '#1e293b' : '#f8fafc',
          borderBottom: `1px solid ${styles.border}`,
          fontSize: '14px',
          fontWeight: 600,
          color: styles.text
        }}>
          <div>Customer</div>
          <div>Date & Time</div>
          <div>Contact Method</div>
          <div>Status</div>
          <div>Timezone</div>
          <div>Actions</div>
        </div>

        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {filteredConsultations.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: styles.mutedText }}>
              <FiCalendar style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
              <p style={{ fontSize: '16px', marginBottom: '8px' }}>No consultations found</p>
              <p style={{ fontSize: '14px' }}>Try adjusting your filters or create a new booking</p>
            </div>
          ) : (
            filteredConsultations.map(consultation => (
              <div
                key={consultation.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto',
                  padding: '15px 20px',
                  borderBottom: `1px solid ${styles.border}`,
                  alignItems: 'center',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  background: selectedConsultation?.id === consultation.id ? styles.hoverBg : 'transparent'
                }}
                onClick={() => setSelectedConsultation(consultation)}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: styles.text, marginBottom: '4px' }}>
                    {consultation.name}
                  </div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '2px' }}>
                    {consultation.email}
                  </div>
                  <div style={{ fontSize: '12px', color: styles.mutedText }}>
                    {consultation.phone}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '14px', color: styles.text, marginBottom: '4px' }}>
                    {formatDate(consultation.booking_date)}
                  </div>
                  <div style={{ fontSize: '13px', color: styles.mutedText }}>
                    {consultation.booking_time}
                  </div>
                </div>

                <div style={{ fontSize: '14px', color: styles.text }}>
                  {consultation.contact_method}
                </div>

                <div>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: getStatusColor(consultation.status) + '20',
                    color: getStatusColor(consultation.status)
                  }}>
                    {consultation.status.toUpperCase()}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: styles.mutedText }}>
                  {consultation.user_timezone}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      let newStatus: Consultation['status'] = 'confirmed';
                      if (consultation.status === 'confirmed') {
                        newStatus = 'finished';
                      } else if (consultation.status === 'finished') {
                        newStatus = 'confirmed';
                      }
                      onUpdateConsultation(consultation.consultation_id, { status: newStatus });
                    }}
                    style={{
                      padding: '6px 12px',
                      background: consultation.status === 'confirmed' ? styles.success : 
                                 consultation.status === 'finished' ? '#8b5cf6' : styles.background,
                      border: `1px solid ${consultation.status === 'confirmed' ? styles.success : 
                              consultation.status === 'finished' ? '#8b5cf6' : styles.primary}`,
                      borderRadius: '6px',
                      color: consultation.status === 'confirmed' ? 'white' : 
                             consultation.status === 'finished' ? 'white' : styles.primary,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <FiCheckCircle />
                    {consultation.status === 'confirmed' ? 'Mark as Finished' : 
                     consultation.status === 'finished' ? 'Finished' : 'Confirm'}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(consultation);
                    }}
                    style={{
                      padding: '6px 12px',
                      background: styles.background,
                      border: `1px solid ${styles.primary}`,
                      borderRadius: '6px',
                      color: styles.primary,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <FiEdit />
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Details Panel */}
      {selectedConsultation && (
        <div style={{
          marginTop: '30px',
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '25px',
          border: `1px solid ${styles.border}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: styles.text }}>
              Consultation Details
            </h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => onDeleteConsultation(selectedConsultation.consultation_id)}
                style={{
                  padding: '10px 16px',
                  background: styles.danger,
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: styles.text }}>
                Customer Information
              </h4>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Name</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: styles.text }}>{selectedConsultation.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Email</div>
                  <div style={{ fontSize: '15px', color: styles.text }}>{selectedConsultation.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Phone</div>
                  <div style={{ fontSize: '15px', color: styles.text }}>{selectedConsultation.phone}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: styles.text }}>
                Schedule Details
              </h4>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Date</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: styles.text }}>
                    {formatDate(selectedConsultation.booking_date)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Time</div>
                  <div style={{ fontSize: '15px', color: styles.text }}>
                    {selectedConsultation.booking_time} ({selectedConsultation.user_timezone})
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Business Time (Lagos)</div>
                  <div style={{ fontSize: '15px', color: styles.text }}>{selectedConsultation.business_time}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: styles.text }}>
                Contact & Status
              </h4>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Contact Method</div>
                  <div style={{ fontSize: '15px', color: styles.text }}>{selectedConsultation.contact_method}</div>
                </div>
                
                {isEditing ? (
                  <div>
                    <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Status</div>
                    <select
                      value={editForm.status || selectedConsultation.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: styles.background,
                        border: `1px solid ${styles.border}`,
                        borderRadius: '8px',
                        color: styles.text,
                        fontSize: '14px'
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                      <option value="finished">Finished</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Status</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        background: getStatusColor(selectedConsultation.status) + '20',
                        color: getStatusColor(selectedConsultation.status)
                      }}>
                        {selectedConsultation.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => setIsEditing(true)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: styles.primary,
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        <FiEdit />
                      </button>
                    </div>
                  </div>
                )}

                {isEditing && (
                  <div>
                    <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Admin Notes</div>
                    <textarea
                      value={editForm.admin_notes || selectedConsultation.admin_notes || ''}
                      onChange={(e) => setEditForm({ ...editForm, admin_notes: e.target.value })}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: styles.background,
                        border: `1px solid ${styles.border}`,
                        borderRadius: '8px',
                        color: styles.text,
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                      placeholder="Add admin notes..."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {selectedConsultation.message && (
            <div style={{ marginTop: '25px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: styles.text }}>
                Customer Message
              </h4>
              <div style={{
                padding: '15px',
                background: styles.background,
                border: `1px solid ${styles.border}`,
                borderRadius: '8px',
                fontSize: '14px',
                color: styles.text,
                lineHeight: 1.6
              }}>
                {selectedConsultation.message}
              </div>
            </div>
          )}

          {isEditing && (
            <div style={{ marginTop: '25px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                style={{
                  padding: '10px 20px',
                  background: styles.success,
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FiCheckCircle />
                Save Changes
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ========== ANALYTICS DASHBOARD COMPONENT ==========
const AnalyticsDashboard: React.FC<{
  theme: 'light' | 'dark';
  adminData: AdminData | null;
  consultations: Consultation[];
  conversations: Conversation[];
  analytics: AnalyticsData[];
}> = ({ theme, adminData, consultations, conversations, analytics }) => {
  const [timePeriod, setTimePeriod] = useState<'today' | 'week' | 'month' | 'year'>('today');
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    cardBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
    mutedText: theme === 'dark' ? '#94a3b8' : '#64748b',
    primary: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const calculateMetrics = () => {
    const now = new Date();
    let startDate: Date;

    switch (timePeriod) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    const periodConsultations = consultations.filter(c => 
      new Date(c.created_at) >= startDate
    );
    
    const periodConversations = conversations.filter(c => 
      new Date(c.started_at) >= startDate
    );
    
    const periodAnalytics = analytics.filter(a => 
      new Date(a.start_time) >= startDate
    );

    const hoursWorked = periodAnalytics.reduce((total, session) => {
      if (session.end_time && session.duration_seconds) {
        return total + (session.duration_seconds / 3600);
      }
      return total;
    }, 0);

    const activeSessions = periodAnalytics.filter(a => !a.end_time).length;
    const pendingConsultations = periodConsultations.filter(c => c.status === 'pending').length;
    const confirmedConsultations = periodConsultations.filter(c => c.status === 'confirmed').length;
    const completedConsultations = periodConsultations.filter(c => c.status === 'completed' || c.status === 'finished').length;
    const activeChats = periodConversations.filter(c => c.status === 'active' || c.status === 'awaiting_admin' || c.status === 'admin_handling').length;
    const resolvedChats = periodConversations.filter(c => c.status === 'resolved').length;
    const complexChats = periodConversations.filter(c => c.is_complex).length;

    return {
      hoursWorked: hoursWorked.toFixed(2),
      activeSessions,
      pendingConsultations,
      confirmedConsultations,
      completedConsultations,
      activeChats,
      resolvedChats,
      complexChats,
      totalConsultations: periodConsultations.length,
      totalConversations: periodConversations.length,
    };
  };

  const metrics = calculateMetrics();

  const getPeriodLabel = () => {
    switch (timePeriod) {
      case 'today': return 'Today';
      case 'week': return 'Last 7 Days';
      case 'month': return 'Last 30 Days';
      case 'year': return 'Last Year';
      default: return 'Today';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: styles.text }}>
            <FiBarChart2 style={{ marginRight: '10px', color: styles.primary }} />
            Analytics Dashboard
          </h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            {(['today', 'week', 'month', 'year'] as const).map(period => (
              <button
                key={period}
                onClick={() => setTimePeriod(period)}
                style={{
                  padding: '10px 20px',
                  background: timePeriod === period ? styles.primary : styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: timePeriod === period ? 'white' : styles.text,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <p style={{ color: styles.mutedText, fontSize: '16px' }}>
          Statistics for {getPeriodLabel()}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: styles.primary, marginBottom: '10px' }}>
            {metrics.hoursWorked}
          </div>
          <div style={{ fontSize: '15px', color: styles.mutedText, marginBottom: '8px' }}>Hours Worked</div>
          <div style={{ fontSize: '13px', color: styles.mutedText }}>
            {metrics.activeSessions} active session{metrics.activeSessions !== 1 ? 's' : ''}
          </div>
        </div>

        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: styles.success, marginBottom: '10px' }}>
            {metrics.totalConsultations}
          </div>
          <div style={{ fontSize: '15px', color: styles.mutedText, marginBottom: '8px' }}>Consultations</div>
          <div style={{ fontSize: '13px', color: styles.mutedText }}>
            {metrics.pendingConsultations} pending, {metrics.confirmedConsultations} confirmed
          </div>
        </div>

        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: styles.warning, marginBottom: '10px' }}>
            {metrics.totalConversations}
          </div>
          <div style={{ fontSize: '15px', color: styles.mutedText, marginBottom: '8px' }}>Conversations</div>
          <div style={{ fontSize: '13px', color: styles.mutedText }}>
            {metrics.activeChats} active, {metrics.complexChats} complex
          </div>
        </div>

        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '10px' }}>
            {metrics.completedConsultations}
          </div>
          <div style={{ fontSize: '15px', color: styles.mutedText, marginBottom: '8px' }}>Completed</div>
          <div style={{ fontSize: '13px', color: styles.mutedText }}>
            {metrics.resolvedChats} chats resolved
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: styles.text }}>
            <FiCalendar style={{ marginRight: '10px' }} />
            Consultation Breakdown
          </h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {[
              { label: 'Pending', value: metrics.pendingConsultations, color: styles.warning },
              { label: 'Confirmed', value: metrics.confirmedConsultations, color: styles.success },
              { label: 'Completed', value: metrics.completedConsultations, color: '#8b5cf6' },
              { label: 'Total', value: metrics.totalConsultations, color: styles.primary }
            ].map((stat, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: stat.color
                  }} />
                  <span style={{ fontSize: '14px', color: styles.text }}>{stat.label}</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: stat.color }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: styles.text }}>
            <FiMessageCircle style={{ marginRight: '10px' }} />
            Chat Breakdown
          </h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {[
              { label: 'Active', value: metrics.activeChats, color: styles.success },
              { label: 'Complex', value: metrics.complexChats, color: styles.warning },
              { label: 'Resolved', value: metrics.resolvedChats, color: styles.info },
              { label: 'Total', value: metrics.totalConversations, color: styles.primary }
            ].map((stat, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: stat.color
                  }} />
                  <span style={{ fontSize: '14px', color: styles.text }}>{stat.label}</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: stat.color }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: styles.text }}>
            <FiClock style={{ marginRight: '10px' }} />
            Recent Sessions
          </h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {analytics.slice(0, 5).map((session, index) => (
              <div
                key={session.id}
                style={{
                  padding: '12px',
                  borderBottom: index < 4 ? `1px solid ${styles.border}` : 'none',
                  marginBottom: index < 4 ? '8px' : 0
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: styles.text }}>
                    {session.activity_type.charAt(0).toUpperCase() + session.activity_type.slice(1)}
                  </span>
                  {session.duration_seconds ? (
                    <span style={{ fontSize: '13px', color: styles.success }}>
                      {(session.duration_seconds / 3600).toFixed(2)}h
                    </span>
                  ) : (
                    <span style={{ fontSize: '13px', color: styles.warning }}>
                      Active
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: styles.mutedText }}>
                  {new Date(session.start_time).toLocaleDateString()} • 
                  {new Date(session.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        background: styles.cardBg,
        borderRadius: '16px',
        padding: '25px',
        border: `1px solid ${styles.border}`,
        marginBottom: '30px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', color: styles.text }}>
          <FiBarChart2 style={{ marginRight: '10px' }} />
          Activity Overview ({getPeriodLabel()})
        </h3>
        <div style={{
          height: '200px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '20px',
          padding: '20px',
          background: styles.background,
          borderRadius: '12px'
        }}>
          {[30, 50, 70, 90, 60, 40, 80].map((height, index) => (
            <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%',
                height: `${height}%`,
                background: styles.primary,
                borderRadius: '4px 4px 0 0',
                minHeight: '20px'
              }} />
              <div style={{ fontSize: '12px', color: styles.mutedText, marginTop: '8px' }}>
                Day {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'right' }}>
        <button
          onClick={() => {
            const data = {
              period: getPeriodLabel(),
              metrics,
              generatedAt: new Date().toISOString(),
              admin: adminData?.name
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          style={{
            padding: '12px 24px',
            background: styles.primary,
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FiDownload />
          Export Analytics
        </button>
      </div>
    </div>
  );
};

// ========== SETTINGS COMPONENT ==========
const SettingsComponent: React.FC<{
  adminData: AdminData | null;
  theme: 'light' | 'dark';
  onUpdateSettings: (settings: any) => Promise<void>;
  onLogout: () => void;
}> = ({ adminData, theme, onUpdateSettings, onLogout }) => {
  const [settings, setSettings] = useState({
    theme: theme,
    notifications: true,
    email_notifications: true,
    timezone: TIMEZONES[0],
    ...adminData?.settings
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const styles = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    cardBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
    mutedText: theme === 'dark' ? '#94a3b8' : '#64748b',
    primary: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled) {
      if (!("Notification" in window)) {
        setMessage({ type: 'error', text: 'This browser does not support notifications' });
        return false;
      }

      if (Notification.permission === "granted") {
        return true;
      }

      if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setMessage({ type: 'success', text: 'Notification permission granted!' });
          
          if (adminData) {
            new Notification("Verapixels Admin", {
              body: `Welcome back, ${adminData.name}! Notifications are now enabled.`,
              icon: adminData.profile_picture_url || undefined
            });
          }
          return true;
        } else {
          setMessage({ type: 'error', text: 'Notification permission denied' });
          return false;
        }
      }
    }
    return enabled;
  };

  const handleNotificationChange = async (enabled: boolean) => {
    const success = await handleNotificationToggle(enabled);
    if (success || !enabled) {
      setSettings({ ...settings, notifications: enabled });
    }
  };

  const handleProfileUpload = async () => {
    if (!profilePicture || !adminData) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const base64String = e.target?.result as string;
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          await onUpdateSettings({
            profile_picture_url: base64String,
            settings
          });

          setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
          setProfilePicture(null);
          
          if (adminData) {
            adminData.profile_picture_url = base64String;
          }
        } catch (error) {
          console.error('Error processing image:', error);
          setMessage({ type: 'error', text: 'Failed to process image' });
        }
      };
      
      reader.readAsDataURL(profilePicture);
      
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Failed to upload profile picture' });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await onUpdateSettings(settings);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px', color: styles.text }}>
          <FiSettings style={{ marginRight: '10px', color: styles.primary }} />
          Settings
        </h1>
        <p style={{ color: styles.mutedText, fontSize: '16px' }}>
          Manage your account preferences and settings
        </p>
      </div>

      {message && (
        <CustomAlert
          type={message.type}
          message={message.text}
          theme={theme}
          onClose={() => setMessage(null)}
        />
      )}

      <div style={{ display: 'grid', gap: '30px' }}>
        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', color: styles.text }}>
            <FiUser style={{ marginRight: '10px' }} />
            Profile Settings
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: adminData?.profile_picture_url ? `url(${adminData.profile_picture_url})` : `linear-gradient(135deg, ${styles.primary}, ${styles.info})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              color: 'white',
              fontWeight: 'bold',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {!adminData?.profile_picture_url && (
                adminData?.name?.charAt(0) || 'A'
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '18px', fontWeight: 600, color: styles.text, marginBottom: '8px' }}>
                {adminData?.name || 'Admin'}
              </div>
              <div style={{ fontSize: '14px', color: styles.mutedText, marginBottom: '4px' }}>
                {adminData?.email || 'admin@verapixels.com'}
              </div>
              <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '15px' }}>
                Role: {adminData?.role || 'Admin'}
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <label style={{
                  padding: '10px 20px',
                  background: styles.primary,
                  color: 'white',
                  borderRadius: '8px',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  display: 'inline-block'
                }}>
                  {uploading ? 'Uploading...' : 'Upload Picture'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setProfilePicture(e.target.files[0])}
                    style={{ display: 'none' }}
                    disabled={uploading}
                  />
                </label>
                
                {profilePicture && (
                  <button
                    onClick={handleProfileUpload}
                    disabled={uploading}
                    style={{
                      padding: '10px 20px',
                      background: styles.success,
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {uploading ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FiUpload />
                        Save Picture
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', color: styles.text }}>
            <FiSun style={{ marginRight: '10px' }} />
            Appearance
          </h3>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '15px', color: styles.text }}>
                Theme
              </label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSettings({ ...settings, theme: 'light' })}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: settings.theme === 'light' ? styles.primary : styles.background,
                    border: `2px solid ${settings.theme === 'light' ? styles.primary : styles.border}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FiSun size={24} color={settings.theme === 'light' ? 'white' : styles.text} />
                  <span style={{ color: settings.theme === 'light' ? 'white' : styles.text }}>Light</span>
                </button>

                <button
                  onClick={() => setSettings({ ...settings, theme: 'dark' })}
                  style={{
                    flex: 1,
                    padding: '15px',
                    background: settings.theme === 'dark' ? styles.primary : styles.background,
                    border: `2px solid ${settings.theme === 'dark' ? styles.primary : styles.border}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FiMoon size={24} color={settings.theme === 'dark' ? 'white' : styles.text} />
                  <span style={{ color: settings.theme === 'dark' ? 'white' : styles.text }}>Dark</span>
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '15px', color: styles.text }}>
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: styles.background,
                  border: `1px solid ${styles.border}`,
                  borderRadius: '8px',
                  color: styles.text,
                  fontSize: '14px'
                }}
              >
                {TIMEZONES.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '25px',
          border: `1px solid ${styles.border}`
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', color: styles.text }}>
            <FiBell style={{ marginRight: '10px' }} />
            Notifications
          </h3>

          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: styles.text, marginBottom: '4px' }}>
                  Push Notifications
                </div>
                <div style={{ fontSize: '13px', color: styles.mutedText }}>
                  Receive notifications for new messages and consultations
                </div>
              </div>
              <button
                onClick={() => handleNotificationChange(!settings.notifications)}
                style={{
                  width: '50px',
                  height: '28px',
                  background: settings.notifications ? styles.success : styles.mutedText,
                  border: 'none',
                  borderRadius: '14px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: settings.notifications ? '24px' : '2px',
                  width: '24px',
                  height: '24px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.2s'
                }} />
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: styles.text, marginBottom: '4px' }}>
                  Email Notifications
                </div>
                <div style={{ fontSize: '13px', color: styles.mutedText }}>
                  Receive email alerts for important updates
                </div>
              </div>
              <button
                onClick={() => setSettings({ ...settings, email_notifications: !settings.email_notifications })}
                style={{
                  width: '50px',
                  height: '28px',
                  background: settings.email_notifications ? styles.success : styles.mutedText,
                  border: 'none',
                  borderRadius: '14px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '2px',
                  left: settings.email_notifications ? '24px' : '2px',
                  width: '24px',
                  height: '24px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: 'left 0.2s'
                }} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
          <button
            onClick={onLogout}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: `1px solid ${styles.danger}`,
              borderRadius: '8px',
              color: styles.danger,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiLogOut />
            Logout
          </button>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={() => {
                setSettings({
                  theme: theme,
                  notifications: true,
                  email_notifications: true,
                  timezone: TIMEZONES[0]
                });
              }}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: `1px solid ${styles.border}`,
                borderRadius: '8px',
                color: styles.text,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Reset to Default
            </button>
            
            <button
              onClick={handleSaveSettings}
              disabled={saving}
              style={{
                padding: '12px 24px',
                background: saving ? styles.mutedText : styles.primary,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                cursor: saving ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {saving ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Saving...
                </>
              ) : (
                <>
                  <FiCheckCircle />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== NOTES COMPONENT ==========
const NotesComponent: React.FC<{
  theme: 'light' | 'dark';
  adminData: AdminData | null;
}> = ({ theme, adminData }) => {
  const [notes, setNotes] = useState<AdminNote[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<AdminNote | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColor, setFilterColor] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    color: '#ffd700',
    font_style: 'normal',
    font_size: '14px'
  });

  const styles = {
    background: theme === 'dark' ? '#0f172a' : '#f8fafc',
    text: theme === 'dark' ? '#f1f5f9' : '#0f172a',
    cardBg: theme === 'dark' ? '#1e293b' : '#ffffff',
    border: theme === 'dark' ? '#334155' : '#e2e8f0',
    hoverBg: theme === 'dark' ? '#2d3748' : '#f1f5f9',
    mutedText: theme === 'dark' ? '#94a3b8' : '#64748b',
    primary: '#6366f1',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const colorOptions = [
    { value: '#ffd700', label: 'Yellow', name: 'Yellow' },
    { value: '#93c5fd', label: 'Blue', name: 'Blue' },
    { value: '#86efac', label: 'Green', name: 'Green' },
    { value: '#fca5a5', label: 'Red', name: 'Red' },
    { value: '#d8b4fe', label: 'Purple', name: 'Purple' },
    { value: '#fde68a', label: 'Light Yellow', name: 'Light Yellow' },
    { value: '#c4b5fd', label: 'Light Purple', name: 'Light Purple' },
    { value: '#f0f9ff', label: 'White', name: 'White' },
  ];

  useEffect(() => {
    fetchNotes();
  }, [adminData]);

  const fetchNotes = async () => {
  if (!adminData) return;
  
  setLoading(true);
  try {
    console.log('Fetching notes for admin:', adminData.id);
    
    const { data, error } = await supabase
      .from('admin_notes')
      .select('*')
      .eq('admin_id', adminData.id)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
    
    console.log('Fetched notes:', data?.length || 0);
    setNotes(data || []);
    
  } catch (error) {
    console.error('Error in fetchNotes:', error);
    // Fallback to localStorage if database fails
    const localNotes = JSON.parse(localStorage.getItem('admin_notes') || '[]');
    const userNotes = localNotes.filter((note: AdminNote) => 
      note.admin_id === adminData.id && !note.is_deleted
    );
    setNotes(userNotes);
  } finally {
    setLoading(false);
  }
};

const handleCreateNote = async () => {
  if (!adminData || !newNote.title.trim() || !newNote.content.trim()) {
    alert('Please fill in both title and content');
    return;
  }

  try {
    const noteData = {
      note_id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      admin_id: adminData.id,
      title: newNote.title,
      content: newNote.content,
      color: newNote.color,
      font_style: newNote.font_style,
      font_size: newNote.font_size,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_deleted: false
    };

    console.log('Creating note with data:', noteData);

    // Insert and return the data
    const { data, error } = await supabase
      .from('admin_notes')
      .insert([noteData])
      .select() // Add this to get the inserted data back
      .single(); // Use single() to get one row

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    console.log('Note created successfully:', data);

    if (data) {
      // Update state with the returned data (includes auto-generated id)
      setNotes(prev => [data, ...prev]);
    } else {
      // Fallback: create note object manually
      const newNoteItem: AdminNote = {
        id: noteData.note_id, // Use note_id as id temporarily
        ...noteData
      };
      setNotes(prev => [newNoteItem, ...prev]);
    }
    
    setIsCreating(false);
    setNewNote({
      title: '',
      content: '',
      color: '#ffd700',
      font_style: 'normal',
      font_size: '14px'
    });
    
    alert('Note created successfully!');
    
  } catch (error: any) {
    console.error('Error creating note:', error);
    alert(`Failed to create note: ${error.message}`);
  }
};

  const handleUpdateNote = async () => {
    if (!editingNote) return;

    try {
      console.log('Updating note:', editingNote.note_id);

      const { error } = await supabase
        .from('admin_notes')
        .update({
          title: editingNote.title,
          content: editingNote.content,
          color: editingNote.color,
          font_style: editingNote.font_style,
          font_size: editingNote.font_size,
          updated_at: new Date().toISOString()
        })
        .eq('note_id', editingNote.note_id);

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }

      console.log('Note updated successfully');
      
      await fetchNotes();
      setEditingNote(null);
      
    } catch (error: any) {
      console.error('Error updating note:', error);
      alert(`Failed to update note: ${error.message}`);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      const { error } = await supabase
        .from('admin_notes')
        .update({ is_deleted: true })
        .eq('note_id', noteId);

      if (error) throw error;

      setNotes(prev => prev.filter(note => note.note_id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchTerm === '' || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesColor = filterColor === 'all' || note.color === filterColor;
    
    return matchesSearch && matchesColor;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: styles.text }}>
            <FiBook style={{ marginRight: '10px', color: styles.primary }} />
            Personal Notes
          </h1>
          <button
            onClick={() => setIsCreating(true)}
            style={{
              padding: '12px 24px',
              background: styles.success,
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600
            }}
          >
            <FiPlus />
            Create New Note
          </button>
        </div>
        <p style={{ color: styles.mutedText, fontSize: '16px' }}>
          Private notes only visible to you
        </p>
      </div>

      <div style={{
        background: styles.cardBg,
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        border: `1px solid ${styles.border}`
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
              <FiSearch style={{ marginRight: '8px' }} />
              Search Notes
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or content..."
              style={{
                width: '100%',
                padding: '12px 16px',
                background: styles.background,
                border: `1px solid ${styles.border}`,
                borderRadius: '10px',
                color: styles.text,
                fontSize: '14px'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
              <FiFilter style={{ marginRight: '8px' }} />
              Filter by Color
            </label>
            <select
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: styles.background,
                border: `1px solid ${styles.border}`,
                borderRadius: '10px',
                color: styles.text,
                fontSize: '14px'
              }}
            >
              <option value="all">All Colors</option>
              {colorOptions.map(color => (
                <option key={color.value} value={color.value}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {(isCreating || editingNote) && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: styles.cardBg,
            borderRadius: '16px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: `1px solid ${styles.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: styles.text }}>
                <FiBook style={{ marginRight: '10px' }} />
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h2>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingNote(null);
                  setNewNote({
                    title: '',
                    content: '',
                    color: '#ffd700',
                    font_style: 'normal',
                    font_size: '14px'
                  });
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: styles.mutedText,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px'
                }}
              >
                <FiX size={20} />
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={editingNote ? editingNote.title : newNote.title}
                  onChange={(e) => editingNote 
                    ? setEditingNote({ ...editingNote, title: e.target.value })
                    : setNewNote({ ...newNote, title: e.target.value })
                  }
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: styles.background,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '8px',
                    color: styles.text,
                    fontSize: '14px'
                  }}
                  placeholder="Note title"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                  Content *
                </label>
                <textarea
                  value={editingNote ? editingNote.content : newNote.content}
                  onChange={(e) => editingNote
                    ? setEditingNote({ ...editingNote, content: e.target.value })
                    : setNewNote({ ...newNote, content: e.target.value })
                  }
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: styles.background,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '8px',
                    color: styles.text,
                    resize: 'vertical',
                    fontFamily: editingNote?.font_style || newNote.font_style,
                    fontSize: editingNote?.font_size || newNote.font_size
                  }}
                  placeholder="Note content..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                    Color
                  </label>
                  <select
                    value={editingNote ? editingNote.color : newNote.color}
                    onChange={(e) => editingNote
                      ? setEditingNote({ ...editingNote, color: e.target.value })
                      : setNewNote({ ...newNote, color: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: styles.background,
                      border: `1px solid ${styles.border}`,
                      borderRadius: '8px',
                      color: styles.text,
                      fontSize: '14px'
                    }}
                  >
                    {colorOptions.map(color => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                    Font Style
                  </label>
                  <select
                    value={editingNote ? editingNote.font_style : newNote.font_style}
                    onChange={(e) => editingNote
                      ? setEditingNote({ ...editingNote, font_style: e.target.value })
                      : setNewNote({ ...newNote, font_style: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: styles.background,
                      border: `1px solid ${styles.border}`,
                      borderRadius: '8px',
                      color: styles.text,
                      fontSize: '14px'
                    }}
                  >
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                    <option value="bold">Bold</option>
                    <option value="bold italic">Bold Italic</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.text }}>
                    Font Size
                  </label>
                  <select
                    value={editingNote ? editingNote.font_size : newNote.font_size}
                    onChange={(e) => editingNote
                      ? setEditingNote({ ...editingNote, font_size: e.target.value })
                      : setNewNote({ ...newNote, font_size: e.target.value })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: styles.background,
                      border: `1px solid ${styles.border}`,
                      borderRadius: '8px',
                      color: styles.text,
                      fontSize: '14px'
                    }}
                  >
                    <option value="12px">Small</option>
                    <option value="14px">Medium</option>
                    <option value="16px">Large</option>
                    <option value="18px">Extra Large</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingNote(null);
                    setNewNote({
                      title: '',
                      content: '',
                      color: '#ffd700',
                      font_style: 'normal',
                      font_size: '14px'
                    });
                  }}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: `1px solid ${styles.border}`,
                    borderRadius: '8px',
                    color: styles.text,
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={editingNote ? handleUpdateNote : handleCreateNote}
                  disabled={(editingNote ? !editingNote.title.trim() || !editingNote.content.trim() : !newNote.title.trim() || !newNote.content.trim())}
                  style={{
                    padding: '12px 24px',
                    background: (editingNote ? !editingNote.title.trim() || !editingNote.content.trim() : !newNote.title.trim() || !newNote.content.trim()) 
                      ? styles.mutedText 
                      : styles.success,
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: (editingNote ? !editingNote.title.trim() || !editingNote.content.trim() : !newNote.title.trim() || !newNote.content.trim())
                      ? 'not-allowed' 
                      : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <FiCheckCircle />
                  {editingNote ? 'Update Note' : 'Create Note'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #f3f3f3',
            borderTop: `3px solid ${styles.primary}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }} />
        </div>
      ) : filteredNotes.length === 0 ? (
        <div style={{
          background: styles.cardBg,
          borderRadius: '16px',
          padding: '60px',
          textAlign: 'center',
          border: `1px solid ${styles.border}`
        }}>
          <FiBook style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5, color: styles.mutedText }} />
          <p style={{ fontSize: '18px', color: styles.text, marginBottom: '10px' }}>
            No notes found
          </p>
          <p style={{ fontSize: '14px', color: styles.mutedText }}>
            {searchTerm || filterColor !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Create your first note by clicking the "Create New Note" button'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredNotes.map(note => (
            <div
              key={note.note_id}
              style={{
                background: note.color || styles.cardBg,
                borderRadius: '12px',
                padding: '20px',
                border: `1px solid ${styles.border}`,
                position: 'relative',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setEditingNote(note)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '6px',
                    color: styles.text,
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FiEdit size={14} />
                </button>
                <button
                  onClick={() => handleDeleteNote(note.note_id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: 'none',
                    borderRadius: '6px',
                    color: styles.danger,
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>

              <div style={{ flex: 1, marginBottom: '15px' }}>
                <h3 style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: 600,
                  color: styles.text,
                  marginBottom: '10px',
                  paddingRight: '50px'
                }}>
                  {note.title}
                </h3>
                <div style={{
                  fontSize: note.font_size,
                  fontStyle: note.font_style.includes('italic') ? 'italic' : 'normal',
                  fontWeight: note.font_style.includes('bold') ? 'bold' : 'normal',
                  color: styles.text,
                  lineHeight: 1.6,
                  overflowWrap: 'break-word',
                  maxHeight: '120px',
                  overflowY: 'auto'
                }}>
                  {note.content}
                </div>
              </div>

              <div style={{
                fontSize: '12px',
                color: styles.mutedText,
                paddingTop: '10px',
                borderTop: `1px solid ${styles.border}`
              }}>
                {formatDate(note.updated_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ========== MAIN ADMIN DASHBOARD COMPONENT ==========
const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'consultations' | 'conversations' | 'notifications' | 'analytics' | 'settings' | 'notes'>('dashboard');
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !adminData) return;

    console.log('🔌 Initializing admin socket connection...');
    
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      query: {
        dashboard: 'admin',
        adminId: adminData.id,
        adminName: adminData.name
      }
    });

    socketInstance.onAny((eventName, ...args) => {
      if (eventName !== 'ping' && eventName !== 'pong') {
        console.log(`📡 [ADMIN] WebSocket event: ${eventName}`, 
          args[0] ? JSON.stringify(args[0]).substring(0, 100) : '');
      }
    });

    socketInstance.on('connect', () => {
      console.log('✅ Admin socket connected:', socketInstance.id);
      setIsSocketConnected(true);
      
      conversations.forEach(conv => {
        if (conv.status === 'active' || conv.status === 'awaiting_admin') {
          console.log('👥 Auto-joining conversation:', conv.conversation_id);
          socketInstance.emit('admin_join', {
            conversationId: conv.conversation_id,
            adminId: adminData.id,
            adminName: adminData.name
          });
        }
      });
    });

    socketInstance.on('connected', (data) => {
      console.log('🔗 Server connection confirmed:', data);
    });

    socketInstance.on('new_message', (message) => {
      console.log('📨 New message received in admin:', {
        id: message.id,
        sender: message.sender_type,
        text: message.message_text.substring(0, 50),
        conversation: message.conversation_id
      });
      
      if (message.sender_type === 'admin') {
        console.log('👤 This is my own message, checking for duplicates...');
      }
    });

    setSocket(socketInstance);

    return () => {
      console.log('🔌 Cleaning up admin socket connection...');
      socketInstance.disconnect();
    };
  }, [isAuthenticated, adminData]);
  
  const checkAuth = async () => {
    try {
      console.log('🔒 Checking authentication...');
      
      const storedSession = localStorage.getItem('admin_session');
      
      if (!storedSession) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      const sessionData = JSON.parse(storedSession);
      
      if (Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000) {
        localStorage.removeItem('admin_session');
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const { data: adminData, error } = await supabase
        .from('admins')
        .select('id, name, email, role, settings, is_active')
        .eq('id', sessionData.id)
        .eq('is_active', true)
        .single();
        
      if (error || !adminData) {
        localStorage.removeItem('admin_session');
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      setAdminData({
        id: adminData.id,
        auth_user_id: '',
        name: adminData.name || 'Admin',
        email: adminData.email,
        role: adminData.role || 'admin',
        last_login: sessionData.timestamp,
        profile_picture_url: '',
        settings: adminData.settings || {
          theme: 'light',
          notifications: true,
          email_notifications: true,
          timezone: 'Africa/Lagos'
        }
      });
      
      setIsAuthenticated(true);
      
      await Promise.all([
        fetchConversations(),
        fetchConsultations(),
        fetchNotifications(),
        fetchAnalytics()
      ]);
      
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('admin_session');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminData?.settings?.theme) {
      setTheme(adminData.settings.theme);
    }
  }, [adminData]);

  const fetchConsultations = async () => {
  try {
    console.log('📅 Starting to fetch consultations...');
    
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }
    
    console.log('📊 Raw data from Supabase:', {
      count: data?.length || 0,
      firstItem: data?.[0] || 'No data'
    });
    
    if (!data || data.length === 0) {
      console.warn('⚠️ No consultations found in database');
    } else {
      console.log(`✅ Successfully fetched ${data.length} consultations`);
    }
    
    setConsultations(data || []);
  } catch (error: any) {
    console.error('❌ Error in fetchConsultations:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    });
    setConsultations([]);
  }
};

const fetchConversations = async () => {
  try {
    console.log('💬 Starting to fetch conversations...');
    
    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('is_complex', true)
      .order('last_activity', { ascending: false });

    if (error) {
      console.error('❌ Supabase error fetching conversations:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }
    
    console.log('📊 Raw conversation data:', {
      count: data?.length || 0,
      firstItem: data?.[0] || 'No data'
    });
    
    if (!data || data.length === 0) {
      console.warn('⚠️ No complex conversations found');
    } else {
      console.log(`✅ Successfully fetched ${data.length} complex conversations`);
    }
    
    setConversations(data || []);
  } catch (error: any) {
    console.error('❌ Error in fetchConversations:', {
      name: error?.name,
      message: error?.message
    });
    setConversations([]);
  }
};

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_analytics')
        .select('*')
        .order('start_time', { ascending: false });

      if (error) throw error;
      setAnalytics(data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const setupRealTimeSubscriptions = () => {
    const conversationsSubscription = supabase
      .channel('conversations_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_conversations'
      }, (payload: { new: Conversation }) => {
        const newConversation = payload.new;
        if (newConversation.is_complex) {
          setConversations(prev => [newConversation, ...prev]);
        }
      })
      .subscribe();

    const conversationsUpdateSubscription = supabase
      .channel('conversations_updates')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_conversations'
      }, (payload: { new: Conversation }) => {
        const updatedConversation = payload.new;
        setConversations(prev => 
          prev.map(conv => 
            conv.conversation_id === updatedConversation.conversation_id 
              ? updatedConversation 
              : conv
          )
        );
      })
      .subscribe();

    const consultationsSubscription = supabase
      .channel('consultations_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'consultations'
      }, (payload: { new: Consultation }) => {
        const newConsultation = payload.new;
        setConsultations(prev => [newConsultation, ...prev]);
      })
      .subscribe();

    const consultationsUpdateSubscription = supabase
      .channel('consultations_updates')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'consultations'
      }, (payload: { new: Consultation }) => {
        const updatedConsultation = payload.new;
        setConsultations(prev => 
          prev.map(cons => 
            cons.consultation_id === updatedConsultation.consultation_id 
              ? updatedConsultation 
              : cons
          )
        );
      })
      .subscribe();

    const notificationsSubscription = supabase
      .channel('notifications_changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'admin_notifications'
      }, (payload: { new: Notification }) => {
        const newNotification = payload.new;
        setNotifications(prev => [newNotification, ...prev]);
      })
      .subscribe();

    const notificationsUpdateSubscription = supabase
      .channel('notifications_updates')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'admin_notifications'
      }, (payload: { new: Notification }) => {
        const updatedNotification = payload.new;
        setNotifications(prev => 
          prev.map(notif => 
            notif.notification_id === updatedNotification.notification_id 
              ? updatedNotification 
              : notif
          )
        );
      })
      .subscribe();

    return () => {
      conversationsSubscription.unsubscribe();
      conversationsUpdateSubscription.unsubscribe();
      consultationsSubscription.unsubscribe();
      consultationsUpdateSubscription.unsubscribe();
      notificationsSubscription.unsubscribe();
      notificationsUpdateSubscription.unsubscribe();
    };
  };

  const trackSessionStart = async (): Promise<string> => {
    if (!adminData) return '';
    
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      await supabase
        .from('admin_analytics')
        .insert({
          admin_id: adminData.id,
          session_id: sessionId,
          start_time: new Date().toISOString(),
          activity_type: 'admin'
        });
    } catch (error) {
      console.error('Error tracking session start:', error);
    }
    
    return sessionId;
  };

  const trackSessionEnd = async (sessionId: string) => {
    try {
      const { data: session } = await supabase
        .from('admin_analytics')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (session) {
        const duration = (Date.now() - new Date(session.start_time).getTime()) / 1000;
        
        await supabase
          .from('admin_analytics')
          .update({
            end_time: new Date().toISOString(),
            duration_seconds: Math.floor(duration)
          })
          .eq('session_id', sessionId);
      }
    } catch (error) {
      console.error('Error tracking session end:', error);
    }
  };
  
  const handleLogin = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🔐 Login attempt for:', email);
    
    // ✅ CALL YOUR SERVER LOGIN ENDPOINT
    const API_URL = import.meta.env.PROD
      ? 'https://verapixels-server.onrender.com'
      : 'http://localhost:5001';
    
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return { 
        success: false, 
        message: result.error || 'Invalid email or password' 
      };
    }

    // ✅ Use the admin data from server response
    const adminInfo = {
      id: result.admin.id,
      auth_user_id: result.admin.auth_user_id || '',
      name: result.admin.name || 'Admin',
      email: result.admin.email || email,
      role: result.admin.role || 'admin',
      last_login: new Date().toISOString(),
      profile_picture_url: result.admin.profile_picture_url || '',
      settings: result.admin.settings || {
        theme: 'light',
        notifications: true,
        email_notifications: true,
        timezone: 'Africa/Lagos'
      }
    };

    setAdminData(adminInfo);
    setTheme(adminInfo.settings.theme || 'light');
    setIsAuthenticated(true);
    
    const sessionData = {
      id: result.admin.id,
      email: result.admin.email,
      name: result.admin.name,
      role: result.admin.role,
      timestamp: Date.now()
    };
    
    localStorage.setItem('admin_session', JSON.stringify(sessionData));

    const sessionId = await trackSessionStart();
    setCurrentSessionId(sessionId);
    
    await Promise.all([
      fetchConversations(),
      fetchConsultations(),
      fetchNotifications(),
      fetchAnalytics()
    ]);

    return { 
      success: true, 
      message: 'Login successful! Loading dashboard...' 
    };
    
  } catch (error: any) {
    console.error('Login error:', error);
    return { 
      success: false, 
      message: error.message || 'Login failed. Please try again.' 
    };
  }
};

  const handleLogout = async () => {
    try {
      if (currentSessionId) {
        await trackSessionEnd(currentSessionId);
      }
      
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setAdminData(null);
      setCurrentSessionId(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const calculateBusinessTime = (userTime: string, date: string, userTimezone: string): string => {
    try {
      const [time, period] = userTime.split(' ');
      const [hours, minutes] = time.split(':');
      
      let hour = parseInt(hours);
      if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
      if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
      
      const userDateString = `${date}T${hour.toString().padStart(2, '0')}:${minutes}:00`;
      
      const userDate = new Date(userDateString);
      const lagosDate = new Date(userDate.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
      
      let lagosHours = lagosDate.getHours();
      const lagosMinutes = lagosDate.getMinutes();
      const lagosPeriod = lagosHours >= 12 ? 'PM' : 'AM';
      
      lagosHours = lagosHours % 12;
      lagosHours = lagosHours === 0 ? 12 : lagosHours;
      
      return `${lagosHours.toString().padStart(2, '0')}:${lagosMinutes.toString().padStart(2, '0')} ${lagosPeriod}`;
    } catch (error) {
      console.error('Error calculating business time:', error);
      return userTime;
    }
  };

  const handleBookConsultation = async (bookingData: Consultation): Promise<void> => {
    try {
      console.log('📅 Checking availability for:', bookingData.booking_date, bookingData.booking_time);

      const { data: existingBookings, error: checkError } = await supabase
        .from('consultations')
        .select('*')
        .eq('booking_date', bookingData.booking_date)
        .eq('booking_time', bookingData.booking_time)
        .in('status', ['confirmed', 'pending']);

      if (checkError) {
        console.error('Error checking existing bookings:', checkError);
        throw new Error('Failed to check availability. Please try again.');
      }

      console.log('Found existing bookings:', existingBookings?.length || 0);

      if (existingBookings && existingBookings.length > 0) {
        const bookedEmails = existingBookings.map(b => b.email).join(', ');
        throw new Error(`This time slot is already booked by: ${bookedEmails}. Please choose another time.`);
      }

      const businessTime = calculateBusinessTime(
        bookingData.booking_time,
        bookingData.booking_date,
        bookingData.user_timezone
      );

      const { error } = await supabase
        .from('consultations')
        .insert({
          consultation_id: bookingData.consultation_id,
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          contact_method: bookingData.contact_method,
          booking_date: bookingData.booking_date,
          booking_time: bookingData.booking_time,
          user_timezone: bookingData.user_timezone,
          business_time: businessTime,
          message: bookingData.message || 'No additional message provided',
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          admin_notes: '',
          admin_reply_sent: false,
          assigned_admin_id: null,
          is_complex: false,
          reply_timestamp: null,
          booked_by: 'admin'
        });

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }

      console.log('✅ Booking saved successfully');

      await sendUserConfirmationEmail(bookingData);

      await fetchConsultations();

    } catch (error: any) {
      console.error('❌ Error booking consultation:', error);
      throw error;
    }
  };

  const handleUpdateConsultation = async (consultationId: string, updates: Partial<Consultation>) => {
    try {
      console.log('🔄 Updating consultation:', consultationId, updates);
      
      const { error } = await supabase
        .from('consultations')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('consultation_id', consultationId);

      if (error) {
        console.error('❌ Error updating consultation:', error);
        throw error;
      }

      console.log('✅ Consultation updated');
      
      await fetchConsultations();
      
    } catch (error) {
      console.error('❌ Error in handleUpdateConsultation:', error);
      throw error;
    }
  };

  const handleDeleteConsultation = async (consultationId: string) => {
    if (!confirm('Are you sure you want to delete this consultation?')) return;

    try {
      console.log('🗑️ Deleting consultation:', consultationId);
      
      const { error } = await supabase
        .from('consultations')
        .delete()
        .eq('consultation_id', consultationId);

      if (error) {
        console.error('❌ Error deleting consultation:', error);
        throw error;
      }

      console.log('✅ Consultation deleted');
      
      await fetchConsultations();
      
    } catch (error) {
      console.error('❌ Error in handleDeleteConsultation:', error);
      alert('Failed to delete consultation. Please try again.');
      throw error;
    }
  };

  const sendUserConfirmationEmail = async (bookingData: Consultation) => {
    try {
      if (!bookingData.email || !bookingData.email.includes('@')) {
        console.warn('❌ Invalid email address:', bookingData.email);
        return;
      }

      const params = {
        from_name: 'Verapixels Team',
        from_email: 'info@verapixels.com',
        user_name: bookingData.name,
        user_email: bookingData.email,
        to_email: bookingData.email,
        phone: bookingData.phone,
        contact_method: bookingData.contact_method,
        preferred_date: bookingData.booking_date,
        preferred_time: bookingData.booking_time,
        business_time: bookingData.business_time,
        user_timezone: bookingData.user_timezone,
        business_timezone: BUSINESS_TIMEZONE,
        message: bookingData.message || 'No additional message provided',
        consultation_id: bookingData.consultation_id
      };

      console.log('📧 Sending confirmation email to:', bookingData.email);
      
      const result = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.userTemplateId,
        params,
        EMAILJS_CONFIG.publicKey
      );
      
      console.log('✅ Confirmation email sent:', result);
      return result;
    } catch (error) {
      console.error('❌ Error sending confirmation email:', error);
      return null;
    }
  };

  const handleUpdateSettings = async (settings: any) => {
    if (!adminData) return;

    try {
      const { error } = await supabase
        .from('admins')
        .update({
          settings: settings.settings || settings,
          profile_picture_url: settings.profile_picture_url || adminData.profile_picture_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', adminData.id);

      if (error) throw error;

      const updatedAdminData = {
        ...adminData,
        ...settings,
        settings: settings.settings || settings
      };
      
      setAdminData(updatedAdminData);

      if (settings.theme) {
        setTheme(settings.theme);
        localStorage.setItem('admin_theme', settings.theme);
      }

      const sessionData = JSON.parse(localStorage.getItem('admin_session') || '{}');
      sessionData.settings = updatedAdminData.settings;
      localStorage.setItem('admin_session', JSON.stringify(sessionData));

    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  const handleMarkNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('admin_notifications')
        .update({ status: 'acknowledged' })
        .eq('notification_id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(notif => 
          notif.notification_id === notificationId 
            ? { ...notif, status: 'acknowledged' } 
            : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllNotificationsAsRead = async () => {
    try {
      const { error } = await supabase
        .from('admin_notifications')
        .update({ status: 'acknowledged' })
        .eq('status', 'pending');

      if (error) throw error;

      setNotifications(prev => 
        prev.map(notif => ({ ...notif, status: 'acknowledged' }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const calculateMetrics = () => {
    const unreadChats = conversations.filter(conv => 
      conv.unread_count > 0 && conv.is_complex
    ).length;
    
    const pendingConsultations = consultations.filter(cons => 
      cons.status === 'pending'
    ).length;
    
    const unreadNotifications = notifications.filter(notif => 
      notif.status === 'pending'
    ).length;
    
    const activeConversations = conversations.filter(conv => 
      conv.status === 'active' || conv.status === 'awaiting_admin' || conv.status === 'admin_handling'
    ).length;

    return {
      unreadChats,
      pendingConsultations,
      unreadNotifications,
      activeConversations
    };
  };

  const metrics = calculateMetrics();

  useEffect(() => {
    if (isAuthenticated) {
      const cleanup = setupRealTimeSubscriptions();
      return cleanup;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    return () => {
      if (currentSessionId) {
        trackSessionEnd(currentSessionId);
      }
    };
  }, [currentSessionId]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: theme === 'dark' ? '#0f172a' : '#f8fafc',
        color: theme === 'dark' ? '#f1f5f9' : '#0f172a'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ fontSize: '18px', fontWeight: 500 }}>Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginComponent onLogin={handleLogin} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme === 'dark' ? '#0f172a' : '#f8fafc',
      color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
      transition: 'all 0.3s ease'
    }}>
      {/* Top Navigation */}
      <TopNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        theme={theme}
        adminData={adminData}
        unreadNotifications={metrics.unreadNotifications}
        unreadChats={metrics.unreadChats}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        theme={theme}
        onSubmit={handleBookConsultation}
      />

      {/* Main Content Area */}
      <div style={{ padding: '20px', paddingTop: '30px' }}>
        {activeSection === 'dashboard' && (
          <DashboardCards
            unreadChats={metrics.unreadChats}
            pendingConsultations={metrics.pendingConsultations}
            unreadNotifications={metrics.unreadNotifications}
            activeConversations={metrics.activeConversations}
            onCardClick={setActiveSection}
            theme={theme}
            onBookConsultation={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeSection === 'conversations' && (
          <LiveChatsComponent
            conversations={conversations}
            theme={theme}
            onSelectConversation={setSelectedConversation}
            selectedConversation={selectedConversation}
            adminData={adminData}
            socket={socket}
            isSocketConnected={isSocketConnected}
          />
        )}

        {activeSection === 'consultations' && (
          <ConsultationsManagement
            consultations={consultations}
            onUpdateConsultation={handleUpdateConsultation}
            onDeleteConsultation={handleDeleteConsultation}
            theme={theme}
            onBookConsultation={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeSection === 'notifications' && (
          <NotificationsComponent
            notifications={notifications}
            theme={theme}
            onMarkAsRead={handleMarkNotificationAsRead}
            onMarkAllAsRead={handleMarkAllNotificationsAsRead}
          />
        )}

        {activeSection === 'analytics' && (
          <AnalyticsDashboard
            theme={theme}
            adminData={adminData}
            consultations={consultations}
            conversations={conversations}
            analytics={analytics}
          />
        )}

        {activeSection === 'notes' && (
          <NotesComponent
            theme={theme}
            adminData={adminData}
          />
        )}

        {activeSection === 'settings' && (
          <SettingsComponent
            adminData={adminData}
            theme={theme}
            onUpdateSettings={handleUpdateSettings}
            onLogout={handleLogout}
          />
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;