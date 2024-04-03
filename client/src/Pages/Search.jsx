import React from 'react';
import Layout from '../Components/Layouts/Layout';
import { useSearch } from '../context/search';
import Card from '../Components/UI/Card';

const Search = () => {
    const { values } = useSearch();

    return (
        <Layout title={"Search Result"}>
            <div className="main">
                <div className='text-center'>
                    <h1>Search Result</h1>
                    <h6>{values && values.results.length > 0 ? `Found ${values.results.length}` : "No Product Found"}</h6>
                </div>
                <div className="md:w-5/6 flex flex-col text-center">
                    <h1 className="font-bold">All Searched Products</h1>
                    <div className="flex flex-wrap">
                        {values?.results.map((product) => (
                            <Card
                                key={product._id}
                                image={product._id
                                    ? `http://localhost:8000/ecomm/api/v1/auth/productPhoto/${product._id}`
                                    : ""}
                                name={product.name}
                                price={product.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Search;
