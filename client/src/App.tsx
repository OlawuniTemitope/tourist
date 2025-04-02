import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/navbar/Header"

import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css";



   function  App () {
   return( <>
   <Header/> 
   <main className='py-3'>
   <Outlet/> 
   <ToastContainer 
   position="top-right"/>
   </main>
   <Footer/>
   </>
  )}
  
  export default App
  