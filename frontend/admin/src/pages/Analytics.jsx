import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell, Tooltip, CartesianGrid } from 'recharts';
import { Activity, Users, Info } from 'lucide-react';
import './Analytics.css';

const data = [
  { name: '01 SEP', uv: 0 },
  { name: '05 SEP', uv: 0 },
  { name: '10 SEP', uv: 0 },
  { name: '15 SEP', uv: 0 },
  { name: '20 SEP', uv: 0 },
  { name: '25 SEP', uv: 0 },
  { name: '30 SEP', uv: 0 },
];

const topNodes = [];

const Analytics = () => {
  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics</h1>
        <p className="text-muted">Performance monitoring console</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon blue-light">
              <Activity size={20} />
            </div>
          </div>
          <p className="stat-label">Total Vol.</p>
          <div className="stat-val-row">
            <h2 className="stat-value">₹0</h2>
            <span className="text-muted text-sm">0%</span>
          </div>
        </div>
        
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon green-light">
              <Users size={20} />
            </div>
          </div>
          <p className="stat-label">Active Nodes</p>
          <div className="stat-val-row">
            <h2 className="stat-value">0</h2>
            <span className="text-muted text-sm">0%</span>
          </div>
        </div>
      </div>

      <div className="card revenue-card">
        <div className="card-header-flex">
          <span className="section-title">REVENUE DISTRIBUTION</span>
          <Info size={16} className="text-muted" />
        </div>

        <div className="progress-list">
          <div className="progress-item">
            <div className="progress-info">
              <span>ROI Payouts</span>
              <span className="progress-val text-primary">₹0 (0%)</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill bg-primary" style={{ width: '0%' }}></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-info">
              <span>Binary Bonuses</span>
              <span className="progress-val text-primary">₹0 (0%)</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill bg-primary-light2" style={{ width: '0%' }}></div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-info">
              <span>Direct Referrals</span>
              <span className="progress-val text-primary">₹0 (0%)</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill bg-primary-light3" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card chart-card">
        <div className="chart-header">
          <div>
            <h3 style={{fontSize: '1rem'}}>30-DAY GROWTH</h3>
            <p className="text-muted" style={{fontSize: '0.875rem'}}>0 Users</p>
          </div>
          <div className="chart-legend-dot"></div>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="barGradientAnalytics" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6D5CFF" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#4318FF" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} 
                dy={15}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(91, 61, 245, 0.04)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(91, 61, 245, 0.15)', padding: '12px 20px', fontWeight: 'bold', color: '#1b254b' }}
                itemStyle={{ color: '#5B3DF5' }}
              />
              <Bar dataKey="uv" radius={[10, 10, 0, 0]} barSize={36}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 3 ? 'url(#barGradientAnalytics)' : '#e0e7ff'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="top-nodes-section">
        <div className="activity-header">
          <h3>Top Nodes</h3>
          <a href="#" className="text-primary view-all">View All</a>
        </div>
        <div className="activity-list">
          {topNodes.map((node) => (
            <div key={node.id} className="activity-item card" style={{padding: '12px 16px'}}>
              <div className="activity-icon-img" style={{width: '40px', height: '40px', borderRadius: '50%'}}>
                <img src={node.avatar} alt={node.name} />
              </div>
              <div className="activity-content">
                <h4 style={{fontSize: '0.9rem', marginBottom: '2px'}}>{node.name}</h4>
                <p className="text-muted" style={{fontSize: '0.75rem'}}>{node.details}</p>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                <span style={{fontWeight: '700', fontSize: '0.9rem'}}>{node.amount}</span>
                {node.badge && (
                  <span className="badge active" style={{fontSize: '0.6rem', padding: '2px 6px', marginTop: '4px'}}>
                    {node.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
