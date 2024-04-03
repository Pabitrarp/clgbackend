import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { Select } from "antd";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //get Single Product
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
      setShipping(res.data.Product.shipping);
      setCategory(res.data.Product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/ecomm/api/v1/auth/allCategories"
      );
      if (res.data.success) {
        setCategories(res.data.categories);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById("p_photo").click();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);

      const res = await axios.put(
        `http://localhost:8000/ecomm/api/v1/auth/updateProduct/${id}`,
        productData
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong While Update");
    }
  };
  //Delete A Product
  const handleDelete = async () => {
    try {
      let answer = prompt("Are You Sure You Want To Delete this Product");
      if (!answer) return;
      const res = await axios.delete(
        `http://localhost:8000/ecomm/api/v1/auth/deleteProduct/${id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong While Delete");
    }
  };
  return (
    <Layout>
      <div className="flex max-w-full px-4 mx-auto my-12">
        <div className="w-1/4 mr-4">
          <AdminMenu />
        </div>
        <div className="flex-1">
          <h1>Update Products</h1>
          <div className="w-7 categorydropDown m-2">
            <Select
              placeholder="Select Categories"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleButtonClick}
                style={{ cursor: "pointer" }}
              >
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  id="p_photo"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </button>
            </div>
            <div className="width: max-content mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product-photo"
                    className="h-auto max-w-full"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`http://localhost:8000/ecomm/api/v1/auth/productPhoto/${id}`}
                    alt="product-photo"
                    className="h-auto max-w-full"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Write a Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={description}
                placeholder="Write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="Product Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="Write Quantity"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Select
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="form-select"
                onChange={(value) => setShipping(value)}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleUpdate}
              >
                Update Product
              </button>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-red-500 to-red-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
