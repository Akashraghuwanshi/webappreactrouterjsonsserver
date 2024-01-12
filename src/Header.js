import React from 'react'
import {FaLaptop,FaTabletAlt,FaMobileAlt} from 'react-icons/fa'

//using props i have received the title and width and i have destructured it here too in the order that i have passed them.

const Header = ({title,width}) => {
  return (
    <header className="Header">
        <h1>{title}
        <img src="/Images/flaglogo.jpg" alt="flag-logo" width="50px" height="50px"/>
        </h1>
        {width<768?<FaMobileAlt/>:width<992?<FaTabletAlt/>:<FaLaptop/>}
    </header>
  )
}

export default Header