import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

useEffect( () => {
let existingCardItems = localStorage.getItem('cart')
if(existingCardItems)
{
  setCart(JSON.parse(existingCardItems))
}
},[])
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};


//custom Hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
