import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, ShieldCheck, FileText, Lock, LogOut, X, Edit2 } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const [freezeWithdrawals, setFreezeWithdrawals] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    email: 'admin@e2solutions.com',
    phone: '+91 98765 43210'
  });

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '24px 0 32px 0' }}>
        <div className="profile-avatar-large" style={{ width: '90px', height: '90px' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(67, 24, 255, 0.2)' }}>
            E²
          </div>
          <div className="status-indicator" style={{ width: '18px', height: '18px', bottom: '4px', right: '4px', borderWidth: '3px' }}></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h3 style={{ fontSize: '1.5rem', margin: '0 0 4px 0' }}>E² Solutions Pvt Ltd</h3>
          <p className="text-muted" style={{ margin: '0 0 12px 0', fontSize: '0.95rem' }}>System Administrator • ID: 8829</p>
          <button 
            className="btn btn-primary" 
            style={{ padding: '8px 24px', fontSize: '0.95rem', borderRadius: 'var(--radius-full)' }}
            onClick={() => setIsProfileExpanded(true)}
          >
            View Profile
          </button>
        </div>
      </div>

      {isProfileExpanded && (
        <div className="profile-modal-overlay" onClick={() => setIsProfileExpanded(false)}>
          <div className="profile-modal-card card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2>Admin Details</h2>
                {!isEditingProfile && (
                  <button onClick={() => setIsEditingProfile(true)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', display: 'flex' }}>
                    <Edit2 size={16} />
                  </button>
                )}
              </div>
              <button className="close-btn" onClick={() => { setIsProfileExpanded(false); setIsEditingProfile(false); }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Email Address</p>
                {isEditingProfile ? (
                  <input type="email" value={adminProfile.email} onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})} style={{ width: '100%', padding: '6px', fontSize: '0.875rem', borderRadius: '4px', border: '1px solid var(--color-border)', outline: 'none' }} />
                ) : (
                  <p style={{ fontWeight: '500', fontSize: '0.875rem' }}>{adminProfile.email}</p>
                )}
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Phone Number</p>
                {isEditingProfile ? (
                  <input type="text" value={adminProfile.phone} onChange={(e) => setAdminProfile({...adminProfile, phone: e.target.value})} style={{ width: '100%', padding: '6px', fontSize: '0.875rem', borderRadius: '4px', border: '1px solid var(--color-border)', outline: 'none' }} />
                ) : (
                  <p style={{ fontWeight: '500', fontSize: '0.875rem' }}>{adminProfile.phone}</p>
                )}
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Account Status</p>
                <p style={{ fontWeight: '500', fontSize: '0.875rem', color: 'var(--color-success)' }}>Active</p>
              </div>
              <div>
                <p className="text-muted" style={{ fontSize: '0.75rem', marginBottom: '4px' }}>Last Login</p>
                <p style={{ fontWeight: '500', fontSize: '0.875rem' }}>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            {isEditingProfile && (
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn" onClick={() => setIsEditingProfile(false)} style={{ padding: '8px 16px', fontSize: '0.875rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', background: 'transparent' }}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setIsEditingProfile(false)} style={{ padding: '8px 16px', fontSize: '0.875rem', borderRadius: 'var(--radius-md)' }}>Save Changes</button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="settings-section">
        <span className="section-title">PLATFORM SETTINGS</span>
        <div className="settings-group card">
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap"><CommissionIcon /></span>
              <span>Referral Percentage</span>
            </div>
            <div className="settings-item-value">
              <span className="text-primary">10%</span>
              <ChevronRight size={16} className="text-muted" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap"><CommissionIcon /></span>
              <span>Binary Percentage</span>
            </div>
            <div className="settings-item-value">
              <span className="text-primary">8%</span>
              <ChevronRight size={16} className="text-muted" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap"><ActivityIcon /></span>
              <span>ROI Percentage</span>
            </div>
            <div className="settings-item-value">
              <span className="text-primary">1.5%</span>
              <ChevronRight size={16} className="text-muted" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap"><FileText size={16} /></span>
              <span>ROI Duration</span>
            </div>
            <div className="settings-item-value">
              <span>200 Days</span>
              <ChevronRight size={16} className="text-muted" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap"><MinMaxIcon /></span>
              <span>Income Ceiling/Day</span>
            </div>
            <div className="settings-item-value">
              <span>₹50,000</span>
              <ChevronRight size={16} className="text-muted" />
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <span className="section-title">WITHDRAWAL CONTROLS</span>
        <div className="settings-group card">
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap"><MinMaxIcon /></span>
              <span>Min Withdrawal</span>
            </div>
            <div className="settings-item-value">
              <span>₹500.00</span>
              <ChevronRight size={16} className="text-muted" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap"><MinMaxIcon /></span>
              <span>Max Withdrawal</span>
            </div>
            <div className="settings-item-value">
              <span>₹100,000</span>
              <ChevronRight size={16} className="text-muted" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap bg-danger-light-icon"><CommissionIcon /></span>
              <span>Withdrawal Charges</span>
            </div>
            <div className="settings-item-value">
              <span className="text-danger">5%</span>
              <ChevronRight size={16} className="text-muted" />
            </div>
          </div>
          <div className="divider"></div>
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap bg-danger-light-icon"><Lock size={16} className="text-danger" /></span>
              <span>Freeze Withdrawals</span>
            </div>
            <div className="settings-item-value">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={freezeWithdrawals} 
                  onChange={() => setFreezeWithdrawals(!freezeWithdrawals)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <span className="section-title">SECURITY & KYC</span>
        <div className="settings-group card">
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap bg-primary-light-icon"><ShieldCheck size={16} className="text-primary" /></span>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <span>Two-Factor Auth</span>
                <span className="text-muted" style={{fontSize: '0.65rem'}}>MANDATORY</span>
              </div>
            </div>
            <div className="settings-item-value">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={twoFactorAuth} 
                  onChange={() => setTwoFactorAuth(!twoFactorAuth)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          <div className="divider"></div>
          <Link to="/kyc-management" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="settings-item" style={{ cursor: 'pointer' }}>
              <div className="settings-item-label">
                <span className="settings-icon-wrap"><FileText size={16} /></span>
                <span>KYC Management</span>
              </div>
              <div className="settings-item-value">
                <span>View Requests</span>
                <ChevronRight size={16} className="text-muted" />
              </div>
            </div>
          </Link>
          <div className="divider"></div>
          <div className="settings-item">
            <div className="settings-item-label">
              <span className="settings-icon-wrap bg-danger-light-icon"><Lock size={16} className="text-danger" /></span>
              <span>Admin Access Logs</span>
            </div>
            <div className="settings-item-value">
              <ChevronRight size={16} className="text-muted" />
            </div>
          </div>
        </div>
      </div>

      <button className="btn logout-btn full-width-btn" onClick={() => {
        localStorage.removeItem('adminToken');
        window.location.href = '/login';
      }}>
        <LogOut size={20} />
        Logout from Admin
      </button>

      <div className="version-info">
        <p>Version 4.2.0-stable • Build 992</p>
      </div>
    </div>
  );
};

// Simple icon components
const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);
const CommissionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path></svg>
);
const MinMaxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

export default Settings;
