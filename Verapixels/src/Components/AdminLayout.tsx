import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout: React.FC = () => {
  return (
    <div>
      {/* No Navbar, No Footer for admin pages */}
      <Outlet />
    </div>
  )
}

export default AdminLayout