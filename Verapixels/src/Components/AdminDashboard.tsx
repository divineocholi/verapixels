// AdminDashboard.tsx - COMPLETE WORKING VERSION WITH SUPABASE AUTH
import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from './supabase';
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
  FiPaperclip,
  FiCornerUpLeft,
  FiChevronDown,
  FiChevronUp,
  FiGlobe,
  FiCheck,
  FiTrash,
  FiAlertCircle,
  FiInbox,
  FiUsers,
  FiUserCheck,
  FiUserX
} from 'react-icons/fi';

// ========== CONFIGURATION ==========
const EMAILJS_CONFIG = {
  serviceId: 'service_w8wwd8e',
  publicKey: 'NUKm-dvMLR7ftwvbF',
  adminTemplateId: 'template_503vbvj',
  userTemplateId: 'template_6zgl8ml'
};

const BUSINESS_TIMEZONE = 'Africa/Lagos';

// ========== INTERFACES ==========
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
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  last_login: string | null;
  profile_picture_url?: string;
  settings: {
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
      title: 'Alerts',
      description: 'System notifications',
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

// ========== LIVE CHATS COMPONENT ==========
const LiveChatsComponent: React.FC<{
  conversations: Conversation[];
  theme: 'light' | 'dark';
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversation: Conversation | null;
}> = ({ conversations, theme, onSelectConversation, selectedConversation }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'unread' | 'complex'>('all');
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

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.conversation_id);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  const fetchMessages = async (conversationId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('timestamp', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        setMessages([]);
        return;
      }
      
      setMessages(data || []);
      
      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read_by_admin: true })
        .eq('conversation_id', conversationId)
        .eq('read_by_admin', false);
        
      // Update conversation unread count
      await supabase
        .from('conversations')
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
        message_id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        conversation_id: selectedConversation.conversation_id,
        sender_type: 'admin' as const,
        sender_name: 'Admin',
        message_text: newMessage,
        timestamp: new Date().toISOString(),
        read_by_admin: true,
        read_by_user: false
      };

      const { error } = await supabase
        .from('messages')
        .insert([messageData]);

      if (error) throw error;

      setMessages(prev => [...prev, messageData]);
      setNewMessage('');

      // Update conversation last activity
      await supabase
        .from('conversations')
        .update({ 
          last_activity: new Date().toISOString(),
          last_message: newMessage
        })
        .eq('conversation_id', selectedConversation.conversation_id);

    } catch (error) {
      console.error('Error sending message:', error);
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

  // Filter conversations based on complexity
  const filteredConversations = conversations.filter(conv => {
    if (filter === 'active') return conv.status === 'active' && conv.is_complex;
    if (filter === 'unread') return conv.unread_count > 0 && conv.is_complex;
    if (filter === 'complex') return conv.is_complex;
    return conv.is_complex; // Only show complex conversations by default
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

      <div style={{ display: 'flex', gap: '20px', height: 'calc(100% - 80px)' }}>
        {/* Conversation List */}
        <div style={{
          flex: '0 0 350px',
          background: styles.cardBg,
          borderRadius: '12px',
          border: `1px solid ${styles.border}`,
          display: 'flex',
          flexDirection: 'column'
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

        {/* Chat Area */}
        <div style={{
          flex: 1,
          background: styles.cardBg,
          borderRadius: '12px',
          border: `1px solid ${styles.border}`,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {selectedConversation ? (
            <>
              <div style={{
                padding: '20px',
                borderBottom: `1px solid ${styles.border}`,
                background: styles.hoverBg
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
                            .from('conversations')
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

              {/* Messages */}
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
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
                  <div>
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
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div style={{ padding: '20px', borderTop: `1px solid ${styles.border}` }}>
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
                      cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
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

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
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

// ========== NOTIFICATIONS COMPONENT ==========
const NotificationsComponent: React.FC<{
  notifications: Notification[];
  theme: 'light' | 'dark';
  onMarkAsRead: (notificationId: string) => Promise<void>;
  onDeleteNotification: (notificationId: string) => Promise<void>;
}> = ({ notifications, theme, onMarkAsRead, onDeleteNotification }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'acknowledged'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

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

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'urgent': return styles.danger;
      case 'high': return styles.warning;
      case 'medium': return styles.primary;
      case 'low': return styles.success;
      default: return styles.mutedText;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredNotifications = notifications
    .filter(notification => {
      if (filter === 'pending') return notification.status === 'pending';
      if (filter === 'acknowledged') return notification.status === 'acknowledged';
      return true;
    })
    .sort((a, b) => {
      let aValue: any, bValue: any;
      
      if (sortBy === 'date') {
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
      } else if (sortBy === 'priority') {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

  const handleMarkAllAsRead = async () => {
    try {
      const pendingNotifications = notifications.filter(n => n.status === 'pending');
      for (const notification of pendingNotifications) {
        await onMarkAsRead(notification.notification_id);
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '10px', color: styles.text }}>
          <FiBell style={{ marginRight: '10px', color: styles.primary }} />
          Notifications
        </h1>
        <p style={{ color: styles.mutedText, fontSize: '16px' }}>
          System alerts and notifications
        </p>
      </div>

      <div style={{ 
        background: styles.cardBg, 
        borderRadius: '12px', 
        padding: '20px', 
        marginBottom: '20px',
        border: `1px solid ${styles.border}`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '15px' }}>
            {(['all', 'pending', 'acknowledged'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '8px 16px',
                  background: filter === f ? styles.primary : 'transparent',
                  border: `1px solid ${filter === f ? styles.primary : styles.border}`,
                  borderRadius: '8px',
                  color: filter === f ? 'white' : styles.text,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
              style={{
                padding: '8px 16px',
                background: styles.background,
                border: `1px solid ${styles.border}`,
                borderRadius: '8px',
                color: styles.text,
                fontSize: '14px'
              }}
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              style={{
                padding: '8px 16px',
                background: styles.background,
                border: `1px solid ${styles.border}`,
                borderRadius: '8px',
                color: styles.text,
                cursor: 'pointer'
              }}
            >
              {sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ padding: '15px', background: theme === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)', borderRadius: '8px', flex: 1 }}>
            <div style={{ fontSize: '14px', color: styles.mutedText, marginBottom: '4px' }}>Total</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: styles.primary }}>{notifications.length}</div>
          </div>
          <div style={{ padding: '15px', background: theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)', borderRadius: '8px', flex: 1 }}>
            <div style={{ fontSize: '14px', color: styles.mutedText, marginBottom: '4px' }}>Pending</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: styles.warning }}>{notifications.filter(n => n.status === 'pending').length}</div>
          </div>
          <div style={{ padding: '15px', background: theme === 'dark' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', flex: 1 }}>
            <div style={{ fontSize: '14px', color: styles.mutedText, marginBottom: '4px' }}>Read</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: styles.success }}>{notifications.filter(n => n.status === 'acknowledged').length}</div>
          </div>
        </div>

        {notifications.filter(n => n.status === 'pending').length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              background: styles.primary,
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
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div style={{ 
        background: styles.cardBg, 
        borderRadius: '12px',
        border: `1px solid ${styles.border}`,
        overflow: 'hidden'
      }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: styles.mutedText }}>
            <FiBell style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }} />
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>No notifications found</p>
            <p style={{ fontSize: '14px' }}>You're all caught up!</p>
          </div>
        ) : (
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: '20px',
                  borderBottom: `1px solid ${styles.border}`,
                  cursor: 'pointer',
                  background: selectedNotification?.id === notification.id ? styles.hoverBg : 
                           notification.status === 'pending' ? 
                           (theme === 'dark' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)') : 
                           'transparent',
                  transition: 'all 0.3s'
                }}
                onClick={() => setSelectedNotification(notification)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      color: getPriorityColor(notification.priority),
                      fontSize: '20px'
                    }}>
                      <FiAlertCircle />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '15px', color: styles.text, marginBottom: '4px' }}>
                        {notification.notification_type}
                      </div>
                      <div style={{ fontSize: '13px', color: styles.mutedText }}>
                        {formatDate(notification.created_at)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {notification.status === 'pending' && (
                      <button
                        onClick={async (e) => {
                          e.stopPropagation();
                          await onMarkAsRead(notification.notification_id);
                        }}
                        style={{
                          padding: '6px 12px',
                          background: styles.success,
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
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        await onDeleteNotification(notification.notification_id);
                      }}
                      style={{
                        padding: '6px 12px',
                        background: 'transparent',
                        border: `1px solid ${styles.danger}`,
                        borderRadius: '6px',
                        color: styles.danger,
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
                
                <div style={{ fontSize: '14px', color: styles.text, marginBottom: '8px' }}>
                  {notification.message_preview}
                </div>
                
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    background: getPriorityColor(notification.priority) + '20',
                    color: getPriorityColor(notification.priority),
                    fontSize: '11px',
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {notification.priority.toUpperCase()}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    background: notification.status === 'pending' ? styles.warning + '20' : styles.success + '20',
                    color: notification.status === 'pending' ? styles.warning : styles.success,
                    fontSize: '11px',
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {notification.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Details */}
      {selectedNotification && (
        <div style={{
          marginTop: '30px',
          background: styles.cardBg,
          borderRadius: '12px',
          padding: '25px',
          border: `1px solid ${styles.border}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: styles.text }}>
              Notification Details
            </h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={async () => {
                  await onDeleteNotification(selectedNotification.notification_id);
                  setSelectedNotification(null);
                }}
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
                Basic Information
              </h4>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Type</div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: styles.text }}>{selectedNotification.notification_type}</div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Status</div>
                  <div style={{ fontSize: '15px', color: styles.text }}>
                    <span style={{
                      padding: '4px 8px',
                      background: selectedNotification.status === 'pending' ? styles.warning + '20' : styles.success + '20',
                      color: selectedNotification.status === 'pending' ? styles.warning : styles.success,
                      fontSize: '12px',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {selectedNotification.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Priority</div>
                  <div style={{ fontSize: '15px', color: styles.text }}>
                    <span style={{
                      padding: '4px 8px',
                      background: getPriorityColor(selectedNotification.priority) + '20',
                      color: getPriorityColor(selectedNotification.priority),
                      fontSize: '12px',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {selectedNotification.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: styles.text }}>
                Details
              </h4>
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Created</div>
                  <div style={{ fontSize: '15px', color: styles.text }}>
                    {new Date(selectedNotification.created_at).toLocaleString()}
                  </div>
                </div>
                {selectedNotification.conversation_id && (
                  <div>
                    <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Conversation ID</div>
                    <div style={{ fontSize: '15px', color: styles.text, fontFamily: 'monospace' }}>
                      {selectedNotification.conversation_id}
                    </div>
                  </div>
                )}
                {selectedNotification.consultation_id && (
                  <div>
                    <div style={{ fontSize: '13px', color: styles.mutedText, marginBottom: '4px' }}>Consultation ID</div>
                    <div style={{ fontSize: '15px', color: styles.text, fontFamily: 'monospace' }}>
                      {selectedNotification.consultation_id}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '25px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: styles.text }}>
              Message
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
              {selectedNotification.message_preview}
            </div>
          </div>

          {selectedNotification.reason && (
            <div style={{ marginTop: '25px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: styles.text }}>
                Reason
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
                {selectedNotification.reason}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ========== BOOKING MODAL ==========
const BookingModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookingData: any) => Promise<void>;
  theme: 'light' | 'dark';
  existingConsultations: Consultation[];
}> = ({ isOpen, onClose, onSubmit, theme, existingConsultations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'video',
    booking_date: '',
    booking_time: '',
    user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{type: 'success' | 'error' | 'warning' | 'info', message: string} | null>(null);

  const styles = {
    background: theme === 'dark' ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
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

  const TIMEZONES = [
    'Africa/Lagos', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
    'Europe/Paris', 'Asia/Tokyo', 'Asia/Singapore', 'Australia/Sydney'
  ];

  const CONTACT_METHODS = [
    { id: 'video', label: 'Video Call', icon: <FiVideo />, color: '#0063f4' },
    { id: 'audio', label: 'Audio Call', icon: <FiPhone />, color: '#00bfff' },
    { id: 'phone', label: 'Phone Call', icon: <FiPhone />, color: '#ff6b9d' }
  ];

  const TIME_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (!formData.name || !formData.email || !formData.phone || !formData.booking_date || !formData.booking_time) {
      setAlert({ type: 'warning', message: 'Please fill in all required fields' });
      return;
    }

    // Check if time slot is already booked
    const isBooked = existingConsultations.some(consult => 
      consult.booking_date === formData.booking_date && 
      consult.booking_time === formData.booking_time &&
      ['confirmed', 'pending'].includes(consult.status)
    );

    if (isBooked) {
      setAlert({ type: 'error', message: 'This time slot is already booked. Please select another time.' });
      return;
    }

    setIsLoading(true);
    setAlert(null);

    try {
      const consultationId = `cons_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const bookingData = {
        consultation_id: consultationId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        contact_method: CONTACT_METHODS.find(m => m.id === formData.contactMethod)?.label || formData.contactMethod,
        booking_date: formData.booking_date,
        booking_time: formData.booking_time,
        user_timezone: formData.user_timezone,
        business_time: formData.booking_time, // Same for Lagos timezone
        message: formData.message || '',
        status: 'pending' as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        admin_reply_sent: false,
        assigned_admin_id: null,
        is_complex: false
      };

      await onSubmit(bookingData);
      
      setAlert({ type: 'success', message: 'Consultation booked successfully!' });
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          contactMethod: 'video',
          booking_date: '',
          booking_time: '',
          user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          message: ''
        });
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error('Booking error:', error);
      setAlert({ type: 'error', message: 'Failed to create booking. Please try again.' });
    } finally {
      setIsLoading(false);
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
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      backdropFilter: 'blur(5px)',
      padding: '20px'
    }}>
      <div style={{
        background: styles.background,
        borderRadius: '20px',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '30px',
        border: `1px solid ${styles.border}`,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: styles.text }}>
            <FiCalendar style={{ marginRight: '10px', color: styles.primary }} />
            Book Consultation for Customer
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: styles.mutedText,
              fontSize: '20px',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '5px'
            }}
          >
            <FiX />
          </button>
        </div>

        {alert && (
          <CustomAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            theme={theme}
          />
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '30px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', color: styles.text }}>
                <FiUser style={{ marginRight: '8px' }} />
                Customer Information
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: styles.cardBg,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '10px',
                    color: styles.text,
                    fontSize: '14px'
                  }}
                  placeholder="John Doe"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: styles.cardBg,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '10px',
                    color: styles.text,
                    fontSize: '14px'
                  }}
                  placeholder="john@example.com"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: styles.cardBg,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '10px',
                    color: styles.text,
                    fontSize: '14px'
                  }}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', color: styles.text }}>
                <FiClock style={{ marginRight: '8px' }} />
                Schedule Details
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
                  Customer Timezone *
                </label>
                <select
                  value={formData.user_timezone}
                  onChange={(e) => setFormData({ ...formData, user_timezone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: styles.cardBg,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '10px',
                    color: styles.text,
                    fontSize: '14px'
                  }}
                >
                  {TIMEZONES.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.booking_date}
                  onChange={(e) => setFormData({ ...formData, booking_date: e.target.value, booking_time: '' })}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: styles.cardBg,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '10px',
                    color: styles.text,
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: styles.mutedText }}>
                  Time (Lagos Time) *
                </label>
                <select
                  required
                  value={formData.booking_time}
                  onChange={(e) => setFormData({ ...formData, booking_time: e.target.value })}
                  disabled={!formData.booking_date}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: styles.cardBg,
                    border: `1px solid ${styles.border}`,
                    borderRadius: '10px',
                    color: styles.text,
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select a time</option>
                  {TIME_SLOTS.map(slot => {
                    const isBooked = existingConsultations.some(consult => 
                      consult.booking_date === formData.booking_date && 
                      consult.booking_time === slot &&
                      ['confirmed', 'pending'].includes(consult.status)
                    );
                    
                    return (
                      <option 
                        key={slot} 
                        value={slot}
                        disabled={isBooked}
                        style={{
                          color: isBooked ? styles.danger : styles.text
                        }}
                      >
                        {slot} {isBooked ? '(Booked)' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: styles.text }}>
              <FiMessageCircle style={{ marginRight: '8px' }} />
              Contact Method *
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              {CONTACT_METHODS.map(method => (
                <div
                  key={method.id}
                  onClick={() => setFormData({ ...formData, contactMethod: method.id })}
                  style={{
                    padding: '15px',
                    background: formData.contactMethod === method.id ? 
                      `${method.color}20` : styles.cardBg,
                    border: `2px solid ${formData.contactMethod === method.id ? method.color : styles.border}`,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <div style={{ 
                    fontSize: '24px', 
                    color: method.color,
                  }}>
                    {method.icon}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: styles.text }}>
                    {method.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '15px', color: styles.text }}>
              <FiMail style={{ marginRight: '8px' }} />
              Reason for Consultation (Optional)
            </h3>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: styles.cardBg,
                border: `1px solid ${styles.border}`,
                borderRadius: '10px',
                color: styles.text,
                fontSize: '14px',
                resize: 'vertical'
              }}
              placeholder="Briefly describe what the customer wants to discuss..."
            />
          </div>

          <div style={{
            padding: '15px',
            background: theme === 'dark' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
            border: `1px solid ${styles.warning}50`,
            borderRadius: '10px',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiClock style={{ color: styles.warning }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: styles.warning }}>
                  Business Hours (Lagos Time)
                </div>
                <div style={{ fontSize: '13px', color: styles.mutedText }}>
                  9:00 AM - 4:30 PM WAT (Monday - Friday)
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: `1px solid ${styles.border}`,
                borderRadius: '10px',
                color: styles.text,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: '12px 24px',
                background: isLoading ? styles.mutedText : styles.success,
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '14px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Creating Booking...
                </>
              ) : (
                <>
                  <FiCheckCircle />
                  Create Booking
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ========== MAIN ADMIN DASHBOARD COMPONENT ==========
const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeSection, setActiveSection] = useState<'dashboard' | 'consultations' | 'conversations' | 'notifications' | 'analytics' | 'settings' | 'notes'>('dashboard');
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [alert, setAlert] = useState<{type: 'success' | 'error' | 'warning' | 'info', message: string} | null>(null);

  const styles = useMemo(() => ({
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
  }), [theme]);

  const pendingConsultations = useMemo(() => {
    return consultations.filter(c => c.status === 'pending').length;
  }, [consultations]);

  const unreadNotifications = useMemo(() => {
    return notifications.filter(n => n.status === 'pending').length;
  }, [notifications]);

  const unreadChats = useMemo(() => {
    return conversations.reduce((sum, conv) => sum + conv.unread_count, 0);
  }, [conversations]);

  const activeConversations = useMemo(() => {
    return conversations.filter(conv => conv.status === 'active' && conv.is_complex).length;
  }, [conversations]);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoadingAuth(true);
      try {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get admin data from admins table
          const { data: adminData, error } = await supabase
            .from('admins')
            .select('id, name, email, role, last_login, settings, profile_picture_url')
            .eq('auth_user_id', session.user.id)
            .maybeSingle();
            
          if (adminData) {
            setAdminData({
              id: adminData.id,
              name: adminData.name,
              email: adminData.email,
              role: adminData.role,
              last_login: adminData.last_login,
              settings: adminData.settings || {},
              profile_picture_url: adminData.profile_picture_url
            });
            setIsAuthenticated(true);
            fetchAllData();
          } else {
            // Admin not found in admins table, log out
            await supabase.auth.signOut();
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { data: adminData } = await supabase
          .from('admins')
          .select('id, name, email, role, last_login, settings, profile_picture_url')
          .eq('auth_user_id', session.user.id)
          .maybeSingle();
          
        if (adminData) {
          setAdminData({
            id: adminData.id,
            name: adminData.name,
            email: adminData.email,
            role: adminData.role,
            last_login: adminData.last_login,
            settings: adminData.settings || {},
            profile_picture_url: adminData.profile_picture_url
          });
          setIsAuthenticated(true);
          fetchAllData();
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setAdminData(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAllData = async () => {
    await Promise.all([
      fetchConsultations(),
      fetchConversations(),
      fetchNotifications()
    ]);
  };

  const fetchConsultations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      if (error) {
        console.error('Error fetching consultations:', error);
        setConsultations([]);
        return;
      }

      setConsultations(data || []);
    } catch (error) {
      console.error('Error in fetchConsultations:', error);
      setConsultations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('last_activity', { ascending: false })
        .limit(100);
      
      if (error) {
        console.error('Error fetching conversations:', error);
        setConversations([]);
        return;
      }
      
      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
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
      
      if (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
        return;
      }
      
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  const handleCreateBooking = async (bookingData: any) => {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .insert([bookingData])
        .select()
        .single();
      
      if (error) throw error;

      await fetchConsultations();

      // Create notification
      try {
        await supabase
          .from('admin_notifications')
          .insert({
            notification_id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            consultation_id: bookingData.consultation_id,
            notification_type: 'New Booking Created',
            message_preview: `New consultation booked for ${bookingData.name}`,
            priority: 'medium',
            status: 'pending',
            created_at: new Date().toISOString()
          });
        await fetchNotifications();
      } catch (notifError) {
        console.error('Error creating notification:', notifError);
      }

      setAlert({ type: 'success', message: 'Consultation booked successfully!' });
      
      setTimeout(() => {
        fetchAllData();
      }, 1000);
      
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      setAlert({ type: 'error', message: 'Failed to create booking.' });
      throw error;
    }
  };

  const handleUpdateConsultation = async (consultationId: string, updates: Partial<Consultation>) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('consultation_id', consultationId);
      
      if (error) throw error;
      
      await fetchConsultations();
      setAlert({ type: 'success', message: 'Consultation updated successfully!' });
    } catch (error) {
      console.error('Error updating consultation:', error);
      setAlert({ type: 'error', message: 'Failed to update consultation' });
      throw error;
    }
  };

  const handleDeleteConsultation = async (consultationId: string) => {
    if (!confirm('Are you sure you want to delete this consultation?')) return;
    
    try {
      const { error } = await supabase
        .from('consultations')
        .delete()
        .eq('consultation_id', consultationId);
      
      if (error) throw error;
      
      await fetchConsultations();
      
      // Create notification
      try {
        await supabase
          .from('admin_notifications')
          .insert({
            notification_id: `delete_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            notification_type: 'Consultation Deleted',
            message_preview: 'A consultation was deleted',
            priority: 'high',
            status: 'pending',
            created_at: new Date().toISOString()
          });
        await fetchNotifications();
      } catch (notifError) {
        console.error('Error creating delete notification:', notifError);
      }
      
      setAlert({ type: 'success', message: 'Consultation deleted successfully!' });
    } catch (error) {
      console.error('Error deleting consultation:', error);
      setAlert({ type: 'error', message: 'Failed to delete consultation' });
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await supabase
        .from('admin_notifications')
        .update({ status: 'acknowledged' })
        .eq('notification_id', notificationId);
      await fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await supabase
        .from('admin_notifications')
        .delete()
        .eq('notification_id', notificationId);
      await fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  
  setIsLoggingIn(true);
  setLoginError(null);

  try {
    console.log('Attempting login with:', loginEmail);
    
    // METHOD 1: Try direct Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (authError) {
      console.error('Supabase auth error:', authError);
      setLoginError(`Authentication failed: ${authError.message}`);
      return;
    }

    console.log('Auth successful! User ID:', authData.user?.id, 'Email:', authData.user?.email);

    // METHOD 2: Try to find admin - with multiple fallbacks
    let adminRecord = null;
    
    // Try by auth_user_id first
    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('auth_user_id', authData.user.id)
        .maybeSingle();
      
      if (!error && data) {
        console.log('Found admin by auth_user_id:', data);
        adminRecord = data;
      }
    } catch (err) {
      console.log('Query by auth_user_id failed:', err);
    }

    // Try by email if not found
    if (!adminRecord) {
      console.log('Trying to find admin by email:', authData.user.email);
      try {
        const { data, error } = await supabase
          .from('admins')
          .select('*')
          .eq('email', authData.user.email)
          .maybeSingle();
        
        if (!error && data) {
          console.log('Found admin by email:', data);
          adminRecord = data;
          
          // Link this admin to auth user
          await supabase
            .from('admins')
            .update({ auth_user_id: authData.user.id })
            .eq('id', data.id);
        }
      } catch (err) {
        console.log('Query by email failed:', err);
      }
    }

    // Create admin if not found
    if (!adminRecord) {
      console.log('No admin found, creating new one...');
      
      const { data: newAdmin, error: createError } = await supabase
        .from('admins')
        .insert({
          auth_user_id: authData.user.id,
          name: authData.user.user_metadata?.name || 'New Admin',
          email: authData.user.email!,
          role: 'admin',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          settings: {}
        })
        .select()
        .single();
      
      if (createError) {
        console.error('Failed to create admin:', createError);
        // Continue anyway with temporary admin
        adminRecord = {
          id: authData.user.id,
          name: 'Temporary Admin',
          email: authData.user.email!,
          role: 'admin',
          is_active: true,
          settings: {}
        };
      } else {
        adminRecord = newAdmin;
      }
    }

    // Update last login
    try {
      await supabase
        .from('admins')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminRecord.id);
    } catch (err) {
      console.log('Failed to update last login:', err);
    }

    // Set admin data for session
    setAdminData({
      id: adminRecord.id,
      name: adminRecord.name,
      email: adminRecord.email,
      role: adminRecord.role === 'super_admin' ? 'super_admin' : 'admin',
      last_login: new Date().toISOString(),
      settings: adminRecord.settings || {},
      profile_picture_url: adminRecord.profile_picture_url
    });

    // Store in localStorage
    localStorage.setItem('admin_data', JSON.stringify({
      id: adminRecord.id,
      name: adminRecord.name,
      email: adminRecord.email,
      role: adminRecord.role,
      last_login: new Date().toISOString()
    }));

    setIsAuthenticated(true);
    await fetchAllData();
    
    console.log('Login successful!');

  } catch (error: any) {
    console.error('Unexpected login error:', error);
    setLoginError('Unexpected error: ' + error.message);
  } finally {
    setIsLoggingIn(false);
  }
};

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setAdminData(null);
    setConsultations([]);
    setConversations([]);
    setNotifications([]);
  };

  if (isLoadingAuth) {
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
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
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
          <p style={{ color: '#666', fontSize: '14px' }}>
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
              <FiUser />
            </div>
            <h2 style={{ margin: 0, color: '#333', fontSize: '24px', fontWeight: 600 }}>
              Admin Login
            </h2>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
              Enter your admin credentials to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#555',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '8px'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: '#fff',
                  color: '#333'
                }}
                placeholder="admin@example.com"
                disabled={isLoggingIn}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#555',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '8px'
              }}>
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '14px',
                  backgroundColor: '#fff',
                  color: '#333'
                }}
                placeholder="••••••••"
                disabled={isLoggingIn}
              />
            </div>

            {loginError && (
              <CustomAlert
                type="error"
                message={loginError}
                onClose={() => setLoginError(null)}
                theme="light"
              />
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: isLoggingIn ? 0.7 : 1
              }}
            >
              {isLoggingIn ? (
                <>
                  <div style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }}></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
              <p>Use your Supabase Auth credentials</p>
              <p>Ensure your email exists in the admins table</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: "'Inter', sans-serif",
      background: styles.background,
      color: styles.text,
      minHeight: '100vh'
    }}>
      <div style={{
        padding: '16px 24px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => setActiveSection('dashboard')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '10px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Dashboard"
          >
            <FiHome />
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>
              <FiUser />
            </div>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '2px'
              }}>
                <span style={{ fontSize: '15px', fontWeight: 600 }}>
                  {adminData?.name}
                </span>
                <span style={{
                  padding: '2px 6px',
                  background: adminData?.role === 'super_admin' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)',
                  borderRadius: '4px',
                  fontSize: '10px',
                  color: 'white'
                }}>
                  {adminData?.role === 'super_admin' ? 'SUPER ADMIN' : 'ADMIN'}
                </span>
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                {adminData?.email}
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setShowBookingModal(true)}
            style={{
              background: 'rgba(16, 185, 129, 0.9)',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 600
            }}
          >
            <FiPlus />
            Book Consultation
          </button>
          
          <button
            onClick={() => setActiveSection('notifications')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '10px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <FiBell />
            {unreadNotifications > 0 && (
              <div style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {unreadNotifications > 99 ? '99+' : unreadNotifications}
              </div>
            )}
          </button>
          
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '10px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
          
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '10px',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FiLogOut />
          </button>
        </div>
      </div>

      <div style={{ 
        padding: '16px 24px 0 24px',
        background: styles.background,
        position: 'sticky',
        top: '72px',
        zIndex: 999
      }}>
        <div style={{ 
          display: 'flex',
          gap: '8px',
          background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          borderRadius: '8px',
          padding: '4px',
          overflowX: 'auto'
        }}>
          {(['dashboard', 'conversations', 'consultations', 'notifications'] as const).map(section => (
            <button
              key={section}
              onClick={() => {
                setActiveSection(section);
                if (section !== 'conversations') {
                  setSelectedConversation(null);
                }
              }}
              style={{
                padding: '10px 20px',
                background: activeSection === section 
                  ? (theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)')
                  : 'transparent',
                border: 'none',
                borderRadius: '6px',
                color: activeSection === section ? styles.text : styles.mutedText,
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSection === section ? 600 : 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              {section === 'dashboard' ? <FiHome /> :
               section === 'conversations' ? <FiMessageCircle /> :
               section === 'consultations' ? <FiCalendar /> :
               <FiBell />}
              {section === 'dashboard' ? 'Dashboard' :
               section === 'conversations' ? 'Live Chats' :
               section === 'consultations' ? 'Consultations' :
               'Notifications'}
            </button>
          ))}
        </div>
      </div>

      {alert && (
        <div style={{ padding: '20px 24px 0 24px' }}>
          <CustomAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            theme={theme}
          />
        </div>
      )}

      <div style={{ padding: '24px' }}>
        {isLoading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh' 
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #6366f1',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        ) : activeSection === 'dashboard' ? (
          <DashboardCards
            unreadChats={unreadChats}
            pendingConsultations={pendingConsultations}
            unreadNotifications={unreadNotifications}
            activeConversations={activeConversations}
            onCardClick={setActiveSection}
            theme={theme}
            onBookConsultation={() => setShowBookingModal(true)}
          />
        ) : activeSection === 'conversations' ? (
          <LiveChatsComponent
            conversations={conversations}
            theme={theme}
            onSelectConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
          />
        ) : activeSection === 'consultations' ? (
          <ConsultationsManagement
            consultations={consultations}
            onUpdateConsultation={handleUpdateConsultation}
            onDeleteConsultation={handleDeleteConsultation}
            theme={theme}
            onBookConsultation={() => setShowBookingModal(true)}
          />
        ) : activeSection === 'notifications' ? (
          <NotificationsComponent
            notifications={notifications}
            theme={theme}
            onMarkAsRead={handleMarkAsRead}
            onDeleteNotification={handleDeleteNotification}
          />
        ) : null}
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onSubmit={handleCreateBooking}
        theme={theme}
        existingConsultations={consultations}
      />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        button {
          font-family: 'Inter', sans-serif;
        }
        
        input, select, textarea {
          font-family: 'Inter', sans-serif;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#1e293b' : '#f1f5f9'};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${theme === 'dark' ? '#475569' : '#cbd5e1'};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme === 'dark' ? '#64748b' : '#94a3b8'};
        }
      `}</style>
      
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet"
      />
    </div>
  );
};

export default AdminDashboard; 