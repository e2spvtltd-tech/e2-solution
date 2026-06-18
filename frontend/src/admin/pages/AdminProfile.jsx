import React, { useState, useEffect } from 'react';
import { User, QrCode, Copy, Check, Mail, Phone, Shield } from 'lucide-react';
import api from '../services/api';

const AdminProfile = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/admin/profile');
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch admin profile', err);
      }
    };
    fetchProfile();
  }, []);
  
  const referralCode = profile?.userId || "BRIMLM-100000";
  const referralLink = `http://localhost:5174/register?sponsor=${referralCode}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const displayName = profile?.fullName || "System Admin";
  const displayEmail = profile?.email || "admin@ec2.com";
  const displayMobile = profile?.mobile || "+91 99999 99999";

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-1px', background: 'linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Admin Profile</h1>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>Manage your account and referral links</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
        {/* Profile Info */}
        <div className="card" style={{ padding: '32px', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '36px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(91, 61, 245, 0.2)' }}>
              {displayName.charAt(0)}
            </div>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                {displayName} <Shield size={24} color="#3b82f6" />
              </h2>
              <span style={{ padding: '4px 12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', marginTop: '8px', display: 'inline-block' }}>Super Administrator</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '12px', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <Mail size={24} color="var(--color-text-muted)" />
              <div>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Email Address</p>
                <p style={{ margin: 0, fontWeight: '600' }}>{displayEmail}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '12px', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <Phone size={24} color="var(--color-text-muted)" />
              <div>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Phone Number</p>
                <p style={{ margin: 0, fontWeight: '600' }}>{displayMobile}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '12px', backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <User size={24} color="var(--color-text-muted)" />
              <div>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Sponsor ID</p>
                <p style={{ margin: 0, fontWeight: '600' }}>{referralCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral Section */}
        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <QrCode size={24} color="#8b5cf6" /> Referral Center
          </h3>
          <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '24px' }}>Share your link. Users will register as "Pending" and you can place them later.</p>

          {!showQR ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--color-border)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <QrCode size={48} color="var(--color-text-muted)" style={{ marginBottom: '12px', opacity: 0.5 }} />
              <button 
                onClick={() => setShowQR(true)}
                className="btn btn-outline"
                style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', border: 'none' }}
              >
                Show QR Code
              </button>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '24px', marginBottom: '24px', backgroundColor: 'var(--color-bg)' }}>
              <img src={qrCodeUrl} alt="Referral QR Code" style={{ width: '160px', height: '160px', borderRadius: '8px', padding: '8px', background: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} />
              <button 
                onClick={() => setShowQR(false)}
                style={{ marginTop: '16px', fontSize: '0.875rem', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Hide
              </button>
            </div>
          )}

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p className="text-muted" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Your Referral Code</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={referralCode} 
                  style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', fontSize: '0.875rem', outline: 'none', color: 'var(--color-text)', fontWeight: 'bold' }}
                />
                <button 
                  onClick={copyCode}
                  className="btn btn-primary"
                  style={{ width: '42px', height: '42px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}
                  title="Copy Code"
                >
                  {copiedCode ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div>
              <p className="text-muted" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Your Referral Link</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={referralLink} 
                  style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', fontSize: '0.875rem', outline: 'none', color: 'var(--color-text)' }}
                />
                <button 
                  onClick={copyLink}
                  className="btn btn-primary"
                  style={{ width: '42px', height: '42px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}
                  title="Copy Link"
                >
                  {copiedLink ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
