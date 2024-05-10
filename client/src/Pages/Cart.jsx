import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    calculateTotal();
    localStorage.setItem('cart',JSON.stringify(updatedCart))
  };
  
  const emptyCart = () => {
    setCart([])
  }

  const calculateTotal = () => {
    let total = 0;

    cart.forEach((product) => {
      total += product.price;
    });
  
    setTotalPrice(total);
  };

  useEffect(() =>{
    calculateTotal();
  },[cart])
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length > 0 ? (
        <div className="container  mx-auto my-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded shadow w-60">
                <img src={item.image} alt={item.name} className="mb-2" />
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-2">Price: Rs.{item.price}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-lg">Total: Rs.{totalPrice}</p>
            <button onClick={emptyCart} className="bg-red-500 text-white px-6 py-3 rounded">
                Empty Cart
              </button>
            {auth.token ? (
              <button onClick={() => navigate('/order')} className="bg-green-500 text-white px-6 py-3 rounded">
                Checkout
              </button>
            ) : (
              <button onClick={() => navigate('/log-in')} className="bg-blue-500 text-white px-6 py-3 rounded">
                Login to Checkout
              </button>
            )}
          </div>
        </div>
      ) : (<div className="h-svh flex justify-center items-center">
        <p className="text-3xl mb-32 font-bold">Your cart is empty Add Product.</p>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
