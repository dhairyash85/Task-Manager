import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const token=localStorage.getItem('token')
    const logout=()=>{
        localStorage.removeItem('token')
        window.location.href="/"
    }
  return (
    

<nav className="bg-white dark:bg-gray-500 w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="/">
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Task Manager</span>
  </div>  
    </Link>
  
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        {token? <button onClick={logout} className="text-balack bg-white hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Logout</button>:<div className='flex gap-x-4'>
        <Link to="/signin" className="text-balack bg-white hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Login</Link>
        <Link to="/signup" className="text-balack bg-white hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Signup</Link>
        </div>}

      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-500 dark:border-gray-700">
      <li>
        <Link to="/" className="block py-2 px-3 text-white rounded hover:text-gray-800 md:p-0  ">Home</Link>
      </li>
      <li>
        <Link to="about" className="block py-2 px-3 text-white rounded hover:text-gray-800 md:p-0">About</Link>
      </li>
      <li>
        <Link to="login" className="block py-2 px-3 text-white rounded hover:text-gray-800 md:p-0">Services</Link>
      </li>
      <li>
        <Link to="contact" className="block py-2 px-3 text-white rounded hover:text-gray-800 md:p-0">Contact</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>

  )
}

export default Header