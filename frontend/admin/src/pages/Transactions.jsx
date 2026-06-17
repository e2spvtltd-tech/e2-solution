import React, { useEffect, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Filter, Building2, Wallet } from 'lucide-react';
import api from '../services/api';
import './Transactions.css';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabs = ['All', 'Deposits', 'Withdrawals'];

  useEffect(() => {
    api.get('/admin/transactions')
      .then(res => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching transactions', err);
        setLoading(false);
      });
  }, []);

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Deposits') return tx.type === 'deposit';
    if (activeTab === 'Withdrawals') return tx.type === 'withdrawal';
    return true;
  });

  return (
    <div className="transactions-page">
      <div className="summary-cards">
        <div className="card summary-card">
          <div className="summary-icon blue-light">
            <Wallet size={24} />
          </div>
          <div className="summary-info">
            <span className="summary-label">TOTAL PAYOUTS</span>
            <h2 className="summary-value">₹0</h2>
            <span className="summary-trend text-primary">0%</span>
          </div>
        </div>
        
        <div className="card summary-card">
          <div className="summary-icon red-light">
            <ArrowDownLeft size={24} />
          </div>
          <div className="summary-info">
            <span className="summary-label">PENDING REQUESTS</span>
            <h2 className="summary-value">{transactions.filter(t => t.status === 'PENDING').length}</h2>
            <span className="summary-trend text-muted">All Time</span>
          </div>
        </div>
      </div>

      <div className="transactions-header">
        <h2>Transactions</h2>
        <button className="icon-btn-small">
          <Filter size={18} className="text-primary" />
        </button>
      </div>

      <div className="tabs-container">
        {tabs.map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="transactions-list">
        {loading ? <p className="p-4">Loading transactions...</p> : filteredTransactions.map((tx) => (
          <div key={tx.id} className="transaction-item card">
            <div className={`tx-icon ${tx.type === 'withdrawal' ? 'bg-danger-light' : 'bg-primary-light'}`}>
              {tx.type === 'withdrawal' ? <ArrowDownLeft size={20} className="text-danger" /> : <ArrowUpRight size={20} className="text-primary" />}
            </div>
            
            <div className="tx-details">
              <h4>{tx.title}</h4>
              <p className="text-muted">{tx.subtitle}</p>
              <div className="tx-date-wrap">
                <span className="tx-date">{tx.date}</span>
              </div>
            </div>
            
            <div className="tx-amount-status">
              <span className={`tx-amount ${tx.amount.startsWith('-') ? 'text-danger' : 'text-primary'}`}>
                {tx.amount}
              </span>
              <span className={`badge ${tx.status === 'COMPLETED' ? 'active' : tx.status === 'REJECTED' ? 'inactive' : 'pending'}`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
        {!loading && filteredTransactions.length === 0 && <p className="text-muted p-4">No transactions found.</p>}
      </div>

      <button className="btn btn-outline full-width-btn">
        View Transaction History
      </button>
    </div>
  );
};

export default Transactions;
