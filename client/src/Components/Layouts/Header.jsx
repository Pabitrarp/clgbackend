import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import Searchinput from "../Form/Searchinput";
import { useCart } from "../../context/CartContext";
import { Badge } from "antd";
import { TbLogout2 } from "react-icons/tb";
import { TbLogin2 } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../../assets/logo.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const { cart } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setTimeout(() => {
      toast.success("Logout Successfully", {
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <>
      <nav className="dark:bg-gray-900 bg-white border-gray-200">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link
            to="/"
            className="rtl:space-x-reverse flex items-center space-x-3"
          >
            <img src={logo} className="h-16 w-16 rounded-2xl" alt="Logo" />
            <span className="whitespace-nowrap dark:text-white self-center text-2xl font-semibold">
              MedPlus
            </span>
          </Link>
          <Searchinput />
          <button
            onClick={toggleMenu}
            type="button"
            className="md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg">
              <li>
                <NavLink
                  to="/"
                  className="md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 block px-3 py-2 text-white bg-blue-700 rounded"
                  aria-current="page"
                >
                  
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent block px-3 py-2 text-gray-900 rounded"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/dashboard/${
                    auth?.user?.userType === "admin" ? "admin" : "user"
                  }`}
                  className="hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent block px-3 py-2 text-gray-900 rounded"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className="hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent block px-3 py-2 text-gray-900 rounded"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <Badge count={cart?.length} showZero>
                  <NavLink
                    to="/cart"
                    className="hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent block px-3 py-2 text-gray-900 rounded"
                  >
                    <FaShoppingCart className="text-2xl" title="Cart "/>
                  </NavLink>
                </Badge>
              </li>
              {!auth.user ? (
                <>
                  <li>
                    <NavLink
                      to="/log-in"
                      className="hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent block px-3 py-2 text-gray-900 rounded"
                    >
                      <TbLogin2 className="text-2xl" title="Log In"/>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sign-up"
                      className="hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent block px-3 py-2 text-gray-900 rounded"
                    >
                      <FaUserPlus className="text-2xl" title="Sign Up"/>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/log-in"
                      className="hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent block px-3 py-2 text-gray-900 rounded"
                    >
                      <TbLogout2  className="text-2xl" title="Log Out"/>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;