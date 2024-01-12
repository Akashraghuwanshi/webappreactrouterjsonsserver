import React from 'react'
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

import useWindowSize from './hooks/useWindowSize';//import of custom Hook useWindowSize

const Layout = ({search,setSearch}) => {

  const {width} = useWindowSize();//this custom hook return the object but with the help of destructuring the object i am using width
  return (
    <div className="App">
      <Header
         title="BHARAT BLOGS " width={width}// I am using props here to transfer the data to the Header component
         
      />
      <Nav 
       search={search}
       setSearch={setSearch}
      />
      <Outlet/> 
      <Footer/>
    </div>
  )
}

export default Layout