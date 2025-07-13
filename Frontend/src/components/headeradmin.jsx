import React from 'react';
import ShoppingLogo from '../assets/shopping.png';
import { useNavigate } from 'react-router-dom';

export default function HeaderAdmin({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 rounded-xl p-4 mb-6 relative z-10">
      <div className="flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center">
          <div className="mx-auto w-10 h-10 rounded-2xl flex items-center justify-center mb-3 mt-3 shadow-lg">
            <img src={ShoppingLogo} alt="Icon" className="w-full" />
          </div>
          <div className="ml-10">
            <h1 className="text-xl font-bold text-gray-800">ShopME - Admin Portal</h1>
            <p className="text-sm text-gray-600">E-Commerce System</p>
          </div>
        </div>

        {/* Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#ed1743] rounded-lg text-white border border-gray-300 font-medium hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
