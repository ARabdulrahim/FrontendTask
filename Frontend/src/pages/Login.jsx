import React, { useContext, useState } from "react";
import { Mail, Lock, LogIn, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const{handleLogin}=useContext(authContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }
    handleLogin(formData);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      <Link
        to="/"
        className="absolute top-10 left-10 text-slate-500 hover:text-white flex items-center gap-2 transition-colors font-medium"
      >
        <ChevronLeft size={20} /> Back to Home
      </Link>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[60px] rounded-full" />

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-2xl mb-6 text-blue-500">
              <LogIn size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2 italic">
              Welcome Back.
            </h1>
            <p className="text-slate-400">
              Securely access your trading dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="alpha@primetrade.ai"
                  required
                  className="w-full bg-[#0b0f1a]/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-blue-400 hover:underline"
                >
                  Forgot?
                </button>
              </div>

              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400"
                  size={18}
                />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#0b0f1a]/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 mt-4 disabled:opacity-60"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-10 text-slate-500 text-sm">
            Don't have an account?
            <Link
              to="/signup"
              className="text-white font-bold ml-2 hover:text-blue-400 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;