import React, { useEffect, useState } from "react";
import axios from "../api/AxiosConfig";
import { toast } from "react-toastify";
import { Table } from "../Components/Table";
export const Home = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const[tasks, setTasks]=useState([])
  const[isOpen, setIsOpen]=useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: null,
    time: null,
  });
  const handleChange=(event)=>{
    setFormData({...formData, [event.target.name]:event.target.value})
  }
  const addTask=async(e)=>{
    e.preventDefault()
    const {name,description,date,time}=formData
    const res=await axios.post('/createtask', {
        email:user.email,
        name:name,
        description:description,
        date:date,
        time:time
    })
    console.log(res)
    if(res.data.success){
        toast.success("Task Added!")
        const temp=await axios.post('/gettask', {email:user.email})
        console.log(temp)
        if(temp.data.success){
          setTasks(temp.data.task)
          console.log(temp.data.task)
          console.log(tasks)
        }else{
          toast.error(`Error: ${temp.data.err}`)
        }
    }
    else{
        toast.error(`Error: ${res.data.err}`)
    }
  }
  useEffect(() => {
    const init = async () => {
      if (token) {
        const res = await axios.post("/verifyToken");
        console.log(res);
        console.log(token);
        if (res.data.success && res.data.user) {
          setUser(res.data.user.user);
          const temp=await axios.post('/gettask', {email:res.data.user.user.email})
          console.log(temp)
          if(temp.data.success){
            setTasks(temp.data.task)
            console.log(temp.data.task)
            console.log(tasks)
          }else{
            toast.error(`Error: ${temp.data.err}`)
          }
        }
      }
    };
    if (!user) {
      init();
    }
  }, [user]);
  return (
    <>
      {user ? (
        <>
          <div>
            <div className="flex items-center justify-center p-12">
              <div className="mx-auto flex flex-col w-full max-w-[550px]">
                {isOpen && <form className="bg-gray-800 p-10 rounded-xl">
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-base font-medium text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Task Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="description"
                      className="mb-3 block text-base font-medium text-white"
                    >
                      Description
                    </label>
                    <input
                      type="string"
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="time"
                      className="mb-3 block text-base font-medium text-white"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="date"
                      className="mb-3 block text-base font-medium text-white"
                    >
                      Date
                    </label>
                    <input
                      name="date"
                      type='date'
                      id="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    ></input>
                  </div>
                  <div>
                    <button onClick={addTask} className="text-black bg-white hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                      Submit
                    </button>
                  </div>
                </form>}
                <button onClick={()=>setIsOpen(!isOpen)} className="text-black bg-white hover:bg-gray-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isOpen?"Back":"Add a task"}</button>
              </div>
            </div>
            {tasks && <div className="w-full flex justify-center"><Table  props={tasks}/></div>}
          </div>
        </>
      ) : (
        <div>
          <section className="relative  bg-blueGray-50">
            <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-75 bg-black"
                ></span>
              </div>
              <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                    <div className="pr-12">
                      <h1 className="text-white font-semibold text-5xl">
                        Your story starts with us.
                      </h1>
                      <p className="mt-4 text-lg text-blueGray-200">
                        Handle all your tasks seamlessly with us
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                style={{ transform: "translateZ(0px)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-blueGray-200 fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>
            </div>
            <section className="pb-10 bg-blueGray-200 -mt-24">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                  <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                          <i className="fas fa-award"></i>
                        </div>
                        <h6 className="text-xl font-semibold">
                          Store Your Tasks
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          Store all your tasks for any day and any time all at one place
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                          <i className="fas fa-retweet"></i>
                        </div>
                        <h6 className="text-xl font-semibold">
                          Email Reminders
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          Don't worry about missing out the important stuff
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                          <i className="fas fa-fingerprint"></i>
                        </div>
                        <h6 className="text-xl font-semibold">
                          Safe
                        </h6>
                        <p className="mt-2 mb-4 text-blueGray-500">
                          Totally safe and easy to use site to improve your task management
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="relative  pt-8 pb-6 mt-1">
                <div className="container mx-auto px-4">
                  <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                      <div className="text-sm text-blueGray-500 font-semibold py-1">
                        Utkarsh Project
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </section>
          </section>
          
        </div>
      )}
    </>
  );
};
