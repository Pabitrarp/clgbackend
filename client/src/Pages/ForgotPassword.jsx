import React from 'react'
import Layout from "../Components/Layouts/Layout";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';



const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email,setemail]=useState("");
    const [otp,setOtp]=useState();
    const [enterOtp,setEnterOtp]=useState();
    const [verifyOtp,setVerfiyOtp] = useState(true);
    

    const verifyOtpValidation = () =>{
        if(otp == enterOtp)
        {
            setVerfiyOtp(true);
            navigate(`/resetPassword/${email}`)
        }
        else{
            setVerfiyOtp(false);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/ecomm/api/v1/auth/forgotPassword",{email:email});
            console.log(res);
            setOtp(res.data.otp)
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
        }
    }
  return (
    <>
            <Layout>
        <div className="centre flex items-center justify-center h-screen ">
          <div className="sm:p-6 md:p-8 dark:bg-gray-800 border-gray-700 w-1/3 p-4 bg-white border rounded-lg shadow h-4/6">
            <form className="space-y-6 w-full "  onSubmit={handleSubmit}>
              <h5 className=" text-2xl font-bold text-white text-center">
               Forgot Password
              </h5>
              <div className='p-2' >
                <label
                  htmlFor="email"
                  className="dark:text-white block text-medium font-medium text-gray-900 mt-4"
                 
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:placeholder-gray-400 dark:text-white mt-4"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                />
                {
                  otp &&(<input
                    type="number"
                    name="otp"
                    id="otp"
                    placeholder="Enter Otp..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:placeholder-gray-400 dark:text-white mt-4"
                    value={enterOtp}
                    onChange={(e) => setEnterOtp(e.target.value)}
                    required
                    
                  />)}
                  {otp ? verifyOtp ? "":(<p className='text-medium text-red-600 font-bold'>Otp Did Not Match</p>):""}
                
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 mb-6"
              >
                {
                  otp ? `Resend the OTP` : `Send Otp To The Mail`
                }
              </button>
              {
                  otp ? (<button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
                  onClick={verifyOtpValidation}
                >Submit</button>) : ""
                }

              <Link to="/log-in" className='text-blue-400  text-center '>Go Back To Main Menu</Link>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ForgotPassword
