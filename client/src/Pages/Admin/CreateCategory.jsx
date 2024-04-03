import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../Components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

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
          <div className="w-1/4 mr-4">
            <AdminMenu />
          </div>
          <div className="flex w-full">
            <div className="flex-1">
              <h1 className="text-center">Manage Category</h1>
              <div className="p-3">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                />
              </div>
              <div className="categoryTable ">
                <div className="sm:rounded-lg relative overflow-x-auto bg-white">
                  <table className="rtl:text-right w-full text-sm text-left text-gray-500">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Category Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((c) => (
                        <tr className="bg-white border-black border-y-2" key={c._id}>
                          <td className="text-center">{c.name}</td>
                          <td className="text-center">{c.description}</td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setUpdatedDescription(c.description);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
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
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
