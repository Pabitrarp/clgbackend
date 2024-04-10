import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../Components/Form/CategoryForm";
import { Modal } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  // handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/ecomm/api/v1/auth/categories",
        { name, description }
      );
      console.log(res.data);
      if (res.data.sucess) {
        toast.success(res.data.message);
        getAllCategory();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Input Form", {
        duration: 3000,
      });
    }
  };

  // Get All Category
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/ecomm/api/v1/auth/allCategories"
      );
      if (res.data.sucess) {
        setCategories(res.data.categories);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong To Get Category", {
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/ecomm/api/v1/auth/updateCategories/${selected._id}`,
        { name: updatedName, description: updatedDescription }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setSelected(null);
        setUpdatedName("");
        setUpdatedDescription("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/ecomm/api/v1/auth/deleteCategories/${id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        getAllCategory();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <>
      <Layout>
        <div className="flex w-full">
          <div className="w-1/4">
            <AdminMenu />
          </div>
          <div className="w-full">
          <div className=" flex bg-gray-800 h-16 justify-center items-center ">
              <h1 className="text-center text-white text-3xl font-extrabold">Manage Category</h1>
              </div>
            <div className="flex-1">
              <div className=" p-3 flex justify-end mt-4">
                <button
                  type="button"
                  className="focus:outline-none text-2xl text-white bg-gray-800
                  hover:bg-gray-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 me-2 mb-2  dark:hover:bg-gray-800 dark:focus:ring-green-800"
                  onClick={() => setCategoryModal(true)}
                >
                  Add Category
                </button>
                <Modal
                  onCancel={() => setCategoryModal(false)}
                  footer={null}
                  visible={categoryModal}
                >
                  <div className=" p-3">
                    <CategoryForm
                      handleSubmit={handleSubmit}
                      name={name}
                      setName={setName}
                      description={description}
                      setDescription={setDescription}
                    />
                  </div>
                </Modal>
              </div>
              <div className="categoryTable max-h-fit ml-4">
                <div
                  className="sm:rounded-lg relative overflow-x-auto bg-white"
                  style={{ maxHeight: "500px", overflowY: "auto" }}
                >
                  <table className="rtl:text-right w-full text-sm text-left text-white">
                    <thead className="sticky top-0 text-xl text-center text-gray-700 uppercase bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-white">
                          Category Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-white">
                          Category Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((c) => (
                        <tr
                          className="border-y-2 bg-white border-green-300"
                          key={c._id}
                        >
                          <td className="text-xl text-center text-black">
                            {c.name}
                          </td>
                          <td className="text-xl text-center text-black">
                            {c.description}
                          </td>
                          <td className="text-xl text-center text-black">
                            <button
                              type="button"
                              className="border-2 hover:border-blue-600 text-blue-600
                              hover:text-white
                              hover:bg-blue-500
                              focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-2xl px-5 py-2.5 text-center me-2 mt-4 mb-4 "
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setUpdatedDescription(c.description);
                                setSelected(c);
                              }}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="border-2 hover:border-rose-600 text-red-600
                              hover:text-white
                              hover:bg-red-500
                              focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-2xl px-5 py-2.5 text-center me-2 mt-4 mb-4 "
                              onClick={() => {
                                setShowDeleteModal(!showDeleteModal);
                                setSelected(c);
                              }}
                            >
                              <MdDelete />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Modal
                  onCancel={() => setVisible(false)}
                  footer={null}
                  visible={visible}
                >
                  <CategoryForm
                    name={updatedName}
                    setName={setUpdatedName}
                    description={updatedDescription}
                    setDescription={setUpdatedDescription}
                    handleSubmit={handleUpdate}
                  />
                </Modal>
                {showDeleteModal && (
                  <div>
                  <div
                    id="popup-modal"
                    tabIndex={-1}
                    className={`${
                      showDeleteModal ? "" : "hidden"
                    } overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
                  >
                    <div className="relative w-full max-w-md max-h-full p-4">
                      <div className="dark:bg-gray-700 relative bg-white rounded-lg shadow">
                        <button
                          type="button"
                          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="popup-modal"
                          onClick={() => setShowDeleteModal(false)}
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
                            Are you sure you want to delete this product?
                          </h3>
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            onClick={() => {
                              handleDelete(selected._id);
                              setShowDeleteModal(false);
                            }}
                          >
                            Yes, I'm sure
                          </button>
                          <button
                            data-modal-hide="popup-modal"
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => {
                              setShowDeleteModal(false);
                            }}
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
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;