import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaProductHunt } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa";


const AdminMenu = () => {
  return (
    <>
   {/* <h4 className="text-black-100">Admin Panel</h4> */}
      <div className="dark:bg-gray-800 dark:border-gray-600 dark:text-white w-49 text-sm font-medium text-gray-900 bg-white border border-gray-200  h-screen">
        <NavLink
          to="/dashboard/admin"
          aria-current="true"
          className=" my-2 dark:bg-gray-800 hover:bg-indigo-700 w-full px-4 py-2 text-white bg-blue-700 cursor-pointer flex text-3xl text-center"
        ><FaHome className="mr-4 text-5xl" />
          DashBoard
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-category"
          className="my-2 dark:bg-gray-800 hover:bg-indigo-700 w-full px-4 py-2 text-white bg-blue-700 cursor-pointer flex text-3xl text-center"
        ><TbCategoryPlus className="mr-4 text-5xl" />
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-products"
          className="my-2 dark:bg-gray-800  hover:bg-indigo-700 w-full px-4 py-2 text-white bg-blue-700 cursor-pointer flex text-3xl text-center"
        > 
       <AiFillPlusCircle className="mr-4 text-5xl"/>
          Create Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="my-2 dark:bg-gray-800  hover:bg-indigo-700 w-full px-4 py-2 text-white bg-blue-700  cursor-pointer flex text-3xl text-center"
        >
          <FaProductHunt className="mr-4 text-5xl"/>
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="my-2 dark:bg-gray-800 hover:bg-indigo-700 w-full px-4 py-2 text-white bg-blue-700 cursor-pointer flex text-3xl text-center"
        >
          <FaUsers className="mr-4 text-5xl"/>
          Users
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
