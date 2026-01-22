import React from 'react'
import { Routes, Route } from 'react-router-dom'

// ========== LAYOUTS ==========
import WebsiteLayout from './Components/WebsiteLayout'
import AdminLayout from './Components/AdminLayout'
import SimpleSuperadminDashboard from './Components/SimpleSuperadminDashboard'
import SuperadminDashboardFixed from './Components/SuperadminDashboardFixed';


// ========== WEBSITE PAGES ==========
import Index from './Components/Index'
import AboutPage from './Pages/AboutPage'
import HowWeWorkandFunction from './Pages/HowWeWorkandFunction'
import OurCoreTeam from './Pages/OurCoreTeam'
import WebDevelopment from './Pages/WebDevelopment'
import MobileAppDevelopment from './Pages/MobileAppDevelopment'
import UIUXDesign from './Pages/UIUXDesign'
import GraphicsDesign from './Pages/GraphicsDesign'
import AllProjects from './Pages/AllProjects'
import CaseStudies from './Pages/CaseStudies'
import ConsultationBooking from './Pages/ConsultationBooking'
import CareersPage from './Pages/CareersPage'
import Contact from './Pages/Contact'

// ========== ADMIN PAGES ==========
import AdminDashboard from './Components/AdminDashboard'
import SuperadminLogin from './Components/SuperadminLogin'
import SuperadminDashboard from './Components/SuperadminDashboard'
import ProtectedRoute from './Components/ProtectedRoute'
import AdminRegister from './Components/AdminRegister'
import Blog from './Pages/Blog'

// ========== TEST COMPONENTS ==========
const TestAdmin = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '20px'
  }}>
    <div>
      <h1 style={{ fontSize: '48px' }}>✅ ADMIN ROUTE WORKS!</h1>
      <p>This proves your admin routes are separate from main site.</p>
      <div style={{ marginTop: '30px' }}>
        <a href="/" style={linkStyle}>🏠 Go to Home</a>
        <a href="/admin" style={linkStyle}>🔐 Go to Chat Admin</a>
        <a href="/superadmin/login" style={linkStyle}>👑 Go to Super Admin</a>
      </div>
    </div>
  </div>
)

const linkStyle = {
  display: 'inline-block',
  margin: '10px',
  padding: '12px 24px',
  background: 'rgba(255,255,255,0.2)',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  border: '2px solid white'
}

const App: React.FC = () => {
  return (
    <Routes>
      {/* ========== WEBSITE ROUTES (with Navbar & Footer) ========== */}
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/aboutverapixels" element={<AboutPage />} />
        <Route path="/ourcoreteam" element={<OurCoreTeam />} />
        <Route path="/howweworkandfunction" element={<HowWeWorkandFunction />} />
        <Route path="/webdevelopment" element={<WebDevelopment />} />
        <Route path="/mobileappdevelopment" element={<MobileAppDevelopment />} />
        <Route path="/uiuxdesign" element={<UIUXDesign />} />
        <Route path="/graphicsdesign" element={<GraphicsDesign />} />
        <Route path="/allprojects" element={<AllProjects />} />
        <Route path="/casestudies" element={<CaseStudies />} />
        <Route path="/consultationbooking" element={<ConsultationBooking />} />
        <Route path="/career" element={<CareersPage />} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ========== ADMIN ROUTES (NO Navbar & Footer) ========== */}
      <Route element={<AdminLayout />}>
        {/* TEST ROUTE - Remove after testing */}
        <Route path="/test-admin" element={<TestAdmin />} />
        
        {/* Chat Support Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/chat" element={<AdminDashboard />} />
        
        {/* Super Admin System */}
        <Route path="/superadmin/login" element={<SuperadminLogin />} />
        <Route path="/superadmin/register" element={<AdminRegister />} />
    <Route 
  path="/superadmin/dashboard" 
  element={
    <ProtectedRoute>
      <SuperadminDashboardFixed />  {/* ✅ Use the fixed version */}
    </ProtectedRoute>
  } 
/>
      </Route>

      {/* ========== 404 PAGE ========== */}
      <Route path="*" element={
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
          background: '#0f172a',
          color: 'white'
        }}>
          <div>
            <h1 style={{ fontSize: '72px', color: '#ef4444' }}>404</h1>
            <p style={{ fontSize: '20px', marginTop: '20px' }}>
              Page not found: <code style={{ color: '#f59e0b' }}>{window.location.pathname}</code>
            </p>
            <div style={{ marginTop: '40px' }}>
              <a href="/" style={buttonStyle}>Home</a>
              <a href="/admin" style={buttonStyle}>Admin</a>
              <a href="/test-admin" style={buttonStyle}>Test Route</a>
            </div>
          </div>
        </div>
      } />
    </Routes>
  )
}

const buttonStyle = {
  display: 'inline-block',
  margin: '10px',
  padding: '12px 24px',
  background: '#3b82f6',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 'bold'
}

export default App