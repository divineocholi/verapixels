import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import ScrollToTop from './Components/ScrollToTop'
import Landingpage from './Components/Index'
import VeeAIChatbot from './Components/VeeAIChatbot'        
import ConsultationBooking from './Pages/ConsultationBooking'
import BacktoTop from './Components/BacktoTop'

// About Pages
import AboutPage from './Pages/AboutPage'
import HowWeWorkandFunction from './Pages/HowWeWorkandFunction'
import ClientPortfolio from './Pages/ClientPortfolio'
import OurCoreTeam from './Pages/OurCoreTeam'
import ClientTestimonials from './Pages/ClientTestimonials'
import CorporateSocialResponsibility from './Pages/CorporateSocialResponsibility'
import StartYourCareerwithUs from './Pages/Blog'

// Services Pages
import WebDevelopment from './Pages/WebDevelopment'
import MobileAppDevelopment from './Pages/MobileAppDevelopment'
import UIUXDesign from './Pages/UIUXDesign'
import CloudSolutions from './Pages/Cloudsolitions'
import GraphicsDesign from './Pages/GraphicsDesign'
import Cybersecurity from './Pages/Cybersecurity'
import DigitalMarketing from './Pages/DigitalMarketing'
import WebApplearnMore from './Pages/Webappleanmore' // ADD THIS IMPORT

// Portfolio Pages
import AllProjects from './Pages/AllProjects'
import WebApplications from './Pages/WebApplications'
import MobileApps from './Pages/CareersPage'
import EcommerceSolutions from './Pages/EcommerceSolutions'
import EnterpriseSoftware from './Pages/EnterpriseSoftware'
import CaseStudies from './Pages/CaseStudies'

// Contact Page
import Contact from './Pages/Contact'
import Footer from './Components/Footer'
import Index from './Components/Index'
import CareersPage from './Pages/CareersPage'

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />+
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* About Routes */}
        <Route path="/aboutverapixels" element={<AboutPage />} />
        <Route path="/ourcoreteam" element={<OurCoreTeam />} />
        <Route path="/howweworkandfunction" element={<HowWeWorkandFunction />} />
        <Route path="/clientportfolio" element={<ClientPortfolio />} />
        <Route path="/clienttestimonials" element={<ClientTestimonials />} />
        <Route path="/corporatesocialresponsibility" element={<CorporateSocialResponsibility />} />
        <Route path="/startyourcareerwithus" element={<StartYourCareerwithUs />} />
        
        {/* Services Routes */}
        <Route path="/webdevelopment" element={<WebDevelopment />} />
        <Route path="/mobileappdevelopment" element={<MobileAppDevelopment />} />
        <Route path="/mobile-app-learn-more" element={<WebApplearnMore />} /> {/* ADD THIS ROUTE */}
        <Route path="/uiuxdesign" element={<UIUXDesign />} />
        <Route path="/cloudsolutions" element={<CloudSolutions />} />
        <Route path="/graphicsdesign" element={<GraphicsDesign />} />
        <Route path="/cybersecurity" element={<Cybersecurity />} />
        <Route path="/digitalmarketing" element={<DigitalMarketing />} />
        
        {/* Portfolio Routes */}
        <Route path="/allprojects" element={<AllProjects />} />
        <Route path="/webapplications" element={<WebApplications />} />
        <Route path="/mobileapps" element={<MobileApps />} />
        <Route path="/ecommercesolutions" element={<EcommerceSolutions />} />
        <Route path="/enterprisesoftware" element={<EnterpriseSoftware />} />
        <Route path="/casestudies" element={<CaseStudies />} />
        
        {/* Contact Route */}
         <Route path="/consultationbooking" element={<ConsultationBooking />} />
        <Route path="//career" element={<CareersPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <BacktoTop />
      <VeeAIChatbot />
      <Footer />                                
    </div>
  )
}

export default App