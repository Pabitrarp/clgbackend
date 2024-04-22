import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaProductHunt } from 'react-icons/fa';
import { BiSolidShoppingBag } from "react-icons/bi";



const AdminMenu = () => {
  return (
    <>
   {/* <h4 className="text-black-100">Admin Panel</h4> */}
      <div className="dark:bg-gray-800 dark:border-gray-600 dark:text-white w-49 text-sm font-medium text-gray-900 bg-white border border-gray-200 h-screen">
        <NavLink
          to="/dashboard/user"
          aria-current="true"
          className=" my-2 dark:bg-gray-800 hover:bg-indigo-700 w-full px-4 py-2 text-white bg-blue-700 cursor-pointer flex text-3xl text-center"
        ><FaHome className="mr-4 text-5xl" />
          DashBoard
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="my-2 dark:bg-gray-800  hover:bg-indigo-700 w-full px-4 py-2 text-white bg-blue-700  cursor-pointer flex text-3xl text-center"
        >
          <BiSolidShoppingBag className="mr-4 text-5xl"/>
          Orders
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;