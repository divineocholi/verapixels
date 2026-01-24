import React, { useState, useEffect } from 'react';
import './SuperadminDashboard.css';

// Import iconify icons as React components
import { Icon } from '@iconify/react';

const SuperadminDashboard = () => {
  const [timePeriod, setTimePeriod] = useState('Last 24 Hours');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock data for stats
  const statsData = {
    totalUsers: 2543,
    activeConversations: 45,
    pendingConsultations: 18,
    systemStatus: 'Healthy'
  };



  // Mock data for system performance
  const performanceData = [
    { label: 'Database Load', value: 24, color: 'indigo' },
    { label: 'Server CPU', value: 45, color: 'cyan' },
    { label: 'Memory Usage', value: 62, color: 'violet' }
  ];

  // Mock data for admin team
  const adminTeam = [
    { id: 1, initials: 'JD', name: 'John Doe', status: 'Online', chats: 2, avgTime: '2m' },
    { id: 2, initials: 'AS', name: 'Sarah Smith', status: 'Busy', chats: 4, avgTime: '1m 45s' },
    { id: 3, initials: 'MK', name: 'Mike K.', status: 'Offline', lastSeen: '2h ago' }
  ];

  // Mock data for security logs
  const securityLogs = [
    { action: 'Failed Login', userIp: '192.168.1.45', time: '2m ago', status: 'error' },
    { action: 'Admin Permission Change', user: 'Super Admin', time: '15m ago', status: 'success' },
    { action: 'Database Backup', user: 'System (Auto)', time: '1h ago', status: 'info' }
  ];

  // Mock data for consultations
  const consultations = [
    { client: 'Alice Freeman', method: 'Video Call', schedule: 'Today, 2:00 PM', timezone: 'EST', status: 'Pending' },
    { client: 'TechCorp Inc.', method: 'Google Meet', schedule: 'Tomorrow, 10:00 AM', timezone: 'PST', status: 'Confirmed' },
    { client: 'David Chen', method: 'Phone', schedule: 'Nov 24, 4:30 PM', timezone: 'Completed', status: 'Finished' }
  ];

  // Handle time period change
  const handleTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimePeriod(e.target.value);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'online': return 'emerald';
      case 'busy': return 'amber';
      case 'offline': return 'slate';
      case 'pending': return 'amber';
      case 'confirmed': return 'emerald';
      case 'finished': return 'slate';
      default: return 'slate';
    }
  };

  // Get action color
  const getActionColor = (action: string) => {
    if (action.includes('Failed')) return 'red';
    if (action.includes('Success') || action.includes('Permission')) return 'emerald';
    return 'indigo';
  };

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-400 font-sans antialiased">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-950 border-r border-white/5 flex flex-col justify-between hidden md:flex shrink-0 transition-all duration-300`}>
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-white/5 gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
              V
            </div>
            {!sidebarCollapsed && (
              <span className="text-white font-medium tracking-tight">
                Verapixels <span className="text-[10px] text-slate-500 ml-1 border border-white/10 px-1 rounded bg-white/5">SUPER</span>
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            <div className={`text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 mb-2 mt-2 ${sidebarCollapsed ? 'text-center' : ''}`}>
              {sidebarCollapsed ? '▾' : 'Overview'}
            </div>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Icon icon="solar:widget-5-linear" width="18" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Dashboard</span>}
            </a>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
              <Icon icon="solar:chart-2-linear" width="18" className="group-hover:text-indigo-400 transition-colors" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Analytics</span>}
            </a>
            
            <div className={`text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 mb-2 mt-6 ${sidebarCollapsed ? 'text-center' : ''}`}>
              {sidebarCollapsed ? '▾' : 'Management'}
            </div>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
              <Icon icon="solar:users-group-rounded-linear" width="18" className="group-hover:text-emerald-400 transition-colors" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Admins & Roles</span>}
            </a>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
              <Icon icon="solar:user-linear" width="18" className="group-hover:text-blue-400 transition-colors" />
              {!sidebarCollapsed && <span className="text-sm font-medium">User Management</span>}
            </a>

            <div className={`text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 mb-2 mt-6 ${sidebarCollapsed ? 'text-center' : ''}`}>
              {sidebarCollapsed ? '▾' : 'Communication'}
            </div>
            
            <a href="#" className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <Icon icon="solar:chat-line-linear" width="18" className="group-hover:text-pink-400 transition-colors" />
                {!sidebarCollapsed && <span className="text-sm font-medium">Live Chats</span>}
              </div>
              {!sidebarCollapsed && <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full font-bold">12</span>}
            </a>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
              <Icon icon="solar:calendar-date-linear" width="18" className="group-hover:text-orange-400 transition-colors" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Consultations</span>}
            </a>

            <div className={`text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 mb-2 mt-6 ${sidebarCollapsed ? 'text-center' : ''}`}>
              {sidebarCollapsed ? '▾' : 'System'}
            </div>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
              <Icon icon="solar:server-square-linear" width="18" className="group-hover:text-cyan-400 transition-colors" />
              {!sidebarCollapsed && <span className="text-sm font-medium">System Health</span>}
            </a>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
              <Icon icon="solar:shield-warning-linear" width="18" className="group-hover:text-red-400 transition-colors" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Security Logs</span>}
            </a>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors group">
              <Icon icon="solar:database-linear" width="18" className="group-hover:text-yellow-400 transition-colors" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Backups</span>}
            </a>
          </nav>
        </div>

        {/* Admin Profile */}
        <div className="p-4 border-t border-white/5">
          <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-slate-950">
              SA
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-white">Super Admin</div>
                <div className="text-xs text-slate-500">super@verapixels.com</div>
              </div>
            )}
            <Icon icon="solar:settings-linear" className="text-slate-500" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950 relative overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-slate-950/80 backdrop-blur-md z-10 sticky top-0">
          {/* Search */}
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={toggleSidebar}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Icon icon="solar:hamburger-menu-outline" width="20" />
            </button>
            
            <div className="relative w-full max-w-md group">
              <Icon 
                icon="solar:magnifer-linear" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" 
              />
              <input 
                type="text" 
                placeholder="Search logs, users, or settings (Cmd+K)" 
                className="w-full bg-white/5 border border-white/5 rounded-lg pl-10 pr-4 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:bg-white/10 transition-all"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </div>
            
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors relative">
              <Icon icon="solar:bell-linear" width="20" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-slate-950"></span>
            </button>
            
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
              <Icon icon="solar:notebook-linear" width="20" />
            </button>
            
            <div className="h-4 w-px bg-white/10 mx-1"></div>
            
            <button className="flex items-center gap-2 bg-white text-slate-950 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors">
              <Icon icon="solar:add-circle-linear" width="16" />
              New Admin
            </button>
          </div>
        </header>

        {/* Dashboard Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">System Overview</h1>
              <p className="text-sm text-slate-400">Real-time monitoring of your application ecosystem.</p>
            </div>
            <div className="flex gap-2">
              <select 
                className="bg-white/5 border border-white/10 rounded-lg text-xs text-slate-300 px-3 py-1.5 focus:outline-none"
                value={timePeriod}
                onChange={handleTimePeriodChange}
              >
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
              <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white">
                <Icon icon="solar:refresh-linear" width="16" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Card 1 - Total Active Users */}
            <div className="glass p-4 rounded-xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Icon icon="solar:users-group-two-rounded-linear" width="20" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  <Icon icon="solar:trending-up-linear" />
                  12%
                </span>
              </div>
              <div className="relative z-10">
                <div className="text-2xl font-semibold text-white tracking-tight">{statsData.totalUsers.toLocaleString()}</div>
                <div className="text-xs text-slate-500 font-medium">Total Active Users</div>
              </div>
            </div>

            {/* Card 2 - Active Conversations */}
            <div className="glass p-4 rounded-xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
                  <Icon icon="solar:chat-round-dots-linear" width="20" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  <Icon icon="solar:trending-up-linear" />
                  5%
                </span>
              </div>
              <div className="relative z-10">
                <div className="text-2xl font-semibold text-white tracking-tight">{statsData.activeConversations}</div>
                <div className="text-xs text-slate-500 font-medium">Active Conversations</div>
              </div>
            </div>

            {/* Card 3 - Pending Consultations */}
            <div className="glass p-4 rounded-xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                  <Icon icon="solar:calendar-mark-linear" width="20" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                  0%
                </span>
              </div>
              <div className="relative z-10">
                <div className="text-2xl font-semibold text-white tracking-tight">{statsData.pendingConsultations}</div>
                <div className="text-xs text-slate-500 font-medium">Pending Consultations</div>
              </div>
            </div>

            {/* Card 4 - System Health */}
            <div className="glass p-4 rounded-xl relative group overflow-hidden border-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Icon icon="solar:server-path-linear" width="20" />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                  99.9% Uptime
                </span>
              </div>
              <div className="relative z-10">
                <div className="text-2xl font-semibold text-white tracking-tight">{statsData.systemStatus}</div>
                <div className="text-xs text-slate-500 font-medium">System Status</div>
              </div>
            </div>
          </div>

          {/* Content Split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* System Health Monitor */}
            <div className="lg:col-span-2 glass rounded-xl border border-white/5 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-medium text-white flex items-center gap-2">
                  <Icon icon="solar:graph-new-linear" className="text-indigo-400" />
                  Real-time Performance
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  Live Updating
                </div>
              </div>
              
              {/* Performance Bars */}
              <div className="space-y-6 flex-1">
                {performanceData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`bg-${item.color}-500 h-full rounded-full w-[${item.value}%] shadow-[0_0_10px_rgba(var(--color-${item.color}-500),0.5)]`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                {/* API Latency */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">API Latency</span>
                    <span className="text-emerald-400 font-medium">45ms</span>
                  </div>
                  <div className="flex items-end gap-1 h-12 pt-2 border-b border-white/5">
                    {[30, 40, 25, 50, 35, 45, 30, 55, 40, 20].map((height, index) => (
                      <div 
                        key={index}
                        className={`w-1 ${index === 4 ? 'bg-emerald-500' : 'bg-slate-700'} rounded-t`}
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Team Status */}
            <div className="glass rounded-xl border border-white/5 p-0 flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">Admin Team</h3>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">View Performance</a>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[300px] p-2 space-y-1">
                {adminTeam.map((admin) => (
                  <div key={admin.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                        {admin.initials}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-slate-950 bg-${getStatusColor(admin.status)}-500 rounded-full`}></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium text-white truncate">{admin.name}</span>
                        <span className={`text-[10px] text-${getStatusColor(admin.status)}-400 bg-${getStatusColor(admin.status)}-500/10 px-1 rounded`}>
                          {admin.status}
                        </span>
                      </div>
                      {admin.status !== 'Offline' ? (
                        <div className="flex items-center gap-2 text-[10px] text-slate-500">
                          <span>{admin.chats} Active Chats</span>
                          <span>•</span>
                          <span>Avg: {admin.avgTime}</span>
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-500">
                          Last seen {admin.lastSeen}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section: Security Logs & Consultations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Audit Log */}
            <div className="glass rounded-xl border border-white/5 flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:shield-warning-linear" className="text-red-400" />
                  <h3 className="text-sm font-medium text-white">Security Audit Log</h3>
                </div>
                <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                  Export
                  <Icon icon="solar:download-minimalistic-linear" />
                </button>
              </div>
              <div className="p-0">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-slate-400 font-medium">
                    <tr>
                      <th className="px-4 py-3">Action</th>
                      <th className="px-4 py-3">User/IP</th>
                      <th className="px-4 py-3 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {securityLogs.map((log, index) => (
                      <tr key={index} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full bg-${getActionColor(log.action)}-500`}></div>
                            <span className="text-white">{log.action}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-400 font-mono">
                          {log.userIp || log.user}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-500">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Consultations */}
            <div className="glass rounded-xl border border-white/5 flex flex-col">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:calendar-date-linear" className="text-orange-400" />
                  <h3 className="text-sm font-medium text-white">Recent Consultations</h3>
                </div>
                <button className="bg-white text-slate-950 px-3 py-1 rounded text-xs font-medium hover:bg-slate-200">
                  Book New
                </button>
              </div>
              <div className="p-0">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-slate-400 font-medium">
                    <tr>
                      <th className="px-4 py-3">Client</th>
                      <th className="px-4 py-3">Schedule</th>
                      <th className="px-4 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {consultations.map((consult, index) => (
                      <tr key={index} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-medium text-white">{consult.client}</div>
                          <div className="text-[10px] text-slate-500">{consult.method}</div>
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          <div>{consult.schedule}</div>
                          <div className="text-[10px] text-slate-500">{consult.timezone} Timezone</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-${getStatusColor(consult.status)}-500/10 text-${getStatusColor(consult.status)}-400 border border-${getStatusColor(consult.status)}-500/20`}>
                            {consult.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <footer className="mt-8 border-t border-white/5 pt-6 pb-2 flex justify-between items-center text-xs text-slate-600">
            <div>© 2024 Verapixels Inc. Super Admin v2.1.0</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-400">Documentation</a>
              <a href="#" className="hover:text-slate-400">API Status</a>
              <a href="#" className="hover:text-slate-400">Support</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default SuperadminDashboard;