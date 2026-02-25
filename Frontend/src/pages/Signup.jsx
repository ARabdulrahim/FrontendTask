import React, { useContext, useState } from "react";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthProvider";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
const{handleSignup}=useContext(authContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }
    handleSignup(formData);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-2xl italic shadow-lg shadow-blue-600/20">
            P
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Planzo
          </span>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 italic">
              Get Started.
            </h1>
            <p className="text-slate-400">
              Join the elite circle of Web3 traders.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <AuthInput
              name="name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              icon={<User size={18} />}
              value={formData.name}
              onChange={handleOnChange}
            />

            <AuthInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="alpha@primetrade.ai"
              icon={<Mail size={18} />}
              value={formData.email}
              onChange={handleOnChange}
            />

            <AuthInput
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              value={formData.password}
              onChange={handleOnChange}
            />

            <button
              type="submit"
              className="w-full bg-white text-black hover:bg-blue-50 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 mt-8 group disabled:opacity-60"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-400 font-bold ml-2 hover:underline tracking-tight"
            >
              Login
            </Link>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-600 uppercase tracking-widest font-semibold">
          <ShieldCheck size={14} /> AES-256 Encrypted Connection
        </div>
      </div>
    </div>
  );
};

// 🔥 Reusable Input Component
const AuthInput = ({
  label,
  type,
  placeholder,
  icon,
  name,
  value,
  onChange,
}) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
      {label}
    </label>

    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
        {icon}
      </div>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-[#0b0f1a]/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700 text-white"
      />
    </div>
  </div>
);

export default Signup;