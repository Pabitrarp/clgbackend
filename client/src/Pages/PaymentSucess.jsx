import React from 'react'
import Layout from "../Components/Layouts/Layout";
import { useNavigate, useSearchParams } from 'react-router-dom'

const PaymentSucess = ({sendDataParent}) => {
  const navigate = useNavigate();
  const [s, sets] = useSearchParams()
  const ref = s.get("reference");
   
  return (
   <Layout>
      <div className='flex justify-center h-svh  items-center'>
        <div className=' flex mb-32 text-3xl items-center justify-center font-bold border-2 h-20 text-white p-6 bg-black'>
          <button onClick={() => {console.log("Clicked");navigate(`/order/${ref}`);}}>Payment Sucess ref id={ref}</button>
        </div>
      </div>
     
    </Layout>
        // <button onClick={sendData}>Click</button>
  )
}

export default PaymentSucess;
