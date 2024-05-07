import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../Components/UI/Card";
import { useCart } from "../context/CartContext";
useCart

const Productdetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  const {cart,setCart} = useCart();

//Add to Cart Function
  const addToCart = () => {
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
      <div className="w-98 m-6">
        <div className="  rounded-lg shadow-lg lg:flex lg:w-100 lg:h-100%">
          <div className="flex  flex-1 flex-wrap flex-col lg:h-100% lg:border-4 bg-black-800 lg:w-100%">
            <img
              src={`http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`}
              alt={product.name}
              className="object-cover h-3/4"
            />
            <div className="w-full">
            <h2 className="p-6 text-2xl font-semibold">{product.name}</h2>
            <p className="p-6 mb-16">{product.description}ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp</p>
            <div className="p-6 flex justify-between">
              <span className="text-xl font-bold ">
                Rs.{product.price}
              </span>
              <button className="hover:bg-blue-600 focus:outline-none px-4 py-2 text-white bg-blue-500 rounded-md" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </div>
          </div>
          
        </div>
        <div>
          <h1 className="mt-6 text-xl font-semibold">Similar Products</h1>
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
