import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/auth';

const Layout = ({children}) => {
  return (
    <>
    <Header/>
      {children}
      <Toaster/>
    <Footer/>
    </>
  )
}

export default Layout
