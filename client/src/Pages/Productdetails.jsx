import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../Components/UI/Card";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Productdetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  const {cart,setCart} = useCart();

//Add to Cart Function
  const addToCart = () => {
    const image = `http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`;
    const name = product.name;
    const price = product.price;
    const id = product._id;
    const newItem = { image, name, price ,id ,quantity:1}; // Create a new item object
    setCart([...cart, newItem]); // Add the new item to the cart
    localStorage.setItem('cart',JSON.stringify([...cart,newItem]))
    toast.success(`${name} added to Cart`)
  };

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
      <div className="w-full max-w-screen-lg mx-auto p-6">
        <div className="rounded-lg shadow-lg lg:flex">
          <div className="lg:w-1/2 bg-gray-100">
            <img
              src={`http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`}
              alt={product.name}
              className="object-cover h-64 lg:h-full w-full"
            />
          </div>
          <div className="p-6 flex flex-col  lg:w-1/2">
           
            <h2 className="text-2xl font-semibold">Name: {product.name}</h2>
           
            <p className="">Description: {product.description}</p>
            <div className="flex-grow"></div>
            <div className="flex items-center justify-between ">
            
              <span className="text-xl font-bold ">Rs.{product.price}</span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-xl font-semibold mb-4">Similar Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarProduct.length < 1 ? (
              <p>No Similar Product Found</p>
            ) : (
              similarProduct.map((product) => (
                <Card
                  key={product._id}
                  image={
                    product._id
                      ? `http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`
                      : ""
                  }
                  name={product.name}
                  price={product.price}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Productdetails;
