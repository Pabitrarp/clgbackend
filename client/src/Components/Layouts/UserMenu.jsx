import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
      <h4 className="text-black-100">User Panel</h4>
      <div className="dark:bg-gray-700 dark:border-gray-600 dark:text-white w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg h-screen mt-3">
        <NavLink
          to="/dashboard/user/profile"
          aria-current="true"
          className="dark:bg-gray-800 dark:border-gray-600 block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 rounded-t-lg cursor-pointer"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white block w-full px-4 py-2 border-b border-gray-200 cursor-pointer"
        >
          Orders
        </NavLink>
      </div>
    </>
  )
}

export default UserMenu
