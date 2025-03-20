import React, { useState, useEffect } from "react";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useCart } from "../context/CartContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
const Order = () => {
  const { auth } = useAuth();
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const params = useParams();

  // const [email,setEmail] = useState("");
  const [paid, setPaid] = useState(params.ref);
  const [data, childData] = useState("Pay Now");
  
  const [mobile, setMobile] = useState();
  const [pincode, setPincode] = useState();
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [selectedHouseType, setSelectedValue] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [addExpand, setAddExpand] = useState(false);
  const [productExpand, setProductExpand] = useState(true);
  const [paymentExpand, setPaymentExpand] = useState(false);

  
  const togglePoduct = () => {
    setProductExpand(!productExpand);
    // if(productExpand==true)
    setAddExpand(false);
    setPaymentExpand(productExpand);
  };

  const togglePayment = () => {
    setPaymentExpand(!paymentExpand);
    setProductExpand(paymentExpand);
    setAddExpand(paymentExpand);
  };

  const toggleAddressbar = () => {
    setAddExpand(!addExpand);
    setProductExpand(addExpand);
    setPaymentExpand(addExpand);
  };
  // radio
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(email,mobile,pincode,adress,city,landmark,selectedHouseType);
  };

  //remove from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    calculateTotal();
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //calculate Price
  const calculateTotal = () => {
    let total = 0;

    cart.forEach((product) => {
      total += product.price * product.quantity;
    });

    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const orderProduct = async (req, res) => {
    try {
      const paymentType =paid?"COMPLETED":"COD";
      console.log(paymentType);
      const orderItems = []; 
      cart.forEach((product) => {
        orderItems.push({
          productId: product.id,
          quantity: product.quantity,
        });
      });

      const res = await axios.post(
        "http://localhost:8000/ecomm/api/v1/auth/createOrder",
        {
          user: auth.user.email,
          mobile: mobile,
          orderItems: orderItems,
          orderPrice: totalPrice,
          pinCode: pincode,
          city: city,
          address: adress,
          landmark: landmark,
          houseType: selectedHouseType,
          paymentType: paymentType
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        //Order Confirmation mail
        orderConfirmation(totalPrice, mobile, adress, city, landmark);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while placing the order.");
    }
  };

  const orderConfirmation = async (
    totalPrice,
    mobile,
    adress,
    city,
    landmark
  ) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/ecomm/api/v1/auth/orderConfirmation/${auth.user.email}`,
        { totalPrice, mobile, adress, city, landmark }
      );
      if (res.data.success) {
        toast.success("Order Confirmation Send To Your Email");
      }
    } catch (error) {
      console.log("Somrthing Went While Sending Order Confirmation");
    }
  };

  const checkout = async () => {
  try {
    const {data: { key },} = await axios.get("http://localhost:8000/ecomm/api/v1/auth/getKey");

    const {
      data: { order },
    } = await axios.post("http://localhost:8000/ecomm/api/v1/auth/payment-checkout", {
      totalPrice: totalPrice, // Ensure this is defined
    });

    const options = {
      key,
      amount: order.amount,
      name: "MED PLUS",
      order_id: order.id,
      callback_url: "http://localhost:8000/ecomm/api/v1/auth/paymentVerification", // Ensure correct endpoint
      prefill: {
        email: auth?.user?.email || "", // Avoid errors if auth.user is undefined
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // Ensure Razorpay script is loaded
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded. Please check your script.");
      return;
    }

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (error) {
    console.error("Checkout error:", error);
  }
};

  const fetchAdress=async(req,res)=>{
    try{
      const res=await axios.post("http://localhost:8000/ecomm/api/v1/auth/orders/address",{ user: auth.user.email})
      if(res.data.success){
        const {pinCode,city,address,landmark,houseType,mobile}=res.data;
        setLandmark(landmark);
        setMobile(mobile);
        setCity(city);
        setAdress(address);
        setSelectedValue(houseType);
        setPincode(pinCode);
      }
    }catch(err){
       console.log(err)

    }
  }

  useEffect(() => {
    fetchAdress();
  },[])
  return (
    <>
      <Layout>
        <div className="flex justify-center w-full h-screen p-12 text-center bg-gray-100">
          <div className="flex flex-col w-2/3 mx-2 overflow-y-auto">
            <div className=" bg-white-300 p-4 mb-2 bg-white">
              <div className="flex justify-between">
                 {adress.length > 0 ? (
                <div className="flex flex-col">
                  <div className="flex mt-2">
                    Delivery to:
                    <span className="mx-1 bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-300 dark:text-gray-700">
                      {selectedHouseType}
                    </span>{" "}
                    <span className="font-bold">{auth?.user.email}, </span>{" "}
                    <span className="ml-4">{mobile}</span>
                  </div>
                  <div className="flex mt-2">
                    <p className="font-light">
                      {landmark} ,{city} ,{pincode}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-lg font-bold text-red-600">
                  No address provided
                </p>
              )}

                <div>
                  <button
                    className="px-3 py-2 text-white bg-black"
                    onClick={toggleAddressbar}
                  >
                    +ADD
                  </button>
                </div>
              </div>
              {addExpand && (
                <>
                  <hr />
                  <div
                    className={`bg-white-300 bg-white mb-1 p-4 transition-all duration-500 ${
                      addExpand ? "max-h-screen" : "max-h-0 overflow-hidden"
                    }`}
                  >
                    {/* Form Detail PArt */}

                    <form className="p-6 mx-4 my-2" onSubmit={handleSubmit}>
                      <div className="flex flex-col px-6 mb-2">
                        <h2 className="text-md text-start mt-4 mb-2 font-semibold text-black">
                          Add New Address
                        </h2>
                        <div className="flex">
                          <input
                            type="email"
                            name="email"
                            value={auth?.user.email}
                            placeholder="Email"
                            className="w-1/2 px-4 py-2 mr-2 border border-gray-400"
                            disabled
                          />
                          <input
                            type="text"
                            name="mobile"
                            value={mobile}
                            placeholder="Mobile"
                            className="w-1/2 px-4 py-2 mr-2 border border-gray-400"
                            onChange={(e) => setMobile(e.target.value)}
                            required={true}
                          />
                        </div>
                        <div className="flex mt-3">
                          <input
                            type="text"
                            name="pincode"
                            value={pincode}
                            placeholder="Pincode"
                            className="w-1/2 px-4 py-2 mr-2 border border-gray-400"
                            onChange={(e) => setPincode(e.target.value)}
                          />
                          <input
                            type="text"
                            name="city"
                            value={city}
                            placeholder="City"
                            className="w-1/2 px-4 py-2 mr-2 border border-gray-400"
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                        <div className="flex h-32 mt-3">
                          <input
                            type="text"
                            name="address"
                            value={adress}
                            placeholder="Address"
                            className="w-full px-2 py-2 mr-2 border border-gray-400"
                            onChange={(e) => setAdress(e.target.value)}
                          />
                        </div>
                        <div className="flex mt-3">
                          <input
                            type="text"
                            name="landmark"
                            value={landmark}
                            placeholder="Landmark"
                            className="w-1/2 px-4 py-2 mr-2 border border-gray-400"
                            onChange={(e) => setLandmark(e.target.value)}
                          />
                          <input
                            type="text"
                            name="alternatePhone"
                            placeholder="Alternate Phone"
                            className="w-1/2 px-4 py-2 mr-2 border border-gray-400"
                          />
                        </div>
                        <div className="flex mt-2">
                          <input
                            type="radio"
                            id="home"
                            name="houseType"
                            value="Home"
                            checked={selectedHouseType === "Home"}
                            onChange={handleRadioChange}
                          />
                          <label htmlFor="home" className="mr-2">
                            Home
                          </label>
                          <input
                            type="radio"
                            id="office"
                            name="houseType"
                            value="Office"
                            checked={selectedHouseType === "Office"}
                            onChange={handleRadioChange}
                          />
                          <label htmlFor="office" className="ml-2 mr-2">
                            Office
                          </label>
                        </div>
                        <div className="flex mt-3">
                          <button
                            type="submit"
                            className="px-4 py-2 text-white bg-black"
                            onClick={toggleAddressbar}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white-300 mb-2 bg-white">
              {productExpand ? (
                <div>
                  {cart.map((product, key) => (
                    <div key={key} className="flex p-4 border-b">
                      <div className="flex flex-col w-0.5/4 ml-8  justify-center items-center p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-28 h-28 mb-4"
                        />
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-8 h-8 border border-gray-400 rounded-full">
                            <button
                              className="text-gray-600"
                              onClick={() => {
                                if (product.quantity <= 1) {
                                  return;
                                } else {
                                  product.quantity = product.quantity - 1;
                                  calculateTotal();
                                  navigate("/order");
                                }
                              }}
                            >
                              -
                            </button>
                          </div>
                          <span className="mx-2">{product.quantity}</span>
                          <div className="flex items-center justify-center w-8 h-8 border border-gray-400 rounded-full">
                            <button
                              className="text-gray-600"
                              onClick={() => {
                                product.quantity = product.quantity + 1;
                                navigate("/order");
                                calculateTotal();
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-start flex flex-col justify-start w-2/4 pt-4">
                        <h1 className="m-2 text-lg font-normal">
                          {product.name}
                        </h1>
                        <h1 className="m-2 text-lg font-semibold">
                          <span className="mr-3 text-sm line-through">
                            Rs.400
                          </span>
                          Rs.{product.price}
                        </h1>
                        <div>
                          <button
                            className="text-end text-md hover:text-red-600 inline-block w-auto m-2 font-semibold"
                            onClick={() => removeFromCart(product.id)}
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                      <div className="ustify-start text-start flex flex-col w-1/4 pt-4">
                        <h1 className=" text-md font-light">
                          Delivery by SSP
                          <span className="ml-2 font-semibold">
                            Mon 15 April{" "}
                          </span>
                        </h1>
                      </div>
                    </div>
                  ))}

                  {/* <div>
                    <button
                      className="justify-end px-6 py-3 m-4 text-lg text-white bg-black"
                      onClick={togglePoduct}
                    >
                      Place Order
                    </button>
                  </div> */}
                </div>
              ) : (
                <div className="flex items-center justify-between p-2">
                  <div className="flex flex-col">
                    <div className="flex px-2 mx-2">
                      <h1 className="text-lg font-bold">Order Summary</h1>
                    </div>

                    <div className="flex px-2 mx-2">
                      <h2 className="text-md mr-3 font-semibold">
                        {totalPrice}
                      </h2>
                      <p className="font-medium text-black">{` ${cart.length} Items`}</p>
                    </div>
                  </div>

                  <div>
                    <button
                      className="px-3 py-2 text-white bg-black"
                      onClick={togglePoduct}
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white-300 mb-2 bg-white">
              {paymentExpand ? (
                <div>
                  <div className="p-3 text-lg font-medium text-white bg-black">
                    Choose Payment Option
                  </div>
                  <div className="flex flex-col p-4 m-4">
                    <div className="flex justify-between p-3 text-lg font-semibold">
                      <div className="flex">
                      
                        {paid? "Payment Successfully":(<div> <input
                          type="radio"
                          name="payment-Option"
                          className="mx-2"
                          onClick={checkout}
                        />Pay Now</div>)}
                      </div>
                    </div>
                   {paid? "":( <div className="flex justify-between p-3 text-lg font-semibold">
                      <div className="flex">
                        <input
                          type="radio"
                          name="payment-Option"
                          className="mx-2"
                        />{" "}
                        Cash on Delivery
                      </div>
                    </div>)}
                    <hr />
                   
                    <hr />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2">
                  <div className="flex flex-col">
                    <div className="flex px-2 mx-2">
                      <h1 className="text-lg font-bold">Order Summary</h1>
                    </div>

                    <div className="flex px-2 mx-2">
                      <p>Choose a payment method</p>
                    </div>
                  </div>

                  <div>
                    <button
                      className="px-3 py-2 text-white bg-black"
                      onClick={togglePayment}
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className=" w-1/3 h-[55%] bg-white mb-1 px-8">
            <h1 className="text-start p-2 ml-2 text-lg font-bold text-indigo-700">
              PRICE DETAILS
            </h1>
            <hr />
            <div className="p-4">
              <table className="w-full">
                <tr className="text-md flex justify-between m-3">
                  <td>Price</td>
                  <td>{`Rs.${totalPrice}`}</td>
                </tr>

                {/* <tr className="text-md flex justify-between m-3">
                <td>Discount</td>
                <td>Rs.4000.00</td>
              </tr> */}

                <tr className="text-md flex justify-between m-3">
                  <td>Delivery Charges</td>
                  <td>
                    <span className="font-bold text-black">Free</span>
                  </td>
                </tr>
                <tr className="text-md flex justify-between m-3">
                  <td>Price</td>
                  <td>{`Rs.${totalPrice}`}</td>
                </tr>
                <hr />
                <tr className="flex justify-between p-1 mx-3 my-4 text-lg font-semibold text-white bg-black">
                  <td>Total Price</td>
                  <td>{`Rs.${totalPrice}`}</td>
                </tr>
                <hr />
              </table>
              <button
                className="p-1 mx-4 text-sm font-normal text-white bg-black"
                onClick={orderProduct}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Order;
