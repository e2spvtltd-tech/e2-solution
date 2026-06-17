import React, { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Cell, Tooltip, CartesianGrid } from 'recharts';
import { ArrowUpRight, Activity, Users, UserCheck, UserPlus, Briefcase, TrendingUp, Clock, Percent, Network, Share2, Landmark, Wallet } from 'lucide-react';
import api from '../services/api';
import './Dashboard.css';

const mockChartData = [
  { name: 'Mon', uv: 0, pv: 0, amt: 0 },
  { name: 'Tue', uv: 0, pv: 0, amt: 0 },
  { name: 'Wed', uv: 0, pv: 0, amt: 0 },
  { name: 'Thu', uv: 0, pv: 0, amt: 0 },
  { name: 'Fri', uv: 0, pv: 0, amt: 0 },
  { name: 'Sat', uv: 0, pv: 0, amt: 0 },
  { name: 'Sun', uv: 0, pv: 0, amt: 0 },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    todayJoinings: 0,
    totalInvestments: 0,
    activeInvestments: 0,
    pendingWithdrawals: 0,
    todayROI: 0,
    todayBinary: 0,
    todayReferral: 0,
    totalRevenue: 0,
    recentActivity: [],
    chartData: mockChartData
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
        const res = await api.get('/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats({
          ...res.data,
          chartData: res.data.chartData || mockChartData
        });
      } catch (err) {
        console.error('Failed to fetch dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-4">Loading dashboard...</div>;

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="text-muted">Platform overview and real-time metrics</p>
      </div>

      <div className="stats-grid">
        {/* Row 1: Users */}
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon blue-light"><Users size={24} /></div>
          </div>
          <p className="stat-label">Total Users</p>
          <h2 className="stat-value">{stats.totalUsers.toLocaleString()}</h2>
        </div>
        
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon purple-light"><UserCheck size={24} /></div>
          </div>
          <p className="stat-label">Active Users</p>
          <h2 className="stat-value">{stats.activeUsers.toLocaleString()}</h2>
        </div>

        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon green-light"><UserPlus size={24} /></div>
          </div>
          <p className="stat-label">Today's Joinings</p>
          <h2 className="stat-value text-success">+{stats.todayJoinings.toLocaleString()}</h2>
        </div>

        {/* Row 2: Investments & Withdrawals */}
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon blue-light"><Briefcase size={24} /></div>
          </div>
          <p className="stat-label">Total Investments</p>
          <h2 className="stat-value">₹{stats.totalInvestments.toLocaleString()}</h2>
        </div>

        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon purple-light"><TrendingUp size={24} /></div>
          </div>
          <p className="stat-label">Active Investments</p>
          <h2 className="stat-value">₹{stats.activeInvestments.toLocaleString()}</h2>
        </div>

        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon red-light"><Clock size={24} /></div>
          </div>
          <p className="stat-label">Pending Withdrawals</p>
          <h2 className="stat-value text-danger">₹{stats.pendingWithdrawals.toLocaleString()}</h2>
        </div>

        {/* Row 3: Incomes */}
        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon green-light"><Percent size={24} /></div>
          </div>
          <p className="stat-label">Today's ROI</p>
          <h2 className="stat-value text-success">₹{stats.todayROI.toLocaleString()}</h2>
        </div>

        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon blue-light"><Network size={24} /></div>
          </div>
          <p className="stat-label">Today's Binary Income</p>
          <h2 className="stat-value text-primary">₹{stats.todayBinary.toLocaleString()}</h2>
        </div>

        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon purple-light"><Share2 size={24} /></div>
          </div>
          <p className="stat-label">Today's Referral</p>
          <h2 className="stat-value">₹{stats.todayReferral.toLocaleString()}</h2>
        </div>

        <div className="stat-card card">
          <div className="stat-header">
            <div className="stat-icon green-light"><Landmark size={24} /></div>
          </div>
          <p className="stat-label">Total Revenue</p>
          <h2 className="stat-value text-success">₹{stats.totalRevenue.toLocaleString()}</h2>
        </div>
      </div>

      {/* Analytics Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '24px', justifyContent: 'center' }}>
        <div className="chart-card card">
          <div className="chart-header">
            <h3>User Growth</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={stats.chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B3DF5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#5B3DF5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="uv" stroke="#5B3DF5" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card card">
          <div className="chart-header">
            <h3>Investment Growth</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: 'rgba(91, 61, 245, 0.04)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="pv" fill="#05CD99" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card card">
          <div className="chart-header">
            <h3>Binary vs Referral Income</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stats.chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="uv" stroke="#5B3DF5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="pv" stroke="#EE5D50" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

