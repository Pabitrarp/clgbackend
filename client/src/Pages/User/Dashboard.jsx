import React, { useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/ecomm/api/v1/auth/orderDetail/${auth.user.email}`
      );
      if (res.data && res.data.success) {
        setOrders(res.data.order);
        // const result = Array.isArray(orders);
        // console.log(result)
        toast.success(res.data.message);
      } else if (res.data) {
        toast.error(res.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong");
    }
  };
  useEffect(() => {
    if (auth?.token) {
      getOrder();
    }
  }, []);
  return (
    <>
      <Layout>
        <div className="main ">
          <h1 className="flex items-center justify-center h-16 mt-2 mb-2 text-3xl font-bold text-white bg-gray-900">
            My Orders
          </h1>
        </div>

        <div className="relative p-6 overflow-x-auto">
          <table className="rtl:text-right dark:text-gray-900 w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-50 dark:bg-gray-900 dark:text-gray-200 text-xs text-gray-700 uppercase">
              <tr className="text-xl font-bold">
                <th scope="col" className="px-6 py-3 text-center">
                  Product image
                </th>
                <th scope="col" className=" px-6 py-3 text-center">
                  Product Name
                </th>
                <th scope="col" className=" px-6 py-3 text-center">
                  Product Quantity
                </th>
                <th scope="col" className=" px-6 py-3 text-center">
                  Product Price
                </th>
                <th scope="col" className=" px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map(
                  (order) =>
                    order.orderItems &&
                    order.orderItems.map((item) => (
                      <tr
                        key={item.productId._id}
                        className="text-xl font-bold"
                      >
                        <td className="flex justify-center items-center px-6 py-3 text-center border-2">
                          <img
                            className="  rounded-xl w-30 h-28 my-4"
                            src={`http://localhost:8000/ecomm/api/v1/auth/productPhoto/${item.productId._id}`}
                          ></img>
                        </td>
                        <td className=" px-6 py-3 text-center border-2">
                          {item.productId.name}
                        </td>
                        <td className=" px-6 py-3 text-center border-2">
                          {item.quantity}
                        </td>
                        <td className=" px-6 py-3 text-center border-2">
                          {item.productId.price}
                        </td>
                        <td className=" px-6 py-3 text-center border-2">
                          Cancel
                        </td>
                      </tr>
                    ))
                )}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};
export default Dashboard;
