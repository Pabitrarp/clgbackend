import React from "react";
import Layout from "../Components/Layouts/Layout";
import Carousal from "../Components/UI/Carousal";
import Card from "../Components/UI/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import {Checkbox,Radio} from "antd"
import { Prices } from "../Components/Prices";
const Home = () => {
  const [ products, setProducts ] =useState([])
  const [ categories, setCategories ] =useState([])
  const [ checked, setChecked ] =useState([])
  const [ radio, setRadio ] =useState([]);


  //Get All Category
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/ecomm/api/v1/auth/allCategories"
      );
      if (res.data.sucess) {
        setCategories(res.data.categories);
      } else {
        console.log("Error in Getting Categories")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //get All Products
  const getAllProducts =  async () => {
    try {
      const res = await axios.get("http://localhost:8000/ecomm/api/v1/auth/getProduct")
      setProducts(res.data.Products)
    } catch (error) {
      console.log(error)
    }
  }

  
  //filter by Category
  const handleFilter = (value,id) => {
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c => c!== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]);
  

  useEffect( () =>{
    if(checked.length || radio.length)
    {
      filteredProduct();
    }
  },[checked,radio])

  //get Filtered Products
  const filteredProduct = async () => {
    try {
      const res = await axios.post(`http://localhost:8000/ecomm/api/v1/auth/product-filter`,{checked,radio})
      setProducts(res.data?.products)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Layout  title={"All Products - Best offers "}>
        <Carousal />
        <div className="mx-auto mt-3 lg:flex">
          <div className="md:w-1/5 mt-12 border-2 border-indigo-500 rounded-3xl ">
            <h4 className="text-center mt-5 font-bold mb-4 text-decoration-line: underline">Filter By Category</h4>
            <div className="flex flex-col ">
            {categories?.map( (c) => (
              <Checkbox style={{ margin: "0.5rem 0" }} key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>{c.name}</Checkbox>
            ))}
            </div>
            {/* Price Filter */}
            <h4 className="text-center mt-4 font-bold text-decoration-line: underline">Filter By Price</h4>
            <div className="flex flex-col">
            <Radio.Group  onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div className="" key={p._id}>
                    <Radio style={{ margin: "0.5rem 0" }} value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            </div>
            <div className="flex flex-col">
            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-indigo focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mt-6">Reset Filter</button>
            </div>
          </div>
          <div className="md:w-5/6 flex flex-col text-center">
            <h1 className=" font-bold">All Products</h1>
            <div className="flex flex-wrap">
              {
                products.map( (product) => (
                  <Card key={product._id} id={product._id} image={product._id
                    ? `http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`
                    : ""} name={product.name} price={product.price}/>
                ))
              }
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
