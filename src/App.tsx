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
import Blog from './Pages/Blog'
import NotFound from './Pages/NotFound'

// ========== ADMIN PAGES ==========
import AdminDashboard from './Components/AdminDashboard'
import SuperadminLogin from './Components/SuperadminLogin'
import SuperadminDashboard from './Components/SuperadminDashboard'
import ProtectedRoute from './Components/ProtectedRoute'
import AdminRegister from './Components/AdminRegister'

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
              <SuperadminDashboardFixed />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* ========== 404 PAGE ========== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
