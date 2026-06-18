const fs = require('fs');
const files = [
  'BinaryNetwork', 'InvestmentPlans', 'Investments', 'Withdrawals',
  'Reports', 'Notifications', 'Announcements', 'Messaging',
  'AuditLogs', 'RoleManagement', 'UserProfile'
];

files.forEach(f => {
  const content = `import React from 'react';

const ${f} = () => {
  return (
    <div className="card">
      <h2 style={{ marginBottom: '20px' }}>${f.replace(/([A-Z])/g, ' $1').trim()}</h2>
      <p style={{ color: 'var(--color-text-muted)' }}>This module is currently under development.</p>
    </div>
  );
};

export default ${f};
`;
  fs.writeFileSync(f + '.jsx', content);
});
