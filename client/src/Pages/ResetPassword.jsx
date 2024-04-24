import React, { useState } from 'react';
import Layout from '../Components/Layouts/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [err, setErr] = useState(false);
    const  params  = useParams(); 

    
    const resetPassword = async (e) => {
        try {
            e.preventDefault();
            if(password == cpassword)
            {
                setErr(false);
                const res = await axios.put(`http://localhost:8000/ecomm/api/v1/auth/resetPassword/${params.email}`,{password});
                if (res.data.success) {
                    toast.success(res.data.message);
                    navigate("/log-in")
                } else {
                    toast.error(res.data.message);
                }
            }
            else{
                setErr(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Layout>
                <div className="centre flex items-center justify-center h-screen ">
                    <div className="sm:p-6 md:p-8 dark:bg-gray-800 border-gray-700 w-1/3 p-4 bg-white border rounded-lg shadow h-4/6">
                        <form className="space-y-6 w-full " onSubmit={resetPassword}>
                            <h5 className=" text-2xl font-bold text-white text-center">
                                Reset Password
                            </h5>
                            <div className='p-2' >
                                <label
                                    htmlFor="password"
                                    className="dark:text-white block text-medium font-medium text-gray-900 mt-4"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:placeholder-gray-400 dark:text-white mt-4"
                                    placeholder="enter new password"
                                    value={password}
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                       
                                    }}
                                />
                                <label
                                    htmlFor="password"
                                    className="dark:text-white block text-medium font-medium text-gray-900 mt-4"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500  dark:placeholder-gray-400 dark:text-white mt-4"
                                    placeholder="confirm password"
                                    value={cpassword}
                                    required
                                    onChange={(e) => {
                                        setCPassword(e.target.value);
                                    }}
                                />
                                {err ? (<p className='text-xl font-bold text-red-500'>Password Did Not Match</p>) : ""}
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-9"
                                >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default ResetPassword;
