import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../api/AxiosConfig'
function Signin() {
  const[formData, setFormData]=useState({email:"", password:""})
  const handleChange=(event)=>{
    setFormData({...formData, [event.target.name]:event.target.value})
  }
  const signin=async(e)=>{
    e.preventDefault()
    try{

    
    const response=await axios.post("/signin", {email:formData.email, password:formData.password})
    console.log(response)
    if(response.data.success){
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const user=await axios.post("/verifyToken")
        console.log(user)
        if(!user.data.success){
          localStorage.removeItem('token');
          toast.error("Could not signin")
        }
        else{
          toast.success("Signed In!")
          window.location.href="/"
        }
      }
      else{
        toast.error("There was some error")
      }
    }
    else{
      toast.error(`Error: ${response.data.err}`)
    }
  }catch(error){
    let err=error.response.data.err[0].msg?`${error.response.data.err[0].msg}: ${error.response.data.err[0].path}`: error.response.data.err
    console.log(err)
    toast.error(`${err}`)
    console.log(error.response.data.err)
  }

  }
  return (
    <div className='py-20 flex align-middle justify-center'>
      <form className='bg-gray-800 p-10 rounded-lg w-1/3'>
      <h1 className='block mb-2 text-2xl font-medium text-gray-900 dark:text-white'>Hello User!</h1>
      <br></br>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter Your Email" required />
    </div> 
    <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="•••••••••" required />
    </div> 
    
    <button type="submit" onClick={signin} className="text-black bg-white hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Login</button>
    
      </form>
      </div>
  )
}

export default Signin

// mongodb+srv://jaindhairyashj:rg3m8SgnZUpbqxu5@task-manager.kqisdvz.mongodb.net/?retryWrites=true&w=majority&appName=Task-Manager