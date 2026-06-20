import React from 'react';
import { Link } from 'react-router-dom';

const WalletManagement = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Wallet Management</h2>
        <Link to="/withdrawals" className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', color: '#ffffff' }}>
          View Withdrawals
        </Link>
      </div>
      <div className="card">
        <p className="text-muted">Welcome to the Wallet Management interface. Data and tables will be rendered here.</p>
      </div>
    </div>
  );
};

export default WalletManagement;
