import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, ShieldCheck, Wallet, Network, Share2, Percent, Users, Landmark } from 'lucide-react';
import api from '../services/api';

const UserProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/admin/members/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return <div className="page-container" style={{ padding: '24px' }}>Loading profile...</div>;
  }

  if (!user) {
    return <div className="page-container" style={{ padding: '24px' }}>User not found.</div>;
  }

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/user-management" className="icon-btn" style={{ textDecoration: 'none', color: 'var(--color-primary)' }}>
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-1px', background: 'linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>User Profile</h1>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>Detailed view for {user.id}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Personal Details Card */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><User size={20} className="text-primary" /> Personal Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', gap: '16px', alignItems: 'flex-start' }}>
              <span className="text-muted" style={{ whiteSpace: 'nowrap' }}>Full Name</span>
              <span style={{ fontWeight: 600, textAlign: 'right', wordBreak: 'break-word' }}>{user.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', gap: '16px', alignItems: 'flex-start' }}>
              <span className="text-muted" style={{ whiteSpace: 'nowrap' }}>Mobile Number</span>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'flex-start', gap: '4px', textAlign: 'right', justifyContent: 'flex-end', wordBreak: 'break-word' }}><Phone size={14} style={{ flexShrink: 0, marginTop: '4px' }} /> <span>{user.mobile}</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', gap: '16px', alignItems: 'flex-start' }}>
              <span className="text-muted" style={{ whiteSpace: 'nowrap' }}>Email Address</span>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'flex-start', gap: '4px', textAlign: 'right', justifyContent: 'flex-end', wordBreak: 'break-all' }}><Mail size={14} style={{ flexShrink: 0, marginTop: '4px' }} /> <span>{user.email}</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', gap: '16px', alignItems: 'flex-start' }}>
              <span className="text-muted" style={{ whiteSpace: 'nowrap' }}>Login Password</span>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'flex-start', gap: '4px', textAlign: 'right', justifyContent: 'flex-end', wordBreak: 'break-word' }}><ShieldCheck size={14} style={{ flexShrink: 0, marginTop: '4px' }} /> <span>{user.password}</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px', gap: '16px', alignItems: 'flex-start' }}>
              <span className="text-muted" style={{ whiteSpace: 'nowrap' }}>Joined Date</span>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'flex-start', gap: '4px', textAlign: 'right', justifyContent: 'flex-end', wordBreak: 'break-word' }}><Calendar size={14} style={{ flexShrink: 0, marginTop: '4px' }} /> <span>{user.joined}</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', gap: '16px', alignItems: 'center' }}>
              <span className="text-muted" style={{ whiteSpace: 'nowrap' }}>KYC Status</span>
              <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(5, 205, 153, 0.1)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                <ShieldCheck size={14} /> {user.kycStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Network size={20} className="text-primary" /> Account Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              <span className="text-muted">Sponsor ID</span>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{user.sponsorId}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              <span className="text-muted">Total Team Count</span>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {user.teamCount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              <span className="text-muted">Wallet Balance</span>
              <h3 style={{ margin: 0, color: 'var(--color-success)' }}>₹{user.walletBalance.toLocaleString()}</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
              <span className="text-muted">Days Left</span>
              <span style={{ fontWeight: 600 }}>{user.daysLeft || 0} Days</span>
            </div>
          </div>
        </div>

        {/* Bank Account Details Card */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Landmark size={20} className="text-primary" /> Bank Account Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              <span className="text-muted">Bank Name</span>
              <span style={{ fontWeight: 600 }}>{user.bankName || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              <span className="text-muted">Account Number</span>
              <span style={{ fontWeight: 600 }}>{user.accountNumber || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              <span className="text-muted">Account Holder Name</span>
              <span style={{ fontWeight: 600 }}>{user.accountHolderName || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
              <span className="text-muted">IFSC Code</span>
              <span style={{ fontWeight: 600 }}>{user.ifscCode || 'N/A'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
              <span className="text-muted">Bank Branch Address</span>
              <span style={{ fontWeight: 600, textAlign: 'right', wordBreak: 'break-word', maxWidth: '60%' }}>{user.bankBranchAddress || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: '16px', marginBottom: '8px' }}>Income Overview</h3>
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon blue-light"><Network size={24} /></div>
          </div>
          <p className="stat-label">Binary Income</p>
          <h2 className="stat-value text-primary">₹{user.binaryIncome.toLocaleString()}</h2>
        </div>
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon purple-light"><Share2 size={24} /></div>
          </div>
          <p className="stat-label">Referral Income</p>
          <h2 className="stat-value">₹{user.referralIncome.toLocaleString()}</h2>
        </div>
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon green-light"><Percent size={24} /></div>
          </div>
          <p className="stat-label">ROI Income</p>
          <h2 className="stat-value text-success">₹{user.roiIncome.toLocaleString()}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
