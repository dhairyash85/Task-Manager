import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from '../api/AxiosConfig';
export const Signup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    pwd: "",
    cpwd: "",
  });
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  const signup=async(e)=>{
    toast("Creating Account...")
    e.preventDefault()
    if(formData.cpwd!=formData.pwd){
        toast.error("Passwords do not match")
        return
    }
    const res=await axios.post('/signup', {fname:formData.fname, lname:formData.lname, password:formData.pwd, phone:formData.phone, email:formData.email})
    console.log(res)
    if(res.data.success){
        toast.success("Account Created!")
    }
    else{
        console.log(res.data)
        toast.error(`Error: ${res.data.err}`)
    }
  }
  return (
    <div className="py-20 flex align-middle justify-center">
      <form className="bg-gray-800 p-10 rounded-lg  ">
      <h1 className='block mb-2 text-2xl font-medium text-gray-900 dark:text-white'>Welcome!</h1>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-white"
            >
              First name
            </label>
            <input
              type="text"
              value={formData.fname}
              id="fname"
              name="fname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="John"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Last name
            </label>
            <input
              type="text"
              id="lname"
              value={formData.lname}
              name="lname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Doe"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-white"
            >
              Phone number
            </label>
            <input
              type="string"
              id="phone"
              value={formData.phone}
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="123-45-678"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-white"
            >
              Emai
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="flowbite.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name='pwd'
            value={formData.pwd}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="•••••••••"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="cpwd"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="•••••••••"
            required
            value={formData.cpwd}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          onClick={signup}
          className="text-black bg-white hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};
