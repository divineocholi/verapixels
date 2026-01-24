import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from './supabase';
import type { ChartDataPoint } from './SimpleChart'; // TYPE-ONLY IMPORT
import { 
  SimpleBarChart, 
  SimpleLineChart, 
  SimplePieChart,
  SimpleDonutChart,
  generateChartData 
} from './SimpleChart';
// Error Boundary Component (updated for SimpleChart)
class ErrorBoundary extends React.Component<{ 
  children: React.ReactNode, 
  fallback?: React.ReactNode 
}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Chart Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Chart failed to load</div>;
    }
    return this.props.children;
  }
}

interface Admin {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin";
  created_at: string;
  last_login: string | null;
  is_active: boolean;
  created_by: string | null;
}

  // ✅ ADD THIS NEAR THE TOP OF THE FILE
const API_URL = import.meta.env.PROD
  ? 'https://verapixels-server.onrender.com'
  : 'http://localhost:5001';

// Static Data for Fallback
const STATIC_TRAFFIC_TRENDS = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
  visits: Math.floor(Math.random() * 100) + 50,
  unique_visitors: Math.floor(Math.random() * 80) + 30,
  avg_time_on_page: Math.floor(Math.random() * 120) + 30
}));

const STATIC_TRAFFIC_STATS = {
  today_visits: 245,
  today_unique_visitors: 189,
  avg_time_today: 87,
  bounce_rate_today: 32.5,
  active_now: 12
};

const STATIC_TRAFFIC_SOURCES = [
  { source: "Direct", visits: 120, unique_visits: 98, avg_time_on_page: 95, percentage: 35 },
  { source: "Google", visits: 85, unique_visits: 72, avg_time_on_page: 110, percentage: 25 },
  { source: "Social Media", visits: 65, unique_visits: 52, avg_time_on_page: 75, percentage: 19 },
  { source: "Referral", visits: 45, unique_visits: 38, avg_time_on_page: 82, percentage: 13 },
  { source: "Email", visits: 30, unique_visits: 25, avg_time_on_page: 105, percentage: 8 }
];

const STATIC_DEVICE_DATA = [
  { device_type: "Desktop", visits: 320, unique_sessions: 280, avg_time_on_page: 120 },
  { device_type: "Mobile", visits: 280, unique_sessions: 245, avg_time_on_page: 85 },
  { device_type: "Tablet", visits: 75, unique_sessions: 65, avg_time_on_page: 95 }
];

const STATIC_GEOGRAPHIC_DATA = [
  { country: "United States", visits: 245, unique_visitors: 210, unique_ips: 195 },
  { country: "United Kingdom", visits: 128, unique_visitors: 115, unique_ips: 108 },
  { country: "Canada", visits: 98, unique_visitors: 85, unique_ips: 82 },
  { country: "Australia", visits: 76, unique_visitors: 68, unique_ips: 65 },
  { country: "Germany", visits: 65, unique_visitors: 58, unique_ips: 55 }
];

// NEW: Traffic Analytics Interfaces
interface TrafficStats {
  today_visits: number;
  today_unique_visitors: number;
  avg_time_today: number;
  bounce_rate_today: number;
  active_now: number;
}

interface TrafficTrend {
  date: string;
  visits: number;
  unique_visitors: number;
  avg_time_on_page: number;
}

interface TopPage {
  page_path: string;
  visits: number;
  unique_visits: number;
  avg_time: number;
  bounce_rate: number;
}

interface TrafficSource {
  source: string;
  visits: number;
  unique_visits: number;
  avg_time_on_page: number;
  percentage: number;
}

interface DeviceData {
  device_type: string;
  visits: number;
  unique_sessions: number;
  avg_time_on_page: number;
}

interface GeographicData {
  country: string;
  visits: number;
  unique_visitors: number;
  unique_ips: number;
}

interface AnalyticsData {
  totalVisits: number;
  visitsToday: number;
  visitsThisWeek: number;
  visitsThisMonth: number;
  totalBookings: number;
  pendingBookings: number;
  totalConversations: number;
  unreadConversations: number;
  totalSubscribers: number;
  newSubscribersWeek: number;
  totalAdmins: number;
  activeAdmins: number;
  popularPages: { page: string; visits: number }[];
  bookingStatus: { status: string; count: number }[];
  conversationStatus: { status: string; count: number }[];
  monthlyVisits: { month: string; visits: number }[];
  
  // NEW: Real traffic analytics
  trafficStats?: TrafficStats | null;
  trafficTrends?: TrafficTrend[];
  trafficSources?: TrafficSource[];
  deviceBreakdown?: DeviceData[];
  geographicData?: GeographicData[];
}

const SuperadminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [invites, setInvites] = useState<AdminInvite[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "admins" | "analytics" | "settings"
  >("overview");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"admin" | "super_admin">(
    "admin"
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  const [inviteResult, setInviteResult] = useState<{
  email: string;
  inviteUrl: string;
  token: string;
} | null>(null);

  interface AdminInvite {
    id: string;
    token: string;
    email: string;
    role_assigned: string;
    expires_at: string;
    used: boolean;
  }

  // Load admin data
  useEffect(() => {
    const loadAdminData = async () => {
      const adminData = localStorage.getItem("admin_data");
      if (!adminData) {
        navigate("/superadmin/login");
        return;
      }

      try {
        const parsedData = JSON.parse(adminData);
        setAdmin(parsedData);
        await fetchAnalytics();
        await fetchAdmins();
        await fetchInvites();
        await fetchRecentActivity();
      } catch (error) {
        console.error("Error loading admin data:", error);
        navigate("/superadmin/login");
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [navigate]);

  // Fetch analytics
  const fetchAnalytics = useCallback(async () => {
    try {
      // Get dates for filtering
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Fetch basic data
      const [
        siteTrafficRes,
        bookingsRes,
        conversationsRes,
        subscribersRes,
        adminsRes
      ] = await Promise.all([
        supabase
          .from("site_traffic")
          .select("page_path, created_at, session_id, is_bounce, time_on_page")
          .gte("created_at", monthAgo.toISOString()),
        supabase.from("bookings").select("id, status, created_at"),
        supabase.from("conversations").select("id, status, created_at"),
        supabase.from("newsletter_subscribers").select("id, created_at"),
        supabase.from("admins").select("id, is_active")
      ]);

      // Extract data with defaults
      const siteTrafficData = siteTrafficRes.data || [];
      const bookingsData = bookingsRes.data || [];
      const conversationsData = conversationsRes.data || [];
      const subscribersData = subscribersRes.data || [];
      const adminsData = adminsRes.data || [];

      // Fetch traffic analytics with fallbacks
      const trafficPromises = [
        // Real-time stats
        (async () => {
          try {
            const res = await supabase.rpc('get_realtime_stats');
            return res.data?.[0] || STATIC_TRAFFIC_STATS;
          } catch {
            return STATIC_TRAFFIC_STATS;
          }
        })(),
        // Traffic trends
        (async () => {
          try {
            const res = await supabase.rpc('get_traffic_trends', { days_back: 30 });
            return res.data || STATIC_TRAFFIC_TRENDS;
          } catch {
            return STATIC_TRAFFIC_TRENDS;
          }
        })(),
        // Traffic sources
        (async () => {
          try {
            const res = await supabase.from('traffic_sources').select('*').limit(8);
            return res.data || STATIC_TRAFFIC_SOURCES;
          } catch {
            return STATIC_TRAFFIC_SOURCES;
          }
        })(),
        // Device breakdown
        (async () => {
          try {
            const res = await supabase.from('device_breakdown').select('*');
            return res.data || STATIC_DEVICE_DATA;
          } catch {
            return STATIC_DEVICE_DATA;
          }
        })(),
        // Geographic data
        (async () => {
          try {
            const res = await supabase.from('geographic_distribution').select('*').limit(10);
            return res.data || STATIC_GEOGRAPHIC_DATA;
          } catch {
            return STATIC_GEOGRAPHIC_DATA;
          }
        })()
      ];

      const [
        trafficStats,
        trafficTrends,
        trafficSources,
        deviceBreakdown,
        geographicData
      ] = await Promise.all(trafficPromises);

      // Calculate counts
      const totalVisits = siteTrafficData.length;
      const visitsThisWeek = siteTrafficData.filter((visit: any) => 
        new Date(visit.created_at) >= weekAgo
      ).length;
      const visitsThisMonth = totalVisits;
      
      const totalBookings = bookingsData.length;
      const pendingBookings = bookingsData.filter((b: any) => b.status === "pending").length;
      
      const totalConversations = conversationsData.length;
      const unreadConversations = conversationsData.filter((c: any) => c.status === "new").length;
      
      const totalSubscribers = subscribersData.length;
      const newSubscribersWeek = subscribersData.filter((s: any) => 
        new Date(s.created_at) >= weekAgo
      ).length;
      
      const totalAdmins = adminsData.length;
      const activeAdmins = adminsData.filter((a: any) => a.is_active).length;

      // Process popular pages
      const pageMap = new Map<string, number>();
      siteTrafficData.forEach((visit: any) => {
        const page = visit.page_path || "Unknown";
        pageMap.set(page, (pageMap.get(page) || 0) + 1);
      });
      const popularPages = Array.from(pageMap.entries())
        .map(([page, visits]) => ({ page, visits }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 5);

      // Process booking status
      const bookingStatusMap = new Map<string, number>();
      bookingsData.forEach((booking: any) => {
        bookingStatusMap.set(
          booking.status,
          (bookingStatusMap.get(booking.status) || 0) + 1
        );
      });
      const bookingStatus = Array.from(bookingStatusMap.entries()).map(
        ([status, count]) => ({ status, count })
      );

      // Process conversation status
      const conversationStatusMap = new Map<string, number>();
      conversationsData.forEach((conv: any) => {
        conversationStatusMap.set(
          conv.status,
          (conversationStatusMap.get(conv.status) || 0) + 1
        );
      });
      const conversationStatus = Array.from(
        conversationStatusMap.entries()
      ).map(([status, count]) => ({ status, count }));

      // Generate monthly visits data
      const monthlyVisits = (trafficTrends || []).slice(-6).map((trend: TrafficTrend) => ({
        month: new Date(trend.date).toLocaleString('default', { month: 'short' }),
        visits: trend.visits
      }));

      // Set analytics data
      const analyticsData: AnalyticsData = {
        totalVisits,
        visitsToday: trafficStats?.today_visits || 0,
        visitsThisWeek,
        visitsThisMonth,
        totalBookings,
        pendingBookings,
        totalConversations,
        unreadConversations,
        totalSubscribers,
        newSubscribersWeek,
        totalAdmins,
        activeAdmins,
        popularPages,
        bookingStatus,
        conversationStatus,
        monthlyVisits: monthlyVisits.length > 0 ? monthlyVisits : [
          { month: 'Jan', visits: 65 },
          { month: 'Feb', visits: 78 },
          { month: 'Mar', visits: 90 },
          { month: 'Apr', visits: 82 },
          { month: 'May', visits: 95 },
          { month: 'Jun', visits: 120 }
        ],
        trafficStats: trafficStats || null,
        trafficTrends: Array.isArray(trafficTrends) ? trafficTrends : [],
        trafficSources: Array.isArray(trafficSources) ? trafficSources : [],
        deviceBreakdown: Array.isArray(deviceBreakdown) ? deviceBreakdown : [],
        geographicData: Array.isArray(geographicData) ? geographicData : []
      };

      setAnalytics(analyticsData);

    } catch (error) {
      console.error("Error fetching analytics:", error);
      // Set default analytics on error
      const defaultAnalytics: AnalyticsData = {
        totalVisits: 0,
        visitsToday: 0,
        visitsThisWeek: 0,
        visitsThisMonth: 0,
        totalBookings: 0,
        pendingBookings: 0,
        totalConversations: 0,
        unreadConversations: 0,
        totalSubscribers: 0,
        newSubscribersWeek: 0,
        totalAdmins: 0,
        activeAdmins: 0,
        popularPages: [],
        bookingStatus: [],
        conversationStatus: [],
        monthlyVisits: [],
        trafficStats: STATIC_TRAFFIC_STATS,
        trafficTrends: STATIC_TRAFFIC_TRENDS,
        trafficSources: STATIC_TRAFFIC_SOURCES,
        deviceBreakdown: STATIC_DEVICE_DATA,
        geographicData: STATIC_GEOGRAPHIC_DATA
      };
      setAnalytics(defaultAnalytics);
    }
  }, []);

  // Fetch admin list
  const fetchAdmins = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  }, []);

  // Fetch invites
  const fetchInvites = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("admin_invites")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setInvites(data || []);
    } catch (error) {
      console.error("Error fetching invites:", error);
    }
  }, []);

  // Fetch recent activity
  const fetchRecentActivity = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("security_logs")
        .select(
          `
          *,
          admins(name)
        `
        )
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentActivity(data || []);
    } catch (error) {
      console.error("Error fetching activity:", error);
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("admin_data");
    navigate("/superadmin/login");
  };

  const handleCreateInvite = async () => {
  if (!inviteEmail.trim() || !admin) return;

  try {
    // ✅ NOW USES THE CONSTANT FROM TOP OF FILE
    const response = await fetch(`${API_URL}/api/admin/create-invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: inviteEmail,
        role: inviteRole,
        createdBy: admin.id
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to create invite');
    }

    // Show success modal instead of alert
    setInviteResult({
      email: result.email,
      inviteUrl: result.inviteUrl,
      token: result.token
    });

    // Clean up
    setInviteEmail("");
    setShowInviteModal(false);
    fetchInvites();
    fetchRecentActivity();

  } catch (error: any) {
    console.error("Error creating invite:", error);
    alert(`❌ Error: ${error.message}`);
  }
};
  // Deactivate admin
  const handleDeactivateAdmin = async (adminId: string, adminName: string) => {
    if (!window.confirm(`Are you sure you want to deactivate ${adminName}?`))
      return;
    if (!admin || admin.role !== "super_admin") {
      alert("Only super admins can deactivate admins.");
      return;
    }

    try {
      // Don't allow deactivating yourself
      if (adminId === admin.id) {
        alert("You cannot deactivate yourself.");
        return;
      }

      const { error } = await supabase
        .from("admins")
        .update({ is_active: false })
        .eq("id", adminId);

      if (error) throw error;

      // Log activity
      await supabase.from("security_logs").insert({
        admin_id: admin.id,
        action: "deactivate_admin",
        details: { deactivated_admin_id: adminId },
      });

      fetchAdmins();
      fetchRecentActivity();
      alert("Admin deactivated successfully.");
    } catch (error: any) {
      console.error("Error deactivating admin:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Colors for charts
  const colors = {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    light: "#f8fafc",
    dark: "#1e293b",
  };

  const chartColors = [
    colors.primary,
    colors.secondary,
    colors.success,
    colors.warning,
    colors.danger,
    colors.info,
  ];

  // Theme styles
  const styles = useMemo(
    () => ({
      background: theme === "dark" ? colors.dark : colors.light,
      text: theme === "dark" ? "#f1f5f9" : "#0f172a",
      cardBg: theme === "dark" ? "#1e293b" : "#ffffff",
      border: theme === "dark" ? "#334155" : "#e2e8f0",
      mutedText: theme === "dark" ? "#94a3b8" : "#64748b",
      hoverBg: theme === "dark" ? "#2d3748" : "#f1f5f9",
      sidebarBg: theme === "dark" ? "#0f172a" : "#f8fafc",
    }),
    [theme, colors]
  );

  // Calculate growth percentage for stats
  const calculateGrowth = () => {
    if (!analytics?.trafficTrends || analytics.trafficTrends.length < 2) return 0;
    const latest = analytics.trafficTrends[analytics.trafficTrends.length - 1];
    const previous = analytics.trafficTrends[analytics.trafficTrends.length - 2];
    return Math.round(((latest.visits - previous.visits) / previous.visits) * 100);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "3px solid #f3f3f3",
              borderTop: "3px solid #667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          ></div>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Loading dashboard...
          </p>
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: styles.background,
        color: styles.text,
        fontFamily: "'Inter', sans-serif",
        display: "flex",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: styles.sidebarBg,
          borderRight: `1px solid ${styles.border}`,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "18px",
              }}
            >
              <i className="fas fa-shield-alt"></i>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "16px" }}>
                Verapixel Admin
              </div>
              <div style={{ fontSize: "12px", color: colors.primary }}>
                {admin?.role === "super_admin" ? "Super Admin" : "Admin"}
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "10px",
              background: theme === "dark" ? "#2d3748" : "#f1f5f9",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <i className="fas fa-user" style={{ color: colors.primary }}></i>
              <span style={{ fontWeight: 500 }}>{admin?.name}</span>
            </div>
            <div
              style={{
                fontSize: "11px",
                color: styles.mutedText,
                marginTop: "4px",
              }}
            >
              {admin?.email}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: styles.mutedText,
                marginTop: "2px",
              }}
            >
              Last login:{" "}
              {admin?.last_login
                ? new Date(admin.last_login).toLocaleDateString()
                : "Never"}
            </div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {[
            { id: "overview", icon: "fas fa-chart-line", label: "Overview" },
            { id: "admins", icon: "fas fa-users", label: "Admin Management" },
            { id: "analytics", icon: "fas fa-chart-bar", label: "Analytics" },
            { id: "settings", icon: "fas fa-cog", label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "12px 16px",
                marginBottom: "8px",
                border: "none",
                background:
                  activeTab === item.id
                    ? theme === "dark"
                      ? "#3730a3"
                      : "#e0e7ff"
                    : "transparent",
                color: activeTab === item.id ? colors.primary : styles.text,
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = styles.hoverBg;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== item.id) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <i className={item.icon}></i>
              {item.label}
            </button>
          ))}
        </nav>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "20px",
            borderTop: `1px solid ${styles.border}`,
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px",
              background: theme === "dark" ? "#2d3748" : "#f1f5f9",
              border: `1px solid ${styles.border}`,
              color: styles.text,
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <div
          style={{
            padding: "20px 30px",
            borderBottom: `1px solid ${styles.border}`,
            background: styles.cardBg,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 600 }}>
            {activeTab === "overview"
              ? "Dashboard Overview"
              : activeTab === "admins"
              ? "Admin Management"
              : activeTab === "analytics"
              ? "Analytics"
              : "Settings"}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                padding: "6px 12px",
                background: theme === "dark" ? "#2d3748" : "#f1f5f9",
                borderRadius: "20px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <i className="fas fa-users" style={{ 
                color: analytics?.trafficStats?.active_now ? colors.success : styles.mutedText 
              }}></i>
              {analytics?.trafficStats?.active_now ? 
                `${analytics.trafficStats.active_now} active` : "No active"}
              <span style={{ margin: "0 4px" }}>•</span>
              <i className="fas fa-eye"></i>
              {analytics ? `${analytics.visitsToday} today` : "Loading..."}
              <span style={{ margin: "0 4px" }}>•</span>
              {analytics ? `Updated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Loading..."}
            </div>

            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              style={{
                padding: "8px 12px",
                background: theme === "dark" ? "#2d3748" : "#f1f5f9",
                border: `1px solid ${styles.border}`,
                borderRadius: "8px",
                color: styles.text,
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              <i
                className={theme === "light" ? "fas fa-moon" : "fas fa-sun"}
              ></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "30px" }}>
          {activeTab === "overview" && analytics && (
            <>
              {/* Stats Cards - ENHANCED WITH TRAFFIC ANALYTICS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                {[
                  {
                    title: "Total Visits",
                    value: analytics.totalVisits.toLocaleString(),
                    change: analytics.trafficTrends && analytics.trafficTrends.length >= 2 ? 
                      `${calculateGrowth()}% ${calculateGrowth() >= 0 ? 'increase' : 'decrease'}` : "+12%",
                    icon: "fas fa-eye",
                    color: colors.primary,
                    tooltip: "Total website visits"
                  },
                  {
                    title: "Unique Visitors",
                    value: analytics.trafficStats?.today_unique_visitors?.toLocaleString() || "0",
                    change: analytics.trafficStats ? 
                      `${Math.round(analytics.trafficStats.bounce_rate_today || 0)}% bounce rate` : "N/A",
                    icon: "fas fa-user",
                    color: colors.success,
                    tooltip: "Unique visitors today"
                  },
                  {
                    title: "Avg. Time on Site",
                    value: analytics.trafficStats ? 
                      `${analytics.trafficStats.avg_time_today?.toFixed(1)}s` : "0s",
                    change: analytics.trafficStats?.active_now ? 
                      `${analytics.trafficStats.active_now} active now` : "No active users",
                    icon: "fas fa-clock",
                    color: colors.warning,
                    tooltip: "Average time spent on site"
                  },
                  {
                    title: "Real-time Visitors",
                    value: analytics.trafficStats?.active_now || 0,
                    change: analytics.trafficTrends && analytics.trafficTrends.length > 0 ? 
                      `${analytics.trafficTrends[analytics.trafficTrends.length - 1]?.visits || 0} visits today` : "Today",
                    icon: "fas fa-chart-line",
                    color: colors.info,
                    tooltip: "Active visitors right now"
                  },
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      background: styles.cardBg,
                      borderRadius: "12px",
                      padding: "20px",
                      border: `1px solid ${styles.border}`,
                      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                      position: "relative",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 15px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "14px",
                            color: styles.mutedText,
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          {stat.title}
                          <i 
                            className="fas fa-info-circle" 
                            style={{ 
                              fontSize: "12px",
                              cursor: "help"
                            }}
                            title={stat.tooltip}
                          ></i>
                        </div>
                        <div
                          style={{
                            fontSize: "28px",
                            fontWeight: 700,
                            color: styles.text,
                          }}
                        >
                          {stat.value}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: stat.change.includes("decrease") || stat.change === "N/A" 
                              ? colors.danger 
                              : stat.change.includes("active") || stat.change.includes("visits") || stat.change.includes("bounce")
                              ? colors.info
                              : colors.success,
                            marginTop: "4px",
                          }}
                        >
                          <i
                            className={`fas fa-${stat.change.includes("increase") ? "arrow-up" : 
                              stat.change.includes("decrease") ? "arrow-down" :
                              stat.change.includes("active") || stat.change.includes("visits") ? "users" : "chart-pie"}`}
                          ></i>
                          {stat.change}
                        </div>
                      </div>
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          background: `${stat.color}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: stat.color,
                          fontSize: "20px",
                        }}
                      >
                        <i className={stat.icon}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                {/* Monthly Visits Chart - USING REAL TRAFFIC DATA */}
                <div
                  style={{
                    background: styles.cardBg,
                    borderRadius: "12px",
                    padding: "20px",
                    border: `1px solid ${styles.border}`,
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 20px 0",
                      fontSize: "16px",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>Traffic Trends (Last 30 Days)</span>
                    {analytics.trafficTrends && analytics.trafficTrends.length >= 2 && (
                      <span style={{
                        fontSize: "12px",
                        color: calculateGrowth() >= 0 ? colors.success : colors.danger,
                        background: calculateGrowth() >= 0 ? `${colors.success}20` : `${colors.danger}20`,
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}>
                        <i className={`fas fa-arrow-${calculateGrowth() >= 0 ? 'up' : 'down'}`}></i> 
                        {Math.abs(calculateGrowth())}% {calculateGrowth() >= 0 ? 'growth' : 'decline'}
                      </span>
                    )}
                  </h3>
                  <div style={{ height: "250px" }}>
                    <ErrorBoundary fallback={
                      <div style={{ 
                        height: "100%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        color: styles.mutedText 
                      }}>
                        Chart failed to load
                      </div>
                    }>
                      <SimpleLineChart 
                        data={generateChartData.fromTrafficTrends(analytics.trafficTrends || [])}
                        height={250}
                        title=""
                      />
                    </ErrorBoundary>
                  </div>
                </div>

                {/* Popular Pages */}
                <div
                  style={{
                    background: styles.cardBg,
                    borderRadius: "12px",
                    padding: "20px",
                    border: `1px solid ${styles.border}`,
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 20px 0",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Most Visited Pages
                  </h3>
                  <div>
                    {analytics.popularPages.map((page, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px 0",
                          borderBottom:
                            index < analytics.popularPages.length - 1
                              ? `1px solid ${styles.border}`
                              : "none",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background:
                                chartColors[index % chartColors.length],
                            }}
                          ></div>
                          <span style={{ fontSize: "14px" }}>
                            {page.page.length > 30
                              ? page.page.substring(0, 30) + "..."
                              : page.page}
                          </span>
                        </div>
                        <span
                          style={{ fontWeight: 600, color: colors.primary }}
                        >
                          {page.visits.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div
                style={{
                  background: styles.cardBg,
                  borderRadius: "12px",
                  padding: "20px",
                  border: `1px solid ${styles.border}`,
                }}
              >
                <h3
                  style={{
                    margin: "0 0 20px 0",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  Recent Activity
                </h3>
                <div>
                  {recentActivity.length === 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "40px",
                        color: styles.mutedText,
                      }}
                    >
                      No recent activity
                    </div>
                  ) : (
                    recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          padding: "12px 0",
                          borderBottom:
                            index < recentActivity.length - 1
                              ? `1px solid ${styles.border}`
                              : "none",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background:
                              theme === "dark" ? "#2d3748" : "#f1f5f9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: colors.primary,
                            fontSize: "14px",
                          }}
                        >
                          <i className="fas fa-history"></i>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 500, fontSize: "14px" }}>
                            {activity.action.replace("_", " ")}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: styles.mutedText,
                            }}
                          >
                            {activity.admins?.name || "System"} •{" "}
                            {new Date(activity.created_at).toLocaleString()}
                          </div>
                        </div>
                        <div
                          style={{
                            padding: "4px 8px",
                            background:
                              theme === "dark" ? "#2d3748" : "#f1f5f9",
                            borderRadius: "4px",
                            fontSize: "11px",
                            color: styles.mutedText,
                          }}
                        >
                          {activity.details?.email || "System event"}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === "admins" && (
            <div>
              {/* Admin Management Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 600 }}>
                    Admin Management
                  </h2>
                  <p
                    style={{
                      margin: "8px 0 0",
                      color: styles.mutedText,
                      fontSize: "14px",
                    }}
                  >
                    Manage admin accounts and permissions
                  </p>
                </div>

                {admin?.role === "super_admin" && (
                  <button
                    onClick={() => setShowInviteModal(true)}
                    style={{
                      padding: "10px 20px",
                      background: colors.primary,
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fas fa-user-plus"></i>
                    Invite New Admin
                  </button>
                )}
              </div>

              {/* Admin List */}
              <div
                style={{
                  background: styles.cardBg,
                  borderRadius: "12px",
                  border: `1px solid ${styles.border}`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 0.5fr",
                    padding: "15px 20px",
                    background: theme === "dark" ? "#2d3748" : "#f8fafc",
                    borderBottom: `1px solid ${styles.border}`,
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  <div>Name</div>
                  <div>Email</div>
                  <div>Role</div>
                  <div>Actions</div>
                </div>

                {admins.map((adm) => (
                  <div
                    key={adm.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 0.5fr",
                      padding: "15px 20px",
                      borderBottom: `1px solid ${styles.border}`,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background:
                            adm.role === "super_admin"
                              ? "linear-gradient(135deg, #667eea, #764ba2)"
                              : "linear-gradient(135deg, #10b981, #3b82f6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "14px",
                        }}
                      >
                        <i className="fas fa-user"></i>
                      </div>
                      <div>
                        <div style={{ fontWeight: 500 }}>{adm.name}</div>
                        <div
                          style={{ fontSize: "12px", color: styles.mutedText }}
                        >
                          Joined {new Date(adm.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div>{adm.email}</div>
                      <div
                        style={{ fontSize: "12px", color: styles.mutedText }}
                      >
                        Last login:{" "}
                        {adm.last_login
                          ? new Date(adm.last_login).toLocaleDateString()
                          : "Never"}
                      </div>
                    </div>

                    <div>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: 500,
                          background:
                            adm.role === "super_admin"
                              ? `${colors.primary}20`
                              : `${colors.success}20`,
                          color:
                            adm.role === "super_admin"
                              ? colors.primary
                              : colors.success,
                        }}
                      >
                        {adm.role === "super_admin" ? "Super Admin" : "Admin"}
                      </span>
                      {!adm.is_active && (
                        <span
                          style={{
                            marginLeft: "8px",
                            padding: "2px 8px",
                            background: colors.danger + "20",
                            color: colors.danger,
                            borderRadius: "4px",
                            fontSize: "10px",
                          }}
                        >
                          Inactive
                        </span>
                      )}
                    </div>

                    <div>
                      {admin?.role === "super_admin" &&
                        adm.id !== admin.id &&
                        adm.is_active && (
                          <button
                            onClick={() =>
                              handleDeactivateAdmin(adm.id, adm.name)
                            }
                            style={{
                              padding: "6px 12px",
                              background: colors.danger + "20",
                              color: colors.danger,
                              border: `1px solid ${colors.danger}40`,
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            Deactivate
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pending Invites */}
              {invites.length > 0 && (
                <div style={{ marginTop: "30px" }}>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      marginBottom: "15px",
                    }}
                  >
                    Pending Invites
                  </h3>
                  <div
                    style={{
                      background: styles.cardBg,
                      borderRadius: "12px",
                      border: `1px solid ${styles.border}`,
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        gap: "15px",
                      }}
                    >
                      {invites
                        .filter(
                          (inv) =>
                            !inv.used && new Date(inv.expires_at) > new Date()
                        )
                        .map((invite) => (
                          <div
                            key={invite.id}
                            style={{
                              padding: "15px",
                              background:
                                theme === "dark" ? "#2d3748" : "#f8fafc",
                              borderRadius: "8px",
                              border: `1px solid ${styles.border}`,
                            }}
                          >
                            <div
                              style={{ fontWeight: 500, marginBottom: "8px" }}
                            >
                              {invite.email}
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: styles.mutedText,
                                marginBottom: "4px",
                              }}
                            >
                              Role: {invite.role_assigned}
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: colors.warning,
                              }}
                            >
                              Expires:{" "}
                              {new Date(invite.expires_at).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "analytics" && analytics && (
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  marginBottom: "30px",
                }}
              >
                Detailed Analytics
              </h2>

              {/* NEW: Traffic Sources Chart */}
              {analytics.trafficSources && analytics.trafficSources.length > 0 && (
                <div
                  style={{
                    background: styles.cardBg,
                    borderRadius: "12px",
                    padding: "20px",
                    border: `1px solid ${styles.border}`,
                    marginBottom: "30px",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 20px 0",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    Traffic Sources
                  </h3>
                  <div style={{ height: "300px" }}>
                    <ErrorBoundary fallback={
                      <div style={{ 
                        height: "100%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        color: styles.mutedText 
                      }}>
                        Chart failed to load
                      </div>
                    }>
                      <SimpleBarChart 
                        data={generateChartData.fromTrafficSources(analytics.trafficSources || [])}
                        height={300}
                        title=""
                      />
                    </ErrorBoundary>
                  </div>
                </div>
              )}

              {/* NEW: Device & Geographic Distribution */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                  gap: "20px",
                  marginBottom: "30px",
                }}
              >
                {/* Device Breakdown */}
                {analytics.deviceBreakdown && analytics.deviceBreakdown.length > 0 && (
                  <div
                    style={{
                      background: styles.cardBg,
                      borderRadius: "12px",
                      padding: "20px",
                      border: `1px solid ${styles.border}`,
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 20px 0",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Device Distribution
                    </h3>
                    <div style={{ height: "250px" }}>
                      <ErrorBoundary fallback={
                        <div style={{ 
                          height: "100%", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          color: styles.mutedText 
                        }}>
                          Chart failed to load
                        </div>
                      }>
                        <SimplePieChart 
                          data={generateChartData.fromDeviceBreakdown(analytics.deviceBreakdown || [])}
                          height={250}
                          title=""
                        />
                      </ErrorBoundary>
                    </div>
                  </div>
                )}

                {/* Geographic Distribution */}
                {analytics.geographicData && analytics.geographicData.length > 0 && (
                  <div
                    style={{
                      background: styles.cardBg,
                      borderRadius: "12px",
                      padding: "20px",
                      border: `1px solid ${styles.border}`,
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 20px 0",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Geographic Distribution (Top 10)
                    </h3>
                    <div style={{ maxHeight: "250px", overflowY: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr>
                            <th style={{ 
                              textAlign: "left", 
                              padding: "10px", 
                              borderBottom: `1px solid ${styles.border}`,
                              color: styles.mutedText,
                              fontSize: "12px"
                            }}>
                              Country
                            </th>
                            <th style={{ 
                              textAlign: "left", 
                              padding: "10px", 
                              borderBottom: `1px solid ${styles.border}`,
                              color: styles.mutedText,
                              fontSize: "12px"
                            }}>
                              Visits
                            </th>
                            <th style={{ 
                              textAlign: "left", 
                              padding: "10px", 
                              borderBottom: `1px solid ${styles.border}`,
                              color: styles.mutedText,
                              fontSize: "12px"
                            }}>
                              Unique Visitors
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {analytics.geographicData.slice(0, 10).map((geo: GeographicData, index: number) => (
                            <tr key={index}>
                              <td style={{ 
                                padding: "10px", 
                                borderBottom: `1px solid ${styles.border}`,
                                fontSize: "14px"
                              }}>
                                <i className="fas fa-globe" style={{ marginRight: "8px" }}></i> 
                                {geo.country}
                              </td>
                              <td style={{ 
                                padding: "10px", 
                                borderBottom: `1px solid ${styles.border}`,
                                fontSize: "14px",
                                fontWeight: 500
                              }}>
                                {geo.visits.toLocaleString()}
                              </td>
                              <td style={{ 
                                padding: "10px", 
                                borderBottom: `1px solid ${styles.border}`,
                                fontSize: "14px",
                                color: colors.success
                              }}>
                                {geo.unique_visitors.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Status Chart */}
              <div
                style={{
                  background: styles.cardBg,
                  borderRadius: "12px",
                  padding: "20px",
                  border: `1px solid ${styles.border}`,
                  marginBottom: "30px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 20px 0",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  Booking Status Distribution
                </h3>
                <div style={{ height: "300px" }}>
                  <ErrorBoundary fallback={
                    <div style={{ 
                      height: "100%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      color: styles.mutedText 
                    }}>
                      Chart failed to load
                    </div>
                  }>
                    <SimpleDonutChart 
                      data={generateChartData.fromBookingStatus(analytics.bookingStatus || [])}
                      height={300}
                      title=""
                    />
                  </ErrorBoundary>
                </div>
              </div>

              {/* Conversation Status Chart */}
              <div
                style={{
                  background: styles.cardBg,
                  borderRadius: "12px",
                  padding: "20px",
                  border: `1px solid ${styles.border}`,
                  marginBottom: "30px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 20px 0",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  Conversation Status
                </h3>
                <div style={{ height: "300px" }}>
                  <ErrorBoundary fallback={
                    <div style={{ 
                      height: "100%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      color: styles.mutedText 
                    }}>
                      Chart failed to load
                    </div>
                  }>
                    <SimpleDonutChart 
                      data={generateChartData.fromBookingStatus(analytics.conversationStatus || [])}
                      height={300}
                      title=""
                      colors={chartColors.map((_, i) => chartColors[(i + 2) % chartColors.length])}
                    />
                  </ErrorBoundary>
                </div>
              </div>

              {/* Bar Chart for Popular Pages */}
              <div
                style={{
                  background: styles.cardBg,
                  borderRadius: "12px",
                  padding: "20px",
                  border: `1px solid ${styles.border}`,
                }}
              >
                <h3
                  style={{
                    margin: "0 0 20px 0",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  Top Pages by Visits
                </h3>
                <div style={{ height: "300px" }}>
                  <ErrorBoundary fallback={
                    <div style={{ 
                      height: "100%", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      color: styles.mutedText 
                    }}>
                      Chart failed to load
                    </div>
                  }>
                    <SimpleBarChart 
                      data={generateChartData.fromPopularPages(analytics.popularPages || [])}
                      height={300}
                      title=""
                    />
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div
              style={{
                background: styles.cardBg,
                borderRadius: "12px",
                padding: "30px",
                border: `1px solid ${styles.border}`,
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  marginBottom: "20px",
                }}
              >
                System Settings
              </h2>

              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 500,
                    color: styles.text,
                  }}
                >
                  Website Name
                </label>
                <input
                  type="text"
                  defaultValue="Verapixel"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: `1px solid ${styles.border}`,
                    borderRadius: "8px",
                    background: styles.background,
                    color: styles.text,
                    fontSize: "14px",
                  }}
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 500,
                    color: styles.text,
                  }}
                >
                  Default Timezone
                </label>
                <select
                  defaultValue="UTC"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: `1px solid ${styles.border}`,
                    borderRadius: "8px",
                    background: styles.background,
                    color: styles.text,
                    fontSize: "14px",
                  }}
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                </select>
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    color: styles.text,
                  }}
                >
                  <input type="checkbox" defaultChecked />
                  <span>Enable email notifications</span>
                </label>
              </div>

              <button
                style={{
                  padding: "12px 24px",
                  background: colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: styles.cardBg,
              borderRadius: "12px",
              padding: "30px",
              width: "100%",
              maxWidth: "500px",
              border: `1px solid ${styles.border}`,
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              Invite New Admin
            </h3>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  color: styles.text,
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="admin@example.com"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: `1px solid ${styles.border}`,
                  borderRadius: "8px",
                  background: styles.background,
                  color: styles.text,
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "14px",
                  color: styles.text,
                }}
              >
                Role
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                {["admin", "super_admin"].map((role) => (
                  <label
                    key={role}
                    style={{
                      flex: 1,
                      padding: "12px",
                      border: `1px solid ${
                        inviteRole === role ? colors.primary : styles.border
                      }`,
                      borderRadius: "8px",
                      background:
                        inviteRole === role
                          ? `${colors.primary}20`
                          : "transparent",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={inviteRole === role}
                      onChange={(e) => setInviteRole(e.target.value as any)}
                      style={{ display: "none" }}
                    />
                    {role === "super_admin" ? "Super Admin" : "Admin"}
                  </label>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setShowInviteModal(false)}
                style={{
                  padding: "10px 20px",
                  background: "transparent",
                  border: `1px solid ${styles.border}`,
                  color: styles.text,
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvite}
                disabled={!inviteEmail.trim()}
                style={{
                  padding: "10px 20px",
                  background: colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  opacity: !inviteEmail.trim() ? 0.5 : 1,
                }}
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Success Modal */}
{inviteResult && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1001,
    }}
  >
    <div
      style={{
        background: styles.cardBg,
        borderRadius: "12px",
        padding: "30px",
        width: "100%",
        maxWidth: "600px",
        border: `1px solid ${styles.border}`,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: `${colors.success}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 15px",
          }}
        >
          <i
            className="fas fa-check-circle"
            style={{ fontSize: "30px", color: colors.success }}
          ></i>
        </div>
        <h3
          style={{
            margin: "0 0 10px 0",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          Invite Created Successfully!
        </h3>
        <p style={{ color: styles.mutedText, fontSize: "14px", margin: 0 }}>
          Admin invite sent to <strong>{inviteResult.email}</strong>
        </p>
      </div>

      <div
        style={{
          background: theme === "dark" ? "#2d3748" : "#f8fafc",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "13px",
            fontWeight: 500,
            color: styles.mutedText,
          }}
        >
          Invite Link
        </label>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={inviteResult.inviteUrl}
            readOnly
            style={{
              flex: 1,
              padding: "12px",
              border: `1px solid ${styles.border}`,
              borderRadius: "8px",
              background: styles.background,
              color: styles.text,
              fontSize: "13px",
              fontFamily: "monospace",
            }}
            onClick={(e) => e.currentTarget.select()}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(inviteResult.inviteUrl);
              // Optional: Show a temporary "Copied!" message
              const btn = document.activeElement as HTMLButtonElement;
              const originalText = btn.innerHTML;
              btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
              btn.style.background = colors.success;
              setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = colors.primary;
              }, 2000);
            }}
            style={{
              padding: "12px 20px",
              background: colors.primary,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            <i className="fas fa-copy"></i> Copy
          </button>
        </div>
      </div>

      <div
        style={{
          background: `${colors.warning}15`,
          border: `1px solid ${colors.warning}40`,
          borderRadius: "8px",
          padding: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <i
            className="fas fa-exclamation-triangle"
            style={{ color: colors.warning, marginTop: "2px" }}
          ></i>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 500,
                fontSize: "13px",
                marginBottom: "5px",
              }}
            >
              Temporary Password
            </div>
            <div
              style={{
                fontSize: "12px",
                color: styles.mutedText,
                marginBottom: "8px",
              }}
            >
              The new admin should use this temporary password on first login:
            </div>
            <code
              style={{
                display: "block",
                padding: "8px 12px",
                background: theme === "dark" ? "#2d3748" : "#ffffff",
                border: `1px solid ${styles.border}`,
                borderRadius: "6px",
                fontSize: "13px",
                fontFamily: "monospace",
                color: colors.warning,
              }}
            >
              TemporaryPassword123!
            </code>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => {
            // Send email (optional)
            window.location.href = `mailto:${inviteResult.email}?subject=Admin Invite&body=You've been invited as an admin. Click this link to register: ${inviteResult.inviteUrl}%0A%0ATemporary Password: TemporaryPassword123!`;
          }}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: `1px solid ${styles.border}`,
            color: styles.text,
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <i className="fas fa-envelope"></i>
          Send via Email
        </button>
        <button
          onClick={() => setInviteResult(null)}
          style={{
            padding: "10px 20px",
            background: colors.primary,
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Done
        </button>
      </div>
    </div>
  </div>
)}

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
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme === "dark" ? "#1e293b" : "#f1f5f9"};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${theme === "dark" ? "#475569" : "#cbd5e1"};
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme === "dark" ? "#64748b" : "#94a3b8"};
        }
      `}</style>
    </div>
  );
};

export default SuperadminDashboard;