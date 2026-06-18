import React, { useState, useEffect } from 'react';
import { Network, Users, Activity, ChevronDown } from 'lucide-react';
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
  `}} />
);

const BinaryNode = ({ user, isRoot = false }) => {
  // If user is null or empty object, treat as empty node
  if (!user || Object.keys(user).length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px', borderRadius: '16px', border: '1px dashed var(--color-border)', width: '120px', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-muted)', height: '140px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold', opacity: 0.5, marginBottom: '4px' }}>+</span>
        <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Empty</span>
      </div>
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

const renderTree = (node, isRoot = true, side = null, level = 0) => {
  if (!node && level > 2) return null; // limit mock depth
  
  const nodeWithSide = node ? { ...node, side } : null;

  return (
    <li key={node?.id || Math.random()}>
      <div><BinaryNode user={nodeWithSide} isRoot={isRoot} /></div>
      {node && (node.left || node.right || level < 2) && (
        <ul>
          {renderTree(node.left, false, "Left", level + 1)}
          {renderTree(node.right, false, "Right", level + 1)}
        </ul>
      )}
    </li>
  );
};

const BinaryNetwork = () => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      </div>

      <div className="card" style={{ padding: '40px 0', overflowX: 'auto', minHeight: '400px', WebkitOverflowScrolling: 'touch' }}>
        <OrgTreeStyles />
        <div style={{ width: 'max-content', margin: '0 auto', padding: '0 20px' }}>
          <div className="org-tree">
            <ul>
              {loading ? <div style={{ padding: '40px' }}>Loading tree...</div> : renderTree(treeData, true)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryNetwork;
