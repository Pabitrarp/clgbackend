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
  const [visible, setVisble] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  //handle Form
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
      toast.error("Something Went Wrong in Input Forn", {
        duration: 3000,
      });
    }
  };
  //Get All Category
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

  //Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.put(`http://localhost:8000/ecomm/api/v1/auth/updateCategories/${selected._id}`,{name:updatedName,description:updatedDescription})
     if(res.data.sucess)
     {
      toast.success(res.data.message)
      setSelected(null)
      setUpdatedName("")
      setUpdatedDescription("")
      setVisble(false)
      getAllCategory()
     }
     else{
      toast.error(res.data.message)
     }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

   //Delete Category
   const handleDelete = async (id) => {
    try {
     const res = await axios.delete(`http://localhost:8000/ecomm/api/v1/auth/deleteCategories/${id}`)
     if(res.data.success)
     {
      toast.success(res.data.message)
      getAllCategory()
     }
     else{
      toast.error(res.data.message)
     }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className="flex max-w-full px-4 mx-auto my-12">
          {/* Left side for list of groups */}
          <div className="w-1/4 mr-4">
            <AdminMenu />
            {/* Add your group list component here */}
          </div>

          {/* Right side for content */}
          <div className="flex-1">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
              />
            </div>
            <div className="categoryTable">
              <div className="sm:rounded-lg relative overflow-x-auto shadow-md">
                <table className="rtl:text-right dark:text-gray-400 w-full text-sm text-left text-gray-500">
                  <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-xs text-gray-700 uppercase">
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
                      <tr className="dark:bg-gray-800 bg-white" key={c._id}>
                        <td>{c.name}</td>
                        <td>{c.description}</td>
                        <td>
                          <button
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => {
                              setVisble(true);
                              setUpdatedName(c.name);
                              setUpdatedDescription(c.description);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => {handleDelete(c._id)}}
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
                onCancel={() => setVisble(false)}
                footer={null}
                visible={visible}
              >
                <CategoryForm
                  name={updatedName}
                  setName={setUpdatedName}
                  description={updatedDescription} // Pass updatedDescription as a prop
                  setDescription={setUpdatedDescription}
                  handleSubmit={handleUpdate}
                />
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
