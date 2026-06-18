import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import api from '../services/api';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/members');
      
      const reportData = res.data.map((user, index) => {
        const investment = 0; 
        const binary = 0;
        const dr = 0;
        const total = 0;
        const payout = 0;
        const profit = 0;

        return {
          sno: index + 1,
          idNo: user.id,
          name: user.name,
          mobile: user.mobile,
          investment: investment,
          binary: binary,
          dr: dr,
          total: total,
          payout: payout,
          profit: profit
        };
      });

      setReports(reportData);
    } catch (error) {
      console.error('Failed to fetch reports', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter(r => {
    const matchId = searchId ? r.idNo.toLowerCase().includes(searchId.toLowerCase()) : true;
    const matchName = searchName ? r.name.toLowerCase().includes(searchName.toLowerCase()) : true;
    return matchId && matchName;
  });

  const handleDownloadCSV = () => {
    const headers = ['S.no', 'ID No', 'Name', 'Mobile no', 'investment', 'binary', 'dr', 'total', 'payout', 'Profit'];
    const csvContent = [
      headers.join(','),
      ...filteredReports.map(r => 
        [r.sno, r.idNo, `"${r.name}"`, r.mobile, r.investment, r.binary, r.dr, r.total, r.payout, r.profit].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'customer_binary_referral_income.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totals = filteredReports.reduce((acc, curr) => {
    acc.investment += curr.investment;
    acc.binary += curr.binary;
    acc.dr += curr.dr;
    acc.total += curr.total;
    acc.payout += curr.payout;
    acc.profit += curr.profit;
    return acc;
  }, { investment: 0, binary: 0, dr: 0, total: 0, payout: 0, profit: 0 });

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-1px', background: 'linear-gradient(135deg, #1b254b 0%, #5B3DF5 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Customer Binary and Referral Income
          </h1>
          <p className="text-muted" style={{ fontSize: '0.875rem' }}>View and download customer income reports</p>
        </div>
        <button onClick={handleDownloadCSV} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: 'var(--radius-md)' }}>
          <Download size={18} /> Download List
        </button>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px', backgroundColor: 'var(--color-bg)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>ID No</label>
            <input 
              type="text" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-card)', outline: 'none', width: '200px' }} 
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Name</label>
            <input 
              type="text" 
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-card)', outline: 'none', width: '200px' }} 
            />
          </div>
          <button className="btn btn-primary" style={{ padding: '8px 24px', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
            go
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>s.no</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>ID No</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>Name</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>Mobile no</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>investment</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>binary</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>dr</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>total</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>payout</th>
                <th style={{ padding: '16px 8px', color: 'var(--color-text-muted)', fontWeight: 600, border: '1px solid var(--color-border)' }}>Profit</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="10" style={{ padding: '24px', border: '1px solid var(--color-border)' }}>Loading reports...</td></tr>
              ) : filteredReports.length === 0 ? (
                <tr><td colSpan="10" style={{ padding: '24px', border: '1px solid var(--color-border)' }}>No records found.</td></tr>
              ) : filteredReports.map(r => (
                <tr key={r.sno}>
                  <td style={{ padding: '12px 8px', border: '1px solid var(--color-border)' }}>{r.sno}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>{r.idNo}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 500, border: '1px solid var(--color-border)' }}>{r.name}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>{r.mobile}</td>
                  <td style={{ padding: '12px 8px', border: '1px solid var(--color-border)' }}>{r.investment}</td>
                  <td style={{ padding: '12px 8px', border: '1px solid var(--color-border)' }}>{r.binary}</td>
                  <td style={{ padding: '12px 8px', border: '1px solid var(--color-border)' }}>{r.dr}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 600, border: '1px solid var(--color-border)' }}>{r.total}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--color-success)', border: '1px solid var(--color-border)' }}>{r.payout}</td>
                  <td style={{ padding: '12px 8px', fontWeight: 600, color: r.profit >= 0 ? 'var(--color-success)' : 'var(--color-danger)', border: '1px solid var(--color-border)' }}>{r.profit}</td>
                </tr>
              ))}
            </tbody>
            {!loading && filteredReports.length > 0 && (
              <tfoot>
                <tr style={{ backgroundColor: 'var(--color-bg)', fontWeight: 'bold' }}>
                  <td colSpan="4" style={{ padding: '16px 8px', border: '1px solid var(--color-border)' }}>Total</td>
                  <td style={{ padding: '16px 8px', border: '1px solid var(--color-border)' }}>{totals.investment}</td>
                  <td style={{ padding: '16px 8px', border: '1px solid var(--color-border)' }}>{totals.binary}</td>
                  <td style={{ padding: '16px 8px', border: '1px solid var(--color-border)' }}>{totals.dr}</td>
                  <td style={{ padding: '16px 8px', border: '1px solid var(--color-border)' }}>{totals.total}</td>
                  <td style={{ padding: '16px 8px', border: '1px solid var(--color-border)' }}>{totals.payout}</td>
                  <td style={{ padding: '16px 8px', color: totals.profit >= 0 ? 'var(--color-success)' : 'var(--color-danger)', border: '1px solid var(--color-border)' }}>{totals.profit}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
