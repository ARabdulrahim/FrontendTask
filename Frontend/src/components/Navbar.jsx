import React, { useEffect, useState, useCallback, useContext } from "react";
import { Menu, X } from "lucide-react";
import {Link, useNavigate} from 'react-router-dom';
import {authContext} from '../context/AuthProvider';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let navigate=useNavigate();
  let{handleLogout}=useContext(authContext);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Logout = () => {
    handleLogout();
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b0f1a]/80 backdrop-blur-md border-b border-slate-800 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl italic">
            P
          </div>
          <span className="text-xl font-bold tracking-tight">
            Planzo
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {!localStorage.getItem("token") ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-blue-400 transition"
              >
                Login
              </button>
              <button 
              onClick={()=> navigate("/signup")}
              className="bg-blue-600 hover:bg-blue-500 hover:scale-105 transform transition-all duration-300 text-white px-5 py-2 rounded-full">
                Signup
              </button>
            </>
          ) : (
            <>
              <button onClick={()=> navigate("/dashboard")} className="hover:text-blue-400 transition">
                Dashboard
              </button>
              <button
                onClick={Logout}
                className="bg-red-500 hover:bg-red-400 hover:scale-105 transform transition-all duration-300 text-white px-5 py-2 rounded-full"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0b0f1a] px-6 pb-6 pt-4 space-y-4 text-slate-300">
          {true ? (
            <>
              <button onClick={()=> navigate("/login")} className="block w-full text-left">
                Login
              </button>
              <button onClick={()=> navigate("/signup")} className="block w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg">
                Signup
              </button>
            </>
          ) : (
            <>
              <button onClick={()=> navigate("/dashboard")} className="block w-full text-left">
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="block w-full bg-red-500 hover:bg-red-400 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;