import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import  axios  from "axios"
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [users_count,setUsers_count] = useState(0);
  const [products_count,setProduts_count] = useState(0);
  const [category_count,setCategory_count] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [products, setProducts] = useState([]);

  //Pagination
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedProducts = products.slice(startIndex, endIndex);

  // orders status display
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:8000/ecomm/api/v1/auth/orders/${orderId}`, { status: newStatus });
      if (res.data.success) {
        toast.success("Order status updated successfully");
        // You can also update the local state if needed
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating order status");
    }
  };

//Count Users
const countUser = async () => {
  try {
    const res = await axios.get("http://localhost:8000/ecomm/api/v1/auth/countUsers");

    if(res.data.success)
    {
      setUsers_count(res.data.result)
    }
    else{
      setUsers(0);
    }
  } catch (error) {
    console.log(error)
  }
}
//Count Product
const countProduct = async () => {
  try {
    const res = await axios.get("http://localhost:8000/ecomm/api/v1/auth/countProduct");

    if(res.data.success)
    {
     setProduts_count(res.data.result)
    }
    else{
      setProduts_count(0);
    }
  } catch (error) {
    console.log(error)
  }
}

//Count Category
const countCategory = async () => {
  try {
    const res = await axios.get("http://localhost:8000/ecomm/api/v1/auth/countCategory");

    if(res.data.success)
    {
     setCategory_count(res.data.result)
    }
    else{
      setCategory_count(0);
    }
  } catch (error) {
    console.log(error)
  }
}
const orders = async () => {
  try {
    const res = await axios.get("http://localhost:8000/ecomm/api/v1/auth/allOrders");
    if (res.data.success) {
      setProducts(res.data.orders); 
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Error fetching orders");
  }
};
useEffect(() => {
countUser();
countProduct();
countCategory();
orders();
},[])
  return (
    <>
      <Layout>
        <div className="flex w-full">
          <div className=" w-1/4 mr-4">
            <AdminMenu className="h-full" />
            {/* Add your group list component here */}
          </div>
          {/* Left side for list of groups */}
          <div className="leftContent w-full grid  grid-rows-[100px,200px,400px]">
            <div className="heading p-4">
              <h1 className="text-3xl font-bold">
                WELCOME {auth?.user?.name} !
              </h1>
            </div>
            <div className="content">
              <div className="py-5">
                <main className="h-full overflow-y-auto">
                  <div className="container grid mx-auto">
                    {/* Cards */}
                    <div className="md:grid-cols-2 xl:grid-cols-4 grid  mb-8">
                      {/* Card */}
                      <div
                        className="bg-gray-800 h-30 flex items-center justify-center w-48 p-6  rounded-full shadow-xs"
                        onClick={() => navigate("/dashboard/admin/users")}
                      >
                        <div className="dark:text-orange-100 dark:bg-orange-500 right-4 relative p-3 mr-4 text-orange-500 bg-orange-100 rounded-full">
                          <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="mb-2 font-medium text-white">
                            All Users
                          </p>
                          <p className="text-gray-200 text-lg font-semibold">
                            {users_count -1}
                          </p>
                        </div>
                      </div>
                      {/* Card */}
                      <div
                        className="bg-gray-800 h-30 flex items-center w-48 p-6  rounded-full shadow-xs"
                        onClick={() => navigate("/dashboard/admin/products")}
                      >
                        <div className="dark:text-green-100 dark:bg-green-500 right-4 relative p-3 mr-4 text-green-500 bg-green-100 rounded-full">
                          <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <p className="mb-2 font-medium text-white">
                            Products
                          </p>
                          <p className="text-gray-200 text-lg font-semibold">
                            {products_count}
                          </p>
                        </div>
                      </div>
                      {/* Card */}
                      <div
                        className="bg-gray-800 h-30 flex items-center w-48 p-6 rounded-full shadow-xs"
                        onClick={() =>
                          navigate("/dashboard/admin/create-category")
                        }
                      >
                        <div className="dark:text-teal-100 dark:bg-teal-500 right-4 relative p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                          <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <p className="mb-2 font-medium text-white">
                            Catagory
                          </p>
                          <p className="text-gray-200 text-lg font-semibold">
                            {category_count}
                          </p>
                        </div>
                      </div>
                      {/* Card */}
                      <div
                        className="bg-gray-800 h-30 flex items-center w-48  p-6  rounded-full shadow-xs"
                        onClick={() => navigate("/dashboard/admin")}
                      >
                        <div className="dark:text-blue-100 dark:bg-blue-500 right-4 relative p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
                          <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="mb-2 font-medium text-white">Orders</p>
                          <p className="text-gray-200 text-lg font-semibold">
                            {products.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
                       {/* Table  */}
            <div class=" w-full overflow-x-auto shadow-md sm:rounded-lg " >
            <h1 className="text-2xl mb-4 font-bold fxied" >ORDERS</h1>
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs  text-white   bg-gray-700" style={{position:"sticky",top:0}}>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      User
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Mobile
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Address
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Product_name
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Quantity
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Payment_Status
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Payment_Type
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {displayedProducts.map((order) => (
    order.orderItems.map((orderItem) => (
      <tr key={orderItem._id} className=" odd:bg-gray-700  even:bg-gray-700 border-gray-700 border-b">
        <td className="px-6 py-4 text-white text-base">{order.user}</td>
        <td className="px-6 py-4 text-white text-base">{order.mobile}</td>
        <td className="px-6 py-4 text-white text-base">{order.city},{order.address},{order.landmark},{order.pinCode}</td>
        <td className="px-6 py-4 text-white text-base">{orderItem.productId ? orderItem.productId.name : 'N/A'}</td>
        <td className="px-6 py-4 text-white text-base">{orderItem.productId ? orderItem.productId.price : 'N/A'}</td>
        <td className="px-6 py-4 text-white text-base">{orderItem.quantity}</td>
        <td className="px-6 py-4 text-white text-base">{order.paymentType=="COD"?"Pending":"Done"}</td>
        <td className="px-6 py-4 text-white text-base">{order.paymentType}</td>
        {/* Add more product details as needed */}
        <td className="px-6 py-4 text-white text-base">
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="border rounded p-1 text-black"
          >
            <option className="text-indigo-500" value="PENDING">Pending</option>
            <option className="text-indigo-500" value="DELIVERED">Delivered</option>
          </select>
        </td>
      </tr>
    ))
  ))}

</tbody>

              </table>
            </div>

            {/* Pagination */}
            <Pagination
              className="m-auto"
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
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

export default AdminDashboard;