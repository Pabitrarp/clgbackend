import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import createproduct from "../../assets/createproduct.png";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);

  //get All Categories
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
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/ecomm/api/v1/auth/singleProduct/${params.name}`
      );

      setName(res.data.Product.name);
      setId(res.data.Product._id);
      setDescription(res.data.Product.description);
      setPrice(res.data.Product.price);
      setQuantity(res.data.Product.quantity);
      setCategory(res.data.Product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, [])
  //deleteProduct
  const deleteProduct = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/ecomm/api/v1/auth/deleteProduct/${id}`
      );
      if (res.data.success) {
        toast.success(`${name} deleted Sucessfully`,{
          duration: 4000,
        });
        navigate("/dashboard/admin/products");
      } else {
        toast.error(`Something went Wrong while deleting ${name}`,{
          duration: 4000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong While Delete");
    }
  };
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);

      const res = await axios.put(`http://localhost:8000/ecomm/api/v1/auth/updateProduct/${id}`,productData);
      if(res.data.success)
      {
        toast.success(res.data.message,{
          duration: 5000,
        })
        navigate('/dashboard/admin/products')
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wromg while update product");
    }
  };
  return (
    <Layout>
      <div className="flex w-full">
        <div className="w-1/4 h-full">
          <AdminMenu />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-center h-16 bg-green-200">
            <h1 className="text-3xl font-extrabold text-center">
              Manage Product
            </h1>
          </div>
          <div className="main lg:mt-20 lg:flex">
            <div className="logo lg:w-1/2 border-r-2 border-black">
              <img src={`http://localhost:8000/ecomm/api/v1/auth/productPhoto/${id}`} alt="Logo" className=" h-full" />
            </div>
            <div className="functions lg:w-1/2 h-full">
              {/* Update Button */}
              <div className="updateButton ustify-center items-center h-full">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full flex justify-center items-center mt-20 lg:text-4xl"
                  onClick={() => setEditModal(true)}
                >
                  <FaEdit />
                </button>

                {/* Delete Button */}

                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg te px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-full flex justify-center items-center lg:text-4xl"
                  onClick={() => setDeleteModal(true)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* //Modal For Edit */}
      <div className="w-full">
        {/* Main modal */}
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden={editModal ? "true" : "false"}
          className={`${
            editModal ? "fixed" : "hidden"
          } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0`}
        >
          <div className="relative w-full max-w-md max-h-full p-4">
            {/* Modal content */}
            <div className="dark:bg-gray-700 relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="md:p-5 dark:border-gray-600 flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="dark:text-white text-lg font-semibold text-gray-900">
                  Update Product
                </h3>
                <button
                  type="button"
                  className="hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg"
                  data-modal-toggle="crud-modal"
                  onClick={() => setEditModal(false)}
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
              </div>
              {/* Modal body */}
              <form className="md:p-5 p-4" onSubmit={updateProduct}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="dark:text-white block mb-2 text-sm font-medium text-gray-900"
                    >
                      Upload New Image
                    </label>
                    <input
                      type="file"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      accept="image/*"
                      required
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </div>
                  <div className="sm:col-span-1 col-span-2">
                    <label
                      htmlFor="price"
                      className="dark:text-white block mb-2 text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-1 col-span-2">
                    <label
                      htmlFor="category"
                      className="dark:text-white block mb-2 text-sm font-medium text-gray-900"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                      min="1"
                    />
                  </div>
                  {/* this is for catagory and price  */}
                  <div className="sm:col-span-1 col-span-2">
                    <label
                      htmlFor="price"
                      className="dark:text-white block mb-2 text-sm font-medium text-gray-900"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      value={price}
                      required
                      min="1"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-1 col-span-2">
                    <label
                      htmlFor="category"
                      className="dark:text-white block mb-2 text-sm font-medium text-gray-900"
                    >
                      Category
                    </label>

                    <select
                      placeholder="Select Categories"
                      showSearch
                      value={category}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      {categories?.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* this is for catagory and price  */}
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="dark:text-white block mb-2 text-sm font-medium text-gray-900"
                    >
                      Product Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write product description here"
                      defaultValue={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Update product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* //delete modal */}
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
                  Are you sure you want to delete this product?
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={deleteProduct}
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
    </Layout>
  );
};
export default UpdateProduct;
