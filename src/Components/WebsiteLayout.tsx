import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import VeeAIChatbot from './VeeAIChatbot'
import BacktoTop from './BacktoTop'

const WebsiteLayout: React.FC = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <BacktoTop />
      <VeeAIChatbot />
      <Footer />
    </div>
  )
}

export default WebsiteLayout