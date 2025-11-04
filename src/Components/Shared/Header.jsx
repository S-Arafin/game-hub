import React, { Suspense, use, useState } from "react";
import { Link } from "react-router";
import Loader from "./Loader";
import Search from "./Search";
import { AuthContext } from "../../Provider/AuthProvider";

import userIcon from "../../assets/user.png";
import { toast } from "react-toastify";

const Header = ({ handleCategoryClick }) => {
  const { user, logout } = use(AuthContext);
  
  const handleLogout = () => {
    
    logout()
      .then(() => {
        toast.error("loged out successfully");
      })
      .catch((error) => {
        toast.error(error)
      });
  };
  const navLinks = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <button onClick={handleCategoryClick}>
          <Link to="/">Categories</Link>
        </button>
      </li>
      <li>
        <Link to="/account/library">Library</Link>
      </li>
    </>
  );

  const [search, setSearch] = useState("");

  return (
    <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-2xl text-primary">
          Game<span className="text-accent">hub</span>
        </Link>
        <div>{user && <p className="text-secondary text-sm hidden md:block">Hi! {user.displayName}</p>}</div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        <div className="flex items-center gap-2">
          <div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-32 md:w-46 h-8 hidden sm:block"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              {search.length > 0 && (
                <Suspense fallback={<Loader></Loader>}>
                  <Search search={search}></Search>
                </Suspense>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {user ? (
              <div className="flex gap-5 items-center">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-secondary btn-sm"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="btn btn-outline btn-secondary btn-sm"
              >
                Login
              </Link>
            )}

            <Link to="/account/profile">
              <img
                className="max-w-[36px] rounded-4xl border-2 border-primary p-1"
                src={user && user.photoURL ? user.photoURL : userIcon}
                referrerPolicy="no-referrer"
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
