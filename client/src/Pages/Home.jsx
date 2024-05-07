import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import Carousal from "../Components/UI/Carousal";
import Card from "../Components/UI/Card";
import { Checkbox, Radio, Pagination } from "antd";
import axios from "axios";
import { Prices } from "../Components/Prices";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);//forr filtered Products
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);//Set Page Display Size

  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, []);

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

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/ecomm/api/v1/auth/getProduct");
      setProducts(res.data.Products);
      setFilteredProducts(res.data.Products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const handleRadioChange = (e) => {
    setRadio(e.target.value);
  };

  useEffect(() => {
    filteredProduct();
  }, [checked, radio]);

  const filteredProduct = async () => {
    try {
      const res = await axios.post("http://localhost:8000/ecomm/api/v1/auth/product-filter", { checked, radio });
      // setProducts(res.data?.products);
      setFilteredProducts(res.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // const displayedProducts = products.slice(startIndex, endIndex);
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <Layout title={"All Products - Best offers "}>
        <Carousal />
        <div className="mx-auto mt-3 lg:flex">
          <div className="md:w-1/5 mt-12 border-2 border-indigo-500 rounded-3xl ml-2 mb-4 h-full
          ">
            <h4 className="text-center mt-5 font-bold mb-4 text-decoration-line: underline">Filter By Category</h4>
            <div className="flex flex-col ">
            {categories?.map( (c) => (
              <Checkbox style={{ margin: "0.5rem 0" }} key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>{c.name}</Checkbox>
            ))}
            </div>
            <h4 className="text-center mt-4 font-bold text-decoration-line: underline">Filter By Price</h4>
            <div className="flex flex-col">
            <Radio.Group  onChange={handleRadioChange}>
              {Prices?.map(p => (
                <div className="" key={p._id}>
                    <Radio style={{ margin: "0.5rem 0" }} value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            </div>
            <div className="flex flex-col">
            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-indigo focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mt-6 ml-2">Reset Filter</button>
            </div>
          </div>
          <div className="md:w-5/6 flex flex-col text-center">
            <h1 className=" font-bold">All Products</h1>
            <div className="flex flex-wrap">
              {displayedProducts.map((product) => (
                <Card
                  key={product._id}
                  id={product._id}
                  image={product._id ? `http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}` : ""}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          <Pagination
            className="m-auto mb-8"
            showSizeChanger
            onShowSizeChange={setPageSize}
            onChange={onPageChange}
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={products.length}
          />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
