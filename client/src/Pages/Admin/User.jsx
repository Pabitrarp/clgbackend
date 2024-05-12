import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const getUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/ecomm/api/v1/auth/all-users`
      );
      if (res.data.success) {
        toast.success(res.data.message, {
          duration: 5000,
        });
        setUsers(res.data.users);
      } else {
        toast.error(res.data.message, {
          duration: 4000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (uid) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/ecomm/api/v1/auth/delete-user/${uid}`
      );
      if (res.data.success) {
        getUsers();
        toast.success(res.data.message, {
          duration: 5000,
        });
      } else {
        toast.error(res.data.message, {
          duration: 4000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex w-full">
          {/* Left side for list of groups */}
          <div className="w-1/4 mr-4">
            <AdminMenu />
            {/* Add your group list component here */}
          </div>

          {/* Right side for content */}
          <div className="grid w-screen h-screen grid-cols-3 p-4 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-3xl mt-9 px-6 py-4 m-4 bg-gray-800 border-2 w-96 h-96"
              >
                <img
                  className="sm:w-24 sm:h-24 block object-cover w-16 h-16 m-auto rounded-full"
                  src="data:image/jpeg;base64,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"
                  alt={user.name}
                />
                <div className="sm:mt-0 sm:ml-4 sm:text-left text-center">
                  <div className="mt-9 flex flex-col items-center justify-center">
                    <p className="text-xl font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="text-xl font-semibold text-white">
                      {user.email}
                    </p>
                    <p className="text-sm font-medium text-white">
                      {user.userType}
                    </p>
                  </div>
                  <div className="mt-9 left-0 right-0 flex items-center justify-center">
                    {/* <a
                      href="#"
                      className="hover:bg-blue-600  items-start inline-block px-4 py-2 text-white bg-blue-500 rounded-lg"
                    >
                      View Profile
                    </a> */}
                    <a
                      href="#"
                      className="hover:bg-red-600  inline-block px-4 py-2 text-white bg-red-500 rounded-lg"
                      onClick={() => {
                        setDeleteModal(true);
                        setSelected(user);
                      }}
                    >
                      Delete Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {deleteModal && (
            <div>
            <div
              id="popup-modal"
              tabIndex={-1}
              className={`${
                deleteModal ? "" : "hidden"
              } overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
              <div className="relative w-full max-w-md max-h-full p-4">
                <div className="dark:bg-gray-700 relative bg-white rounded-lg shadow">
                  <button
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                    onClick={() => setDeleteModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="md:p-5 p-4 text-center">
                    <svg
                      className="dark:text-gray-200 w-12 h-12 mx-auto mb-4 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="dark:text-gray-400 mb-5 text-lg font-normal text-gray-500">
                      {`Are you sure you want to delete this product ${selected.name}`}
                    </h3>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      onClick={() => {
                        deleteUser(selected._id);
                        setDeleteModal(false);
                      }}

                    >
                      Yes, I'm sure
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={() => setDeleteModal(false)}
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </Layout>
    </>
  );
};
export default User;
