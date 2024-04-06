import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import createproduct from "../../assets/createproduct.png";

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
        <div className="flex max-w-full">
          {/* Left side for list of groups */}
          <div className="w-1/4 mr-4">
            <AdminMenu />
            {/* Add your group list component here */}
          </div>

          {/* Right side for content */}
        
        <div className="w-screen lg:w-3/4 xl:w-3/4  bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center bg-green-200 h-16 flex justify-center items-center ">Create Product</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xl:mt-16">
            <div className="flex justify-center items-center">
              <img src={createproduct} alt="Create Product" className="w-full" />
            </div>
            <div className="flex flex-col justify-center  items-center xl:w-3/4 ">
              <Select
                placeholder="Select Categories"
                size="large"
                showSearch
                className="w-full mb-4 "
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
              <input type="text" value={name} placeholder="Product Name" className="w-full mb-4 px-4 py-2 border rounded-lg" onChange={(e)=> setName(e.target.value)}/>
              <input type="text" value={description} placeholder="Description" className="w-full mb-4 px-4 py-2 border rounded-lg" onChange={(e) => setDescription(e.target.value)}/>
              <input
                      type="file"
                      name="photo"
                      className="w-full mb-4 px-4 py-2 border rounded-lg"
                      accept="image/*"
                      required
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
              <input type="number" value={price} placeholder="Price" className="w-full mb-4 px-4 py-2 border rounded-lg" onChange={(e) => setPrice(e.target.value)}/>
              <input type="number" value={quantity} placeholder="Quantity" className="w-full mb-4 px-4 py-2 border rounded-lg" onChange={(e) => setQuantity(e.target.value)}/>
              <Select placeholder="Select Shipping" size="large" showSearch className="w-full mb-4" onChange={(value)=>setShipping(value)}>
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
              <button type="button" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-white font-medium rounded-lg py-2" onClick={handleCreate}>Create Product</button>
            </div>
          </div>
        </div>
      </div>
    
      </Layout>
    </>
  );
};

export default CreateProduct;
