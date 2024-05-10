import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import { Link } from "react-router-dom";
import {Pagination } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);//Set Page Display Size

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedProducts = products.slice(startIndex, endIndex);

  //getAll Products
  const getAllProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/ecomm/api/v1/auth/getProduct"
      );
      if (res.data.success) {
        setProducts(res.data.Products);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //LifeCycle Method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="flex w-full">
        <div className="w-1/4 mr-4">
          <AdminMenu />
        </div>
          {/* <h1 className="text-center">All Products List</h1> */}
        <div className="flex flex-wrap justify-center items-center w-screen">
          {displayedProducts.map((product) => (
            <Link to={`/dashboard/admin/product/${product.name}`} key={product._id}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow ml-8">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={`http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`}
                  alt={product.name}
                  style={{ height: '300px', width: '350px' }}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900">
                   {product.name}
                  </h5>
                </a>
                <p className=" mb-3 font-normal text-gray-700">
                  {product.description}
                </p>
              </div>
            </div>
            </Link>
          ))}
          {/* Pagination */}
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
  );
};

export default Products;
