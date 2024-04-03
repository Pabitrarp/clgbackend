import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

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
      <div className="md:grid-cols-3 grid grid-cols-1">
        <div className="md:col-span-3 col-span-1">
          <AdminMenu />
        </div>
        <div className="md:col-span-2 col-span-1">
          <h1 className="text-center">All Products List</h1>
          {products.map((product) => (
            <Link to={`/dashboard/admin/product/${product.name}`} key={product._id}>
            <div className="dark:bg-gray-800 dark:border-gray-700 max-w-sm bg-white border border-gray-200 rounded-lg shadow">
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={`http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`}
                  alt={product.name}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="dark:text-white mb-2 text-2xl font-bold tracking-tight text-gray-900">
                   {product.name}
                  </h5>
                </a>
                <p className="dark:text-gray-400 mb-3 font-normal text-gray-700">
                  {product.description}
                </p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
