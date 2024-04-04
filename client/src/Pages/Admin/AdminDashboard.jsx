import React from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const { auth } = useAuth();

  return (
    <>
      <Layout>
      <div className="w-1/4 mr-4 ">
            <AdminMenu className="h-full" />
            {/* Add your group list component here */}
          </div>
        <div className="max-w-full px-4 mx-auto my-12 flex">
          {/* Left side for list of groups */}
          

          {/* Right side for content */}
          <div className="flex-1">
            <div className="card w-full border-4 border-style:solid p-3">
              <h3>Admin Name:{auth?.user?.name}</h3>
              <h3>Admin Email:{auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboard;
