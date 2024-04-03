import React from 'react'
import Layout from '../../Components/Layouts/Layout'
import UserMenu from '../../Components/Layouts/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const {auth} = useAuth();
  return (
    <Layout>
       <div className="max-w-full px-4 mx-auto my-12 flex">
          {/* Left side for list of groups */}
          <div className="w-1/4 mr-4">
            <UserMenu/>
            {/* Add your group list component here */}
          </div>

          {/* Right side for content */}
          <div className="flex-1">
            <div className="card w-full border-4 border-style:solid p-3">
              <h3>User Name:{auth?.user?.name}</h3>
              <h3>User Email:{auth?.user?.email}</h3>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard
