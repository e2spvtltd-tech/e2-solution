import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import UserSearch from './pages/UserSearch';
import KYCManagement from './pages/KYCManagement';
import WalletManagement from './pages/WalletManagement';
import IncomeManagement from './pages/IncomeManagement';
import UserManagement from './pages/UserManagement';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/AdminProfile';
import BinaryNetwork from './pages/BinaryNetwork';
import InvestmentPlans from './pages/InvestmentPlans';
import Investments from './pages/Investments';
import Withdrawals from './pages/Withdrawals';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Announcements from './pages/Announcements';
import SupportManagement from './pages/SupportManagement';
import Messaging from './pages/Messaging';
import AuditLogs from './pages/AuditLogs';
import RoleManagement from './pages/RoleManagement';
import api from './services/api';

const ExternalRedirect = ({ to }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
};

function App() {
  const urlToken = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('token') : null;
  
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (urlToken) return true;
    if (typeof window !== 'undefined') return !!localStorage.getItem('adminToken');
    return false;
  });

  useEffect(() => {
    setIsClient(true);
    if (urlToken) {
      localStorage.setItem('adminToken', urlToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [urlToken]);

  if (!isClient) {
    return null; // Prevent SSR crash from BrowserRouter accessing document
  }

  return (
    <div className="admin-theme" id="admin-root">
      <BrowserRouter basename="/admin">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <ExternalRedirect to="/login" />
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/*" 
            element={
              isAuthenticated ? (
                <MainLayout onLogout={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('adminToken');
                  setIsAuthenticated(false);
                }}>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/profile" element={<AdminProfile />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/user-profile/:id" element={<UserProfile />} />
                    <Route path="/binary-network" element={<BinaryNetwork />} />
                    <Route path="/investment-plans" element={<InvestmentPlans />} />
                    <Route path="/investments" element={<Investments />} />
                    <Route path="/income-management" element={<IncomeManagement />} />
                    <Route path="/wallet-management" element={<WalletManagement />} />
                    <Route path="/withdrawals" element={<Withdrawals />} />
                    <Route path="/kyc-management" element={<KYCManagement />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/announcements" element={<Announcements />} />
                    <Route path="/support-center" element={<SupportManagement />} />
                    <Route path="/messaging" element={<Messaging />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/audit-logs" element={<AuditLogs />} />
                    <Route path="/role-management" element={<RoleManagement />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/user-search" element={<UserSearch />} />
                  </Routes>
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
