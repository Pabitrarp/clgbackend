import React, { useState } from "react";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import Layout from "../../Components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";

const AdminDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "T-shirt",
      category: "Clothing",
      price: "$20",
      color: "red",
    },
    {
      id: 2,
      name: "Laptop",
      category: "Electronics",
      price: "$800",
      color: "yellow",
    },
    { id: 3, name: "Book", category: "Books", price: "$15", color: "violet" },
    { id: 4, name: "Shoes", category: "Footwear", price: "$50", color: "pink" },
    {
      id: 5,
      name: "Headphones",
      category: "Electronics",
      price: "$50",
      color: "blue",
    },
    {
      id: 6,
      name: "Watch",
      category: "Accessories",
      price: "$100",
      color: "dark blue",
    },
    { id: 7, name: "Backpack", category: "Bags", price: "$35", color: "alpha" },
    {
      id: 8,
      name: "Sunglasses",
      category: "Accessories",
      price: "$25",
      color: "beta",
    },
    {
      id: 9,
      name: "Smartphone",
      category: "Electronics",
      price: "$600",
      color: "gama",
    },
    { id: 10, name: "Jeans", category: "Clothing", price: "$45", color: 22 },
    {
      id: 11,
      name: "Gaming Console",
      category: "Electronics",
      price: "$400",
      color: "light pink",
    },
    {
      id: 12,
      name: "Desk Lamp",
      category: "Home Decor",
      price: "$30",
      color: "orange",
    },
    {
      id: 13,
      name: "Running Shoes",
      category: "Footwear",
      price: "$80",
      color: "green",
    },
    {
      id: 14,
      name: "Mouse",
      category: "Electronics",
      price: "$20",
      color: "dark green",
    },
    {
      id: 15,
      name: "Keyboard",
      category: "Electronics",
      price: "$50",
      color: "dark light",
    },
    {
      id: 16,
      name: "Dress",
      category: "Clothing",
      price: "$60",
      color: "white",
    },
    {
      id: 17,
      name: "Watch",
      category: "Accessories",
      price: "$150",
      color: "smoke",
    },
    {
      id: 18,
      name: "Camera",
      category: "Electronics",
      price: "$700",
      color: "fog",
    },
    {
      id: 19,
      name: "Cookware Set",
      category: "Kitchen",
      price: "$100",
      color: "meruine",
    },
    {
      id: 20,
      name: "Fitness Tracker",
      category: "Fitness",
      price: "$80",
      color: "brown",
    },
  ]);

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
                        className="dark:bg-gray-800 h-30 flex items-center justify-center w-48 p-6 bg-white rounded-full shadow-xs"
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
                          <p className="dark:text-gray-200 text-lg font-semibold text-gray-700">
                            0
                          </p>
                        </div>
                      </div>
                      {/* Card */}
                      <div
                        className="dark:bg-gray-800 h-30 flex items-center w-48 p-6 bg-white rounded-full shadow-xs"
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
                          <p className="dark:text-gray-200 text-lg font-semibold text-gray-700">
                            0
                          </p>
                        </div>
                      </div>
                      {/* Card */}
                      <div
                        className="dark:bg-gray-800 h-30 flex items-center w-48 p-4 p-6 bg-white rounded-full shadow-xs"
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
                          <p className="dark:text-gray-200 text-lg font-semibold text-gray-700">
                            0
                          </p>
                        </div>
                      </div>
                      {/* Card */}
                      <div
                        className="dark:bg-gray-800 h-30 flex items-center w-48 p-4 p-6 bg-white rounded-full shadow-xs"
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
                          <p className="dark:text-gray-200 text-lg font-semibold text-gray-700">
                            0
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
                <thead class="text-xs  text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" style={{position:"sticky",top:0}}>
                  <tr>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      USER
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Product name
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Color
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 text-white text-2xl">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700 border-b"
                    >
                      <td className="px-6 py-4 text-white text-base">{product.id}</td>
                      <td className="px-6 py-4  text-white text-base">{product.name}</td>
                      <td className="px-6 py-4  text-white text-base">{product.color}</td>
                      <td className="px-6 py-4  text-white text-base">{product.category}</td>
                      <td className="px-6 py-4  text-white text-base">{product.price}</td>
                      <td className="px-6 py-4  text-white text-base">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                        >
                          VIEW
                        </a>
                        <a
                          href="#" 
                          className="font-medium text-red-600 hover:text-red-800  hover:underline"
                        >
                          CANCEL
                        </a>
                      </td>
                    </tr>
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
