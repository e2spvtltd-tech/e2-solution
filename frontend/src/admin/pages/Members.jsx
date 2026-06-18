import React, { useEffect, useState } from 'react';
import { Search, UserPlus, FileSpreadsheet, GitBranch } from 'lucide-react';
import api from '../services/api';
import './Members.css';

const Members = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['All Members', 'Active', 'Inactive', 'Pending'];

  useEffect(() => {
    api.get('/admin/members')
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching members', err);
        setLoading(false);
      });
  }, []);

  const filteredMembers = members.filter(m => {
    if (activeTab === 'All' || activeTab === 'All Members') return true;
    return m.status.toUpperCase() === activeTab.toUpperCase() || (activeTab === 'Pending' && m.status === 'PENDING KYC');
  });

  return (
    <div className="members-page">
      <div className="search-container">
        <div className="input-group search-input">
          <Search size={20} className="text-muted" />
          <input type="text" placeholder="Search members by name or ID..." />
        </div>
      </div>

      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab || (activeTab === 'All' && tab === 'All Members') ? 'active' : ''}`}
            onClick={() => setActiveTab(tab === 'All Members' ? 'All' : tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <button className="btn btn-primary full-width-btn">
        <GitBranch size={20} />
        View Binary Tree
      </button>

      <div className="members-list-header">
        <span className="members-count">MEMBERS ({filteredMembers.length})</span>
        <button className="export-btn">
          Export CSV
        </button>
      </div>

      <div className="members-list">
        {loading ? <p className="p-4">Loading members...</p> : filteredMembers.map((member) => (
          <div key={member.id} className="member-card card">
            <div className="member-info-top">
              <div className="member-profile">
                <div className="member-avatar">
                  <img src={member.avatar} alt={member.name} />
                </div>
                <div>
                  <h4>{member.name}</h4>
                  <p className="text-muted">ID: {member.id}</p>
                </div>
              </div>
              <span className={`badge ${member.status === 'ACTIVE' ? 'active' : member.status === 'INACTIVE' ? 'inactive' : 'pending'}`}>
                {member.status}
              </span>
            </div>

            <div className="member-stats">
              <div className="stat-group">
                <span className="stat-label">BUSINESS VOLUME</span>
                <span className="stat-value">{member.volume}</span>
              </div>
              <div className="stat-group text-right">
                <span className="stat-label">PLACEMENT</span>
                <span className="stat-value text-primary">{member.placement}</span>
              </div>
            </div>
          </div>
        ))}
        {!loading && filteredMembers.length === 0 && <p className="p-4 text-muted">No members found.</p>}
      </div>
    </div>
  );
};

export default Members;
