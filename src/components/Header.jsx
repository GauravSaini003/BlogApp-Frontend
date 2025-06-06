import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex flex-wrap justify-between items-center px-6 py-4 bg-[#00809D] text-white shadow-md">
      
      <Link
        to="/"
        className="text-2xl font-bold tracking-wide hover:text-[#F3A26D] transition-colors duration-300 mb-2 sm:mb-0"
      >
        MiniBlog
      </Link>

      {/* Links  to navigate*/}
      <div className="flex flex-wrap items-center space-x-4 text-base font-medium">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="hover:text-[#FCECDD] transition-colors duration-300"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="bg-[#FF7601] px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300 mt-2 sm:mt-0"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-[#FCECDD] transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#FF7601] px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300 text-white mt-2 sm:mt-0"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
