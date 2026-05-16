import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import { userQuery } from '../utils/data';
import { client } from '../client';
import Pins from './Pins';
import logo from '../assets/logo.png';

const Home = ({ user: appUser }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);

  const userInfo = appUser || (localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null);

  useEffect(() => {
    if (!userInfo?.googleId) return;
    
    const query = userQuery(userInfo?.googleId);

    client.fetch(query).then((data) => {
      if (data && data.length > 0) {
        setUser(data[0]);
      }
    }).catch((err) => {
      console.error('Failed to fetch user:', err);
    });
  }, [userInfo?.googleId]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  });

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          {user && user._id ? (
            <Link to={`user-profile/${user._id}`}>
              <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
            </Link>
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-300" />
          )}
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar closeToggle={setToggleSidebar} user={user} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user || appUser} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
