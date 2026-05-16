import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  // Show navbar if user exists (either with _id or at least has basic user info)
  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-none"
          />
        </div>
        <div className="flex gap-3">
          {user?.image && (
            <Link to={`user-profile/${user?._id}`} className="hidden md:block">
              <img src={user.image} alt="user-pic" className="w-14 h-12 rounded-lg" />
            </Link>
          )}
          <Link to="/create-pin" className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center hover:bg-gray-800 transition-colors">
            <IoMdAdd fontSize={20} />
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center transition-colors"
            title="Logout"
          >
            <MdLogout fontSize={20} />
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;
