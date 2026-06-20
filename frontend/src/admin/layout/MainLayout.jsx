import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, ArrowLeftRight, BarChart2, Settings, Bell, Wallet, Plus, Search, Contact, LayoutGrid, Package, Landmark, Gift, User, Headset, ChevronRight, Menu, LogOut, Network, Briefcase, TrendingUp, Banknote, FileText, Megaphone, MessageSquare, ShieldCheck, UserCog } from 'lucide-react';
import api from '../services/api';
import { playNotificationSound } from '../services/notificationSound';
import './MainLayout.css';

const MainLayout = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const prevNotifCountRef = useRef(0);
  const isFirstLoadRef = useRef(true);
  const location = useLocation();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/admin/notifications');
        const newNotifs = res.data.map(n => ({
          id: n.id,
          title: n.type === 'registration' ? 'New Registration' : 'Notification',
          message: n.message,
          time: new Date(n.created_at).toLocaleString()
        }));
        
        // Play sound when new notifications arrive
        if (!isFirstLoadRef.current && newNotifs.length > prevNotifCountRef.current) {
          playNotificationSound();
        }
        isFirstLoadRef.current = false;
        prevNotifCountRef.current = newNotifs.length;
        
        setNotifications(newNotifs);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000); // poll every 15s
    return () => clearInterval(interval);
  }, []);

  const bottomNavItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/members', icon: Users, label: 'Members' },
    { path: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
    { path: '/analytics', icon: BarChart2, label: 'Analytics' },
  ];

  const sidebarNavItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/user-management', icon: Users, label: 'User Management' },
    { path: '/binary-network', icon: Network, label: 'Binary Network' },
    { path: '/investment-plans', icon: Briefcase, label: 'Investment Plans' },
    { path: '/income-management', icon: Landmark, label: 'Income Management' },
    { path: '/wallet-management', icon: Wallet, label: 'Wallet Management' },
    { path: '/reports', icon: FileText, label: 'Reports' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  useEffect(() => {
    const currentItem = sidebarNavItems.find(item => item.path === location.pathname);
    if (currentItem) {
      document.title = `${currentItem.label} — E2 Solutions Admin`;
    } else if (location.pathname.startsWith('/user-profile')) {
      document.title = `User Profile — E2 Solutions Admin`;
    } else {
      document.title = `Admin — E2 Solutions`;
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      {/* Sidebar for Desktop */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" style={{ height: '40px', width: '56px' }} fill="none" stroke="url(#logo-gradient)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px', lineHeight: '1', color: '#0f172a' }}>
              E² Solutions
            </span>
            <span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', marginTop: '3px', color: '#94a3b8' }}>
              Pvt Ltd
            </span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
                {item.hasDropdown && <ChevronRight size={16} />}
              </Link>
            );
          })}
          <button
            onClick={onLogout}
            className="sidebar-link"
            style={{ width: '100%', border: 'none', background: 'rgba(239, 68, 68, 0.1)', cursor: 'pointer', textAlign: 'left', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}
          >
            <LogOut size={20} />
            <span style={{ fontWeight: '500' }}>Log Out</span>
          </button>
        </nav>
      </aside>

      <div className="main-content-wrapper">
        {(showNotifications || showWalletDropdown) && (
          <div className="dropdown-overlay" onClick={() => {
            setShowNotifications(false);
            setShowWalletDropdown(false);
          }}></div>
        )}
        {/* Top App Bar */}
        <header className="top-bar">
          <div className="top-bar-left mobile-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button className="icon-btn mobile-menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" style={{ height: '34px', width: '48px' }} fill="none" stroke="url(#logo-gradient-mob)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="logo-gradient-mob" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4Z" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-0.5px', lineHeight: '1', color: '#0f172a' }}>
                E² Solutions
              </span>
              <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px', marginTop: '2px', color: '#94a3b8' }}>
                Pvt Ltd
              </span>
            </div>
          </div>
          
          <div className="top-bar-search hidden-mobile" style={{ flex: 1, maxWidth: '400px', margin: '0 20px', position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search Users, Investments, Reports..." 
              style={{ width: '100%', padding: '10px 16px 10px 44px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', fontSize: '0.875rem', outline: 'none' }}
            />
          </div>

          <div className="top-bar-right">
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={() => {
                const isOpening = !showNotifications;
                setShowNotifications(isOpening);
                if (showWalletDropdown) setShowWalletDropdown(false);
                if (isOpening && notifications.length > 0) {
                  api.put('/admin/notifications/mark-read').catch(err => console.error('Failed to mark read', err));
                }
              }}>
                <Bell size={20} />
                {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
              </button>

              {showNotifications && (
                <div className="notifications-dropdown notification-panel card">
                  <div style={{ padding: '16px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Notifications</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: '500' }} onClick={() => {
                      setNotifications([]);
                      api.put('/admin/notifications/mark-read').catch(err => console.error('Failed to mark read', err));
                    }}>Mark all read</span>
                  </div>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-muted)' }}>No new notifications</div>
                    ) : (
                      notifications.map((notif, idx) => (
                        <div key={notif.id} className="notification-item" style={{ padding: '12px 16px', borderBottom: idx < notifications.length - 1 ? '1px solid var(--color-border)' : 'none', cursor: 'pointer' }}>
                          <p style={{ margin: '0 0 4px 0', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text)' }}>{notif.title}</p>
                          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{notif.message}</p>
                          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '6px' }}>{notif.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div style={{ padding: '12px', borderTop: '1px solid var(--color-border)', textAlign: 'center', cursor: 'pointer', color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: '600' }}>
                    View All Notifications
                  </div>
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={() => {
                setShowWalletDropdown(!showWalletDropdown);
                if (showNotifications) setShowNotifications(false);
              }}>
                <Wallet size={20} />
              </button>

              {showWalletDropdown && (
                <div className="notifications-dropdown wallet-panel card">
                  <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Platform Balance</p>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--color-text)' }}>₹0</h2>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <button className="btn btn-primary" style={{ padding: '8px', fontSize: '0.875rem', borderRadius: 'var(--radius-md)' }}>
                      Add Funds
                    </button>
                    <button className="btn btn-outline" style={{ padding: '8px', fontSize: '0.875rem', borderRadius: 'var(--radius-md)' }}>
                      Withdraw
                    </button>
                  </div>
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                    <div className="notification-item" style={{ padding: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '4px' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>Transaction History</span>
                      <ChevronRight size={16} className="text-muted" />
                    </div>
                    <div className="notification-item" style={{ padding: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderRadius: '4px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>Wallet Settings</span>
                      <ChevronRight size={16} className="text-muted" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link to="/settings" className="profile-pic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'linear-gradient(135deg, var(--color-primary), #8b5cf6)', color: 'white', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none' }}>
              E²
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="main-content">
          <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="bottom-nav">
        {bottomNavItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={24} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div key="fab" className="nav-item-wrapper">
          <button className="fab">
            <Plus size={24} color="white" />
          </button>
        </div>

        {bottomNavItems.slice(2, 4).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={24} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MainLayout;
