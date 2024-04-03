import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

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
      toast.error("Something Went Wrong To Get Product", {
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById("p_photo").click();
  };

  //Create Product Function
  const handleCreate = async (e) =>{
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("category",category);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      const res = await axios.post("http://localhost:8000/ecomm/api/v1/auth/product",productData)
      if(res.data.success)
      {
        toast.success(res.data.message)
        navigate('/dashboard/admin/products')
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong")
    }
  }
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
            <h1>Create Products</h1>
            <div className="w-7 categorydropDown m-2">
              <Select
                placeholder="Select Categories"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <button type="button"className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={handleButtonClick} style={{ cursor: "pointer" }}>
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
              <div className="mb-3 width: max-content">
                {photo && (<div className="text-centre">
                  <img src={URL.createObjectURL(photo)} alt="product-photo" className="max-w-full h-auto" />
                </div>)}
              </div>
              <div className="mb-3">
                <input type="text" name="" id="" value={name} placeholder="Write a Name" className="" onChange={(e)=> setName(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="text" name="" id="" value={description} placeholder="Write a description" onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="number" name="" id="" value={price} placeholder="Product Price" onChange={(e) => setPrice(e.target.value)}/>
              </div>
              <div className="mb-3">
                <input type="number" name="" id="" value={quantity} placeholder="Write Quantity" onChange={(e) => setQuantity(e.target.value)}/>
              </div>
              <div className="mb-3">
                <Select placeholder="Select Shipping" size="large" showSearch className="" onChange={(value)=>setShipping(value)}>
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
              <button type="button" class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleCreate}>Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
