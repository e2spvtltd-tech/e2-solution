import React from 'react';
import { Link } from 'react-router-dom';

const InvestmentPlans = () => {
  return (
    <div className="card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Investment Plans</h2>
        <Link to="/investments" className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', color: '#ffffff' }}>
          View User Investments
        </Link>
      </div>
      <p style={{ color: 'var(--color-text-muted)' }}>This module is currently under development.</p>
    </div>
  );
};

export default InvestmentPlans;
