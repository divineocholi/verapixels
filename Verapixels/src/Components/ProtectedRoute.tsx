import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from './supabase';



interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'super_admin' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if admin data exists in localStorage
        const adminData = localStorage.getItem('admin_data');
        
        if (!adminData) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const parsedData = JSON.parse(adminData);
        
        // Verify the admin still exists and is active
        const { data, error } = await supabase
          .from('admins')
          .select('id, is_active, role')
          .eq('id', parsedData.id)
          .eq('is_active', true)
          .single();

        if (error || !data) {
          localStorage.removeItem('admin_data');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUserRole(data.role);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location]);

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
            Verifying admin credentials...
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

  if (!isAuthenticated) {
    return <Navigate to="/superadmin/login" state={{ from: location }} replace />;
  }

  // Check role permission if required
  if (requiredRole && userRole !== requiredRole && userRole !== 'super_admin') {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8f9fa'
      }}>
        <div style={{
          fontSize: '80px',
          color: '#dc3545',
          marginBottom: '20px'
        }}>
          <i className="fas fa-ban"></i>
        </div>
        <h2 style={{ color: '#333', marginBottom: '10px' }}>Access Denied</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          You don't have permission to access this page.
        </p>
        <a 
          href="/superadmin/dashboard"
          style={{
            padding: '10px 20px',
            background: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 500
          }}
        >
          Go to Dashboard
        </a>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;