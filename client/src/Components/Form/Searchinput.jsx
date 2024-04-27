import React from "react";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Searchinput = () => {
  const { values, setValues } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8000/ecomm/api/v1/auth/search/${values.keyword}`
      );
      if (response.data.success) {
        setValues({ ...values, results: response.data.result });
        navigate("/search");
      } else {
        console.log("Search API failed:", response.data.message);
        toast.error("No Product Found")
      }
    } catch (error) {
      console.log("Error in search API:", error);
    }
  };

  return (
    <div className=" flex items-center p-2 bg-gray-100 rounded-lg lg:w-96">
  <form className="flex" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Search..."
      className="focus:outline-none lg:w-80 bg-transparent border border-gray-300 rounded-l-md px-4 py-2"
      value={values.keyword}
      onChange={(e) => setValues({ ...values, keyword: e.target.value })}
    />
    <button type="submit" className="hover:text-gray-800 focus:outline-none bg-gray-200 hover:bg-gray-300 rounded-r-md px-4 py-2">
      <FaSearch />
    </button>
  </form>
</div>

  );
};

export default Searchinput;
