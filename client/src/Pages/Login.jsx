import React, { useState } from "react";
import { useNavigate,useLocation, Link } from "react-router-dom";
import Layout from "../Components/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth.jsx";

const Login = () => {
  // State variables to hold the radio button values
  const [userType, setUserType] = useState("admin"); // Default to admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const{auth,setAuth} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle radio button changes
  const handleRadioChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/ecomm/api/v1/auth/signin",
        {
          email: email,
          password: password,
          userType: userType
        }
      );
      if (res.data.sucess) {
        toast.success(res.data.message, {
          duration: 3000,
        });
        setAuth({
          ...auth,
          user: res.data.user,
          token:res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data));
        // Delay navigation slightly
        setTimeout(() => {
          navigate(location.state || "/");
        }, 1000);
      }
      else{
        toast.error(res.data.message,{
          duration: 3000
        })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        duration: 3000,
      });
    }
  };
  return (
    <>
      <Layout>
        <div className="centre flex items-center justify-center h-screen">
          <div className="sm:p-6 md:p-8 bg-gray-800 border-gray-700 w-full max-w-sm p-4  border rounded-lg shadow">
            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
              <h5 className="text-white text-xl font-medium">
                Sign in to our platform
              </h5>
              <div>
                <label
                  htmlFor="email"
                  className="text-white block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-white block mb-2 text-sm font-medium"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 dark:placeholder-gray-400 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border  rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className=" text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <Link to="/forgotPassword" className="text-sm font-medium text-primary-600 hover:underline text-blue-600">Forgot password?</Link>
                  </div>
              {/* Radio buttons for user type */}
              <div className="flex items-start justify-between mt-2">
                <div className="adminRadioButton">
                  <input
                    id="admin"
                    type="radio"
                    name="userType"
                    value="admin"
                    className=" focus:ring-3  bg-gray-700 dark:border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 w-4 h-4 border border-gray-300 rounded"
                    onChange={handleRadioChange}
                    checked={userType === "admin"}
                  />
                  <label
                    htmlFor="admin"
                    className="text-gray-300 ml-2 text-sm font-medium"
                  >
                    Admin
                  </label>
                </div>
                <div className="customerRadioButton">
                  <input
                    id="customer"
                    type="radio"
                    name="userType"
                    value="customer"
                    className="focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 w-4 h-4 border rounded"
                    onChange={handleRadioChange}
                    checked={userType === "customer"}
                  />
                  <label
                    htmlFor="customer"
                    className="text-gray-300 ml-2 text-sm font-medium"
                  >
                    Customer
                  </label>
                </div>
              </div>
              {/* End of radio buttons */}
              <button
                type="submit"
                className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Login to your account
              </button>
              <div className="text-gray-300 text-sm font-medium">
                Not registered?{" "}
                <Link
                  to="/sign-up"
                  className="hover:underline text-blue-500"
                >
                  Create account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
