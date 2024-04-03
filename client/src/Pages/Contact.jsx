import React from "react";
import Layout from "../Components/Layouts/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="lg:flex lg:justify-center lg:items-center">
        {/* Image Section */}
        <div className="lg:w-1/2 lg:mr-10">
          <img
            className="w-full h-auto"
            src="https://img.freepik.com/free-vector/flat-customer-support-illustration_23-2148899114.jpg?size=626&ext=jpg&ga=GA1.1.1239440100.1710303915&semt=ais"
            alt="Contact Form"
          />
        </div>
        {/* Form Section */}
        <div className="lg:w-1/2">
          <form className="max-w-md mx-auto">
            {/* Input fields */}
            <div className="mb-5">
              <label
                htmlFor="floating_email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Email address
              </label>
              <input
                type="email"
                id="floating_email"
                name="floating_email"
                className="focus:outline-none focus:border-blue-600 dark:text-white dark:border-gray-600 block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Additional input fields */}
            <div className="grid grid-cols-2 gap-6">
              <div className="relative z-0 mb-5 group">
                <input
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="focus:outline-none focus:border-blue-600 dark:text-white dark:border-gray-600 block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0"
                >
                  First name
                </label>
              </div>
              <div className="relative z-0 mb-5 group">
                <input
                  type="text"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="focus:outline-none focus:border-blue-600 dark:text-white dark:border-gray-600 block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-0"
                >
                  Last name
                </label>
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="floating_phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-400"
              >
                Phone number
              </label>
              <input
                type="tel"
                name="floating_phone"
                id="floating_phone"
                className="focus:outline-none focus:border-blue-600 dark:text-white dark:border-gray-600 block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
