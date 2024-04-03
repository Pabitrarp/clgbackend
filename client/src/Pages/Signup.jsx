import React, { useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/ecomm/api/v1/auth/signup",
        {
          name: name,
          userid: userId,
          password: password,
          email: email
        }
      );
      console.log(response);
      if (response.data.sucess) {
        toast.success(response.data.message, {
          duration: 3000,
        });
        setTimeout(() => {
          navigate("/log-in");
        }, 1000);
      } else {
        toast.error(response.data.message, {
          duration: 3000,
        });
        navigate("/*");
      }
    } catch (error) {
      console.log("Axios Error", error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center my-8">
        {/* Form Section */}
        <div className="lg:w-1/2 w-full">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus:outline-none focus:border-blue-600 block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300"
                placeholder="Enter your Name"
                required
              />
            </div>
            {/* User ID */}
            <div className="mb-5">
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="focus:outline-none focus:border-blue-600 block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300"
                placeholder="Enter Unique User Id"
                required
              />
            </div>
            {/* Password */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:outline-none focus:border-blue-600 block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300"
                placeholder="Enter your password"
                required
              />
            </div>
            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:outline-none focus:border-blue-600 block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 w-full py-2 mt-4 text-sm font-medium text-white bg-blue-700 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
