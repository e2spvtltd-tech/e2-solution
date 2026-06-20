import React, { useState, useEffect } from 'react';
import { Network, Users, Activity, ChevronDown, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import api from '../services/api';

const OrgTreeStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    .org-tree ul {
      padding-top: 24px; 
      position: relative;
      display: flex;
      justify-content: center;
      padding-left: 0;
      margin: 0;
    }
    .org-tree li {
      text-align: center;
      list-style-type: none;
      position: relative;
      padding: 24px 12px 0 12px;
    }
    .org-tree li::before, .org-tree li::after {
      content: '';
      position: absolute; top: 0; right: 50%;
      border-top: 2px solid var(--color-border);
      width: 50%; height: 24px;
    }
    .org-tree li::after {
      right: auto; left: 50%;
      border-left: 2px solid var(--color-border);
    }
    .org-tree li:only-child::after, .org-tree li:only-child::before {
      display: none;
    }
    .org-tree li:only-child { padding-top: 0;}
    .org-tree li:first-child::before, .org-tree li:last-child::after {
      border: 0 none;
    }
    .org-tree li:last-child::before {
      border-right: 2px solid var(--color-border);
      border-radius: 0 6px 0 0;
    }
    .org-tree li:first-child::after {
      border-radius: 6px 0 0 0;
    }
    .org-tree ul ul::before {
      content: '';
      position: absolute; top: 0; left: 50%;
      border-left: 2px solid var(--color-border);
      width: 0; height: 24px;
      margin-left: -1px;
    }
    .org-tree li > div {
      display: inline-block;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `}} />
);

const BinaryNode = ({ user, isRoot = false, side = null, parentNode = null, onEmptyClick = null, isOpening = false }) => {
  // If user is null or empty object, treat as empty node
  if (!user || Object.keys(user).length === 0) {
    const handleEmptyClick = () => {
      if (isOpening) return;
      if (onEmptyClick && parentNode && side) {
        onEmptyClick(parentNode.id, side);
      }
    };
    return (
      <button 
        onClick={handleEmptyClick}
        type="button"
        disabled={isOpening}
        onMouseEnter={(e) => {
          if (isOpening) return;
          e.currentTarget.style.borderColor = '#5B3DF5';
          e.currentTarget.style.backgroundColor = 'rgba(91, 61, 245, 0.05)';
        }}
        onMouseLeave={(e) => {
          if (isOpening) return;
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.backgroundColor = 'var(--color-bg)';
        }}
        style={{ 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
          padding: '12px', borderRadius: '16px', border: isOpening ? '1px solid #5B3DF5' : '1px dashed var(--color-border)', 
          width: '120px', backgroundColor: isOpening ? 'rgba(91, 61, 245, 0.05)' : 'var(--color-bg)', color: isOpening ? '#5B3DF5' : 'var(--color-text-muted)', 
          height: '140px', cursor: isOpening ? 'default' : 'pointer', transition: 'all 0.2s ease-in-out', outline: 'none',
          transform: isOpening ? 'scale(0.95)' : 'none'
        }}
        onMouseDown={(e) => {
          if (!isOpening) e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          if (!isOpening) e.currentTarget.style.transform = 'none';
        }}
      >
        {isOpening ? (
          <>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid #5B3DF5',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '8px'
            }} />
            <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', animation: 'pulse 1.5s ease-in-out infinite' }}>Opening...</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: '20px', fontWeight: 'bold', opacity: 0.5, marginBottom: '4px' }}>+</span>
            <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Empty</span>
          </>
        )}
      </button>
    );
  }

  const initials = user.initials || (user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() : 'U');

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      padding: '16px', borderRadius: '16px', border: isRoot ? '1px solid rgba(91, 61, 245, 0.2)' : '1px solid var(--color-border)', 
      width: '140px', backgroundColor: isRoot ? 'rgba(91, 61, 245, 0.1)' : 'var(--color-card)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', position: 'relative', zIndex: 10,
      cursor: 'pointer', transition: 'all 0.2s ease-in-out'
    }}>
      <div style={{ 
        width: '48px', height: '48px', borderRadius: '50%', 
        backgroundColor: '#5B3DF5', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        color: 'white', fontWeight: 'bold', marginBottom: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {initials}
      </div>
      <p style={{ fontWeight: 'bold', fontSize: '0.875rem', width: '100%', textAlign: 'center', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {isRoot ? "You" : user.name}
      </p>
      <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginTop: '4px', backgroundColor: 'var(--color-bg)', padding: '2px 8px', borderRadius: '6px', fontWeight: 500, margin: '4px 0 0 0' }}>
        ID: {user.id}
      </p>
      <p style={{ fontSize: '11px', color: '#10b981', fontWeight: 'bold', marginTop: '4px', margin: '4px 0 0 0' }}>
        Vol: ₹{(user.volume || 0).toLocaleString()}
      </p>
      
      {!isRoot && user.side && (
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ height: '8px', width: '8px', borderRadius: '50%', backgroundColor: user.side === "Left" ? '#22c55e' : '#3b82f6' }}></span>
          <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>{user.side}</span>
        </div>
      )}
      {isRoot && (
        <div style={{ marginTop: '8px', fontSize: '10px', fontWeight: 'bold', color: 'white', backgroundColor: '#5B3DF5', padding: '2px 12px', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          You
        </div>
      )}
    </div>
  );
};

const renderTree = (node, isRoot = true, side = null, level = 0, parentNode = null, onEmptyClick = null, clickedSlot = null) => {
  const nodeWithSide = node ? { ...node, side } : null;
  const isOpening = !!(clickedSlot && clickedSlot.parentId === parentNode?.id && clickedSlot.side === side);

  return (
    <li key={node?.id || Math.random()}>
      <div>
        <BinaryNode 
          user={nodeWithSide} 
          isRoot={isRoot} 
          side={side} 
          parentNode={parentNode} 
          onEmptyClick={onEmptyClick} 
          isOpening={isOpening}
        />
      </div>
      {node && (
        <ul>
          {renderTree(node.left, false, "Left", level + 1, node, onEmptyClick, clickedSlot)}
          {renderTree(node.right, false, "Right", level + 1, node, onEmptyClick, clickedSlot)}
        </ul>
      )}
    </li>
  );
};

const BinaryNetwork = () => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [regModal, setRegModal] = useState({
    open: false,
    parentId: '',
    placement: 'Left Side'
  });
  const [regForm, setRegForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    investingAmount: ''
  });
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [clickedSlot, setClickedSlot] = useState(null);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
  const handleResetZoom = () => setZoom(1);

  const handleEmptyNodeClick = (parentId, side) => {
    setClickedSlot({ parentId, side });
    setTimeout(() => {
      setRegModal({
        open: true,
        parentId: parentId,
        placement: side === "Left" ? "Left Side" : "Right Side",
      });
      setRegForm({
        fullName: '',
        mobile: '',
        email: '',
        password: '',
        investingAmount: ''
      });
      setErrorMessage('');
      setSuccessMessage('');
      setClickedSlot(null);
    }, 450);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.mobile || !regForm.email || !regForm.password || !regForm.investingAmount) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setRegSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await api.post('/auth/register', {
        fullName: regForm.fullName,
        mobile: regForm.mobile,
        email: regForm.email,
        password: regForm.password,
        sponsorId: regModal.parentId,
        parentId: regModal.parentId,
        placement: regModal.placement,
        investingAmount: regForm.investingAmount
      });

      setSuccessMessage("User registered and placed successfully!");
      
      // Refresh tree data
      const res = await api.get('/admin/network');
      setTreeData(res.data);
      
      setTimeout(() => {
        setRegModal(prev => ({ ...prev, open: false }));
      }, 1000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Failed to register user");
    } finally {
      setRegSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await api.get('/admin/network');
        setTreeData(res.data);
      } catch (error) {
        console.error('Failed to fetch network tree', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTree();
  }, []);

  // Helper to count nodes and sum volumes in a subtree
  const getSubtreeStats = (node) => {
    if (!node) return { count: 0, volume: 0 };
    
    let count = 1;
    let volume = parseFloat(node.volume || 0);
    
    if (node.left) {
      const leftStats = getSubtreeStats(node.left);
      count += leftStats.count;
      volume += leftStats.volume;
    }
    if (node.right) {
      const rightStats = getSubtreeStats(node.right);
      count += rightStats.count;
      volume += rightStats.volume;
    }
    
    return { count, volume };
  };

  const leftStats = treeData?.left ? getSubtreeStats(treeData.left) : { count: 0, volume: 0 };
  const rightStats = treeData?.right ? getSubtreeStats(treeData.right) : { count: 0, volume: 0 };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="page-header">
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-1px', background: 'linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Binary Network</h1>
        <p className="text-muted" style={{ fontSize: '0.875rem' }}>Interactive view of your binary tree</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon blue-light"><Users size={20} /></div>
          </div>
          <p className="stat-label">Left Team</p>
          <h2 className="stat-value">{leftStats.count}</h2>
        </div>
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon purple-light"><Users size={20} /></div>
          </div>
          <p className="stat-label">Right Team</p>
          <h2 className="stat-value">{rightStats.count}</h2>
        </div>
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon green-light"><Activity size={20} /></div>
          </div>
          <p className="stat-label">Left Business Vol</p>
          <h2 className="stat-value text-success">₹{leftStats.volume.toLocaleString()}</h2>
        </div>
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon red-light"><Activity size={20} /></div>
          </div>
          <p className="stat-label">Right Business Vol</p>
          <h2 className="stat-value text-danger">₹{rightStats.volume.toLocaleString()}</h2>
        </div>
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon purple-light"><Activity size={20} /></div>
          </div>
          <p className="stat-label">Matching Vol (Weaker Leg)</p>
          <h2 className="stat-value" style={{ color: '#5B3DF5' }}>₹{Math.min(leftStats.volume, rightStats.volume).toLocaleString()}</h2>
        </div>
      </div>

      <div className="card" style={{ padding: '40px 0', overflowX: 'auto', minHeight: '600px', WebkitOverflowScrolling: 'touch', position: 'relative' }}>
        <OrgTreeStyles />
        
        <div style={{ position: 'sticky', left: 0, width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px', zIndex: 50, pointerEvents: 'none' }}>
          <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--color-card)', padding: '6px', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', pointerEvents: 'auto' }}>
            <button onClick={handleZoomOut} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }} title="Zoom Out">
              <ZoomOut size={18} />
            </button>
            <button onClick={handleResetZoom} style={{ padding: '8px 12px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--color-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text)' }} title="Reset Zoom">
              {Math.round(zoom * 100)}%
            </button>
            <button onClick={handleZoomIn} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }} title="Zoom In">
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        <div style={{ width: 'max-content', minWidth: '100%', margin: '0 auto', padding: '0 20px', paddingBottom: '120px', zoom: zoom }}>
          <div className="org-tree">
            <ul>
              {loading ? <div style={{ padding: '40px', textAlign: 'center' }}>Loading tree...</div> : renderTree(treeData, true, null, 0, null, handleEmptyNodeClick, clickedSlot)}
            </ul>
          </div>
        </div>
      </div>

      {regModal.open && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="card" style={{
            padding: '28px',
            width: '100%',
            maxWidth: '440px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            backgroundColor: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text)' }}>Add New Member (Admin Mode)</h3>
              <p className="text-muted" style={{ fontSize: '0.75rem', margin: 0 }}>Register and place a member directly under this node.</p>
            </div>

            {errorMessage && (
              <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.8rem', fontWeight: 600 }}>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe" 
                  value={regForm.fullName} 
                  onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                  style={{
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>Mobile Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="9876543210" 
                  value={regForm.mobile} 
                  onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                  style={{
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com" 
                  value={regForm.email} 
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  style={{
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  value={regForm.password} 
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  style={{
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>Investing Amount</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  placeholder="Enter investing amount" 
                  value={regForm.investingAmount} 
                  onChange={(e) => setRegForm({ ...regForm, investingAmount: e.target.value })}
                  style={{
                    height: '42px',
                    padding: '0 12px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>Sponsor / Parent ID</label>
                  <input 
                    type="text" 
                    readOnly
                    value={regModal.parentId} 
                    style={{
                      height: '42px',
                      padding: '0 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text-muted)',
                      outline: 'none',
                      fontSize: '0.875rem',
                      cursor: 'not-allowed',
                      opacity: 0.8
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>Placement</label>
                  <input 
                    type="text" 
                    readOnly
                    value={regModal.placement} 
                    style={{
                      height: '42px',
                      padding: '0 12px',
                      borderRadius: '10px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text-muted)',
                      outline: 'none',
                      fontSize: '0.875rem',
                      cursor: 'not-allowed',
                      opacity: 0.8
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                  type="button" 
                  disabled={regSubmitting}
                  onClick={() => setRegModal(prev => ({ ...prev, open: false }))}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={regSubmitting}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: 'none',
                    backgroundColor: '#5B3DF5',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(91, 61, 245, 0.2)'
                  }}
                >
                  {regSubmitting ? "Registering..." : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinaryNetwork;
