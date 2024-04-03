import React from 'react'
import Layout from '../../Components/Layouts/Layout'
import AdminMenu from '../../Components/Layouts/AdminMenu'

const User = () => {
  return (
    <>
       <Layout>
        <div className="max-w-full px-4 mx-auto my-12 flex">
          {/* Left side for list of groups */}
          <div className="w-1/4 mr-4">
            <AdminMenu />
            {/* Add your group list component here */}
          </div>

          {/* Right side for content */}
          <div className="flex-1">
            <h1>All Users</h1>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default User
