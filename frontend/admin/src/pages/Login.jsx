import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, LogIn, Shield } from 'lucide-react';
import './Login.css';
import api from '../services/api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Admin Login — E2 Solutions";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Authenticate using the real API
      const res = await api.post('/auth/login', { emailOrId: email, password });
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">


        {/* Right Panel */}
        <div className="login-right-panel">
          <div className="login-form-container">
            <div className="login-header">
              <div className="lock-circle">
                <Lock size={28} color="#6d28d9" />
              </div>
              <h2>Welcome Back!</h2>
              <p>Please sign in to continue to the admin panel.</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-flex">
                  <label>Password</label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group remember-group">
                <label className="custom-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  Remember me
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <LogIn size={18} />
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="divider-text">
                <span>or</span>
              </div>

              <button type="button" className="otp-btn">
                <ShieldCheck size={18} />
                Login with OTP
              </button>
            </form>

            <div className="secure-info-box">
              <Shield size={20} className="secure-icon" />
              <div>
                <h4>Secure Admin Access</h4>
                <p>All activities are monitored and recorded.</p>
              </div>
            </div>

            <div className="footer-text">
              © 2024 E² Solutions Pvt Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
