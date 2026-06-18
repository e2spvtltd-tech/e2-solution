import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toastWithSound as toast } from "@/lib/toast-with-sound";
import { Lock, Mail, Eye, EyeOff, LogIn, Shield, ArrowLeft } from "lucide-react";

import api from "@/services/api";

export const Route = createFileRoute("/login")({
  head: () => ({ 
    meta: [{ title: "Sign In — E2 Solutions" }]
  }),
  // If already logged in, skip login page and go straight to app
  beforeLoad: () => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      throw redirect({ to: "/app" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await api.post('/auth/login', { emailOrId, password });
      
      const userRole = res.data.role || res.data.user?.role;
      
      if (userRole === 'ADMIN') {
        window.location.href = `/admin?token=${res.data.token}`;
      } else {
        localStorage.setItem('token', res.data.token);
        toast.success("Welcome back!");
        navigate({ to: "/app" });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || "Login failed. Please check your credentials.");
      toast.error(err.response?.data?.message || err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card" style={{ maxWidth: '450px' }}>
        <div className="login-right-panel" style={{ width: '100%', padding: '50px 30px' }}>
          <div className="back-to-home-wrapper">
            <Link to="/" className="back-to-home-link">
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="login-form-container">
            <div className="login-header">
              <div className="lock-circle">
                <Lock size={28} color="#6d28d9" />
              </div>
              <h2>Welcome Back!</h2>
              <p>Please sign in to continue to your panel.</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={submit}>
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input 
                    type="text" 
                    placeholder="you@example.com"
                    value={emailOrId}
                    onChange={(e) => setEmailOrId(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="label-flex">
                  <label>Password</label>
                  <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
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
            </form>

            <div className="secure-info-box">
              <Shield size={20} className="secure-icon" />
              <div>
                <h4>Secure Access</h4>
                <p>All activities are monitored and recorded.</p>
              </div>
            </div>

            <div className="mt-8 text-center flex flex-col gap-2">
               <div className="text-[12px]" style={{ color: '#64748b', fontSize: '12px', marginTop: '20px' }}>
                 Don't have an account? <Link to="/register" className="font-semibold hover:underline" style={{ color: '#6d28d9', fontWeight: 600, marginLeft: '4px', textDecoration: 'none' }}>Sign up</Link>
               </div>
               <p className="text-[11px]" style={{ marginTop: '10px', fontSize: '11px', color: '#94a3b8' }}>
                 © 2024 E² Solutions Pvt Ltd. All rights reserved.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
