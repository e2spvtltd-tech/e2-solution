import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Infinity as InfinityIcon } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — E2 Solutions" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const api = (await import("@/services/api")).default;
      const res = await api.post('/auth/login', { emailOrId, password });
      localStorage.setItem('token', res.data.token);
      toast.success("Welcome back!");
      navigate({ to: "/app" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex min-h-screen w-full items-center justify-center p-0 md:p-8 font-sans"
      style={{
        backgroundColor: '#f8fafc',
      }}
    >
      <div className="flex w-full max-w-[1000px] min-h-[100vh] md:min-height-[700px] md:h-[700px] bg-white rounded-none md:rounded-[24px] shadow-none md:shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden flex-col md:flex-row">
        
        {/* Left Panel */}
        <div className="flex-1 lg:flex-[0.45] bg-gradient-to-br from-[#1f165a] to-[#100b2e] text-white p-10 md:p-12 flex flex-col items-center justify-center text-center relative overflow-hidden hidden md:flex">
          
          {/* Decorative Waves */}
          <div className="absolute -top-[150px] -left-[150px] w-[400px] h-[400px] rounded-full border border-white/5 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]"></div>
          <div className="absolute -bottom-[200px] -right-[100px] w-[500px] h-[500px] rounded-full border border-white/5 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]"></div>
          
          {/* Decorative Dots */}
          <div className="absolute top-[50px] right-[50px] w-[60px] h-[60px]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
          <div className="absolute bottom-[80px] left-[40px] w-[60px] h-[60px]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>

          <div className="relative z-10 mt-6">
            <div className="inline-flex text-blue-500 mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
              <InfinityIcon size={64} strokeWidth={2.5} />
            </div>
            <h1 className="text-[28px] font-bold tracking-wide m-0">E² Solutions</h1>
            <p className="text-[14px] text-[#a3aed0] mt-1">Pvt Ltd</p>
          </div>

          <div className="relative z-10 mt-10 mb-10">
            <h2 className="text-[#4f46e5] text-[20px] font-semibold mb-4">User Panel</h2>
            <p className="text-[#e2e8f0] text-[13px] leading-relaxed">
              Manage your investments, network<br/>and business with ease.
            </p>
          </div>

          {/* Dash Illustration */}
          <div className="relative z-10 w-full max-w-[260px] mt-auto mb-6">
            <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-4 h-[160px] flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-[28px] h-[28px] bg-[#4f46e5] rounded-full flex flex-col items-center justify-end overflow-hidden">
                  <div className="w-[10px] h-[10px] bg-white rounded-full mb-0.5"></div>
                  <div className="w-[20px] h-[10px] bg-white rounded-t-full"></div>
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="w-[60%] h-[4px] bg-white/20 rounded-full"></div>
                  <div className="w-[40%] h-[4px] bg-white/10 rounded-full"></div>
                </div>
                <div className="flex gap-1">
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                  <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                </div>
              </div>
              <div className="flex justify-between items-end flex-1">
                <div className="w-[60%] h-full">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,30 Q15,40 30,20 T60,25 T100,5" fill="none" stroke="#5a48e7" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="w-[40%] flex justify-end items-center">
                  <div className="w-[45px] h-[45px] rounded-full relative" style={{ background: 'conic-gradient(#4f46e5 0% 75%, rgba(255, 255, 255, 0.1) 75% 100%)' }}>
                    <div className="absolute inset-[10px] bg-[#17113e] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[50px] h-[50px] bg-gradient-to-br from-[#4f46e5] to-[#3b82f6] rounded-xl flex items-center justify-center shadow-[0_10px_20px_rgba(59,130,246,0.4)]">
              <ShieldCheck size={32} color="white" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-[1.2] p-8 sm:p-12 md:p-16 flex flex-col justify-center relative">
          <div className="w-full max-w-[400px] mx-auto">
            <div className="text-center mb-10">
              <div className="w-[60px] h-[60px] bg-[#f5f3ff] border-[1.5px] border-[#e0e7ff] rounded-full flex items-center justify-center mx-auto mb-5">
                <Lock size={28} className="text-[#4f46e5]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e293b] mb-2">Welcome Back!</h2>
              <p className="text-[13px] text-[#64748b]">Sign in to continue to User Panel</p>
            </div>

            <form onSubmit={submit}>
              <div className="mb-5">
                <label className="block text-[12px] font-semibold text-[#1e293b] mb-2">Email Address</label>
                <div className="relative flex items-center">
                  <Mail size={18} className="absolute left-3.5 text-[#94a3b8]" />
                  <input 
                    type="text" 
                    placeholder="you@example.com"
                    value={emailOrId}
                    onChange={(e) => setEmailOrId(e.target.value)}
                    required
                    className="w-full py-3 pl-[40px] pr-3.5 border border-[#e2e8f0] rounded-xl text-[14px] text-[#1e293b] outline-none focus:border-[#4f46e5] focus:ring-[3px] focus:ring-[#4f46e5]/10 transition-all bg-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[12px] font-semibold text-[#1e293b]">Password</label>
                  <Link to="/forgot-password" className="text-[12px] font-semibold text-[#4f46e5] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <Lock size={18} className="absolute left-3.5 text-[#94a3b8]" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-3 pl-[40px] pr-10 border border-[#e2e8f0] rounded-xl text-[14px] text-[#1e293b] outline-none focus:border-[#4f46e5] focus:ring-[3px] focus:ring-[#4f46e5]/10 transition-all bg-transparent"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-[#94a3b8] hover:text-[#475569]">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center relative pl-7 cursor-pointer text-[12px] font-medium text-[#1e293b]">
                  <input type="checkbox" className="peer absolute opacity-0 w-0 h-0" defaultChecked />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-[#cbd5e1] rounded peer-checked:bg-[#4f46e5] peer-checked:border-[#4f46e5] transition-all flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Remember me
                </label>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] text-white rounded-xl text-[14px] font-semibold shadow-[0_4px_14px_rgba(79,70,229,0.3)] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed mb-6"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

              <div className="flex items-center text-center mb-6">
                <div className="flex-1 border-b border-[#e2e8f0]"></div>
                <span className="px-3 text-[12px] text-[#94a3b8]">or</span>
                <div className="flex-1 border-b border-[#e2e8f0]"></div>
              </div>

              <button type="button" className="w-full py-3 bg-transparent text-[#4f46e5] border border-[#e0e7ff] rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#f8fafc] hover:border-[#4f46e5] transition-all">
                <ShieldCheck size={18} />
                Login with OTP
              </button>
            </form>

            <div className="mt-8 text-center flex flex-col gap-2">
               <div className="text-[12px] text-[#64748b]">
                 Don't have an account? <Link to="/register" className="font-semibold text-[#4f46e5] hover:underline">Request Access</Link>
               </div>
               <p className="text-[11px] text-[#64748b] mt-4">
                 © 2024 E² Solutions Pvt Ltd. All rights reserved.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
