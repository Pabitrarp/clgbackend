import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../Components/UI/Card";

const Productdetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);

  useEffect(() => {
    if (params?.name) {
      getProducts();
    }
  }, [params.name]);
  //get Products
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/ecomm/api/v1/auth/singleProduct/${params.name}`
      );
      if (res.data.success) {
        setProduct(res.data?.Product);
        getSimilarProduct(
          res.data?.Product._id,
          res.data?.Product.category._id
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get Similar Product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/ecomm/api/v1/auth/similar-product/${pid}/${cid}`
      );
      if (res.data.success) {
        setSimilarProduct(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="max-w-4xl py-6 mx-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-center">
            <img
              src={`http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`}
              alt={product.name}
              className="object-cover w-64 h-64"
            />
          </div>
          <div className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">{product.name}</h2>
            <p className="mb-4 text-gray-700">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-800">
                ${product.price}
              </span>
              <button className="hover:bg-blue-600 focus:outline-none px-4 py-2 text-white bg-blue-500 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1>Similar Products</h1>
          {similarProduct.length < 1 ? (
            <p>No Similar Product Found </p>
          ) : (
            similarProduct.map((product) => (
              <Card
                key={product._id}
                image={product._id
                  ? `http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`
                  : ""}
                name={product.name}
                price={product.price}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Productdetails;
