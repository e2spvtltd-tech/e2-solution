import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MoreVertical, Edit, ShieldBan, CheckCircle, Eye } from 'lucide-react';
import api from '../services/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placementModal, setPlacementModal] = useState({ open: false, userId: null, currentPlacement: '' });
  const [newPlacement, setNewPlacement] = useState('Left Side');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/members');
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdatePlacement = async () => {
    try {
      await api.put(`/admin/members/${placementModal.userId}/placement`, 
        { placement: newPlacement }
      );
      setPlacementModal({ open: false, userId: null, currentPlacement: '' });
      fetchUsers();
    } catch (error) {
      console.error('Failed to update placement', error);
      alert('Failed to update placement');
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-1px', background: 'linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>User Management</h1>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>View, search, and manage platform members</p>
        </div>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '300px' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input type="text" placeholder="Search by ID, Name or Mobile..." style={{ width: '100%', padding: '10px 16px 10px 44px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', outline: 'none' }} />
            </div>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: 'var(--radius-md)' }}>
              <Filter size={18} /> Filters
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>User ID</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Name</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Mobile</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Sponsor ID</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Placement</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Joined Date</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" style={{ padding: '24px', textAlign: 'center' }}>Loading users...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan="8" style={{ padding: '24px', textAlign: 'center' }}>No users found.</td></tr>
              ) : users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '16px 8px', fontWeight: 600, color: 'var(--color-primary)' }}>{user.id}</td>
                  <td style={{ padding: '16px 8px', fontWeight: 500 }}>{user.name}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--color-text-muted)' }}>{user.mobile}</td>
                  <td style={{ padding: '16px 8px', color: 'var(--color-text-muted)' }}>{user.sponsorId}</td>
                  <td style={{ padding: '16px 8px' }}>
                    {user.placement === 'Pending' ? (
                      <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>Pending</span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>{user.placement}</span>
                    )}
                  </td>
                  <td style={{ padding: '16px 8px', color: 'var(--color-text-muted)' }}>{user.joined}</td>
                  <td style={{ padding: '16px 8px' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: user.status === 'Active' ? 'rgba(5, 205, 153, 0.1)' : 'rgba(238, 93, 80, 0.1)', color: user.status === 'Active' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {user.placement === 'Pending' && (
                        <button 
                          onClick={() => setPlacementModal({ open: true, userId: user.id, currentPlacement: user.placement })}
                          className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '6px' }}
                        >
                          Place
                        </button>
                      )}
                      <Link to={`/user-profile/${user.id}`} title="View Profile" style={{ color: 'var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Eye size={18} /></Link>
                      <span title="Edit" style={{ color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Edit size={18} /></span>
                      {user.status === 'Active' ? (
                        <span title="Block User" style={{ color: 'var(--color-danger)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ShieldBan size={18} /></span>
                      ) : (
                        <span title="Activate User" style={{ color: 'var(--color-success)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><CheckCircle size={18} /></span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {placementModal.open && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '400px' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '1.25rem', fontWeight: 'bold' }}>Assign Placement</h2>
            <p style={{ marginBottom: '16px', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Select which side of the tree this user should be placed on.</p>
            <select 
              value={newPlacement} 
              onChange={(e) => setNewPlacement(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '24px' }}
            >
              <option value="Left Side">Left Side</option>
              <option value="Right Side">Right Side</option>
            </select>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setPlacementModal({ open: false, userId: null, currentPlacement: '' })} className="btn btn-outline" style={{ padding: '8px 16px', borderRadius: '8px' }}>Cancel</button>
              <button onClick={handleUpdatePlacement} className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px' }}>Save Placement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
