import React from 'react'

export const About = () => {
  return (
    <div>
      <section className="container mx-auto px-8 py-8 ">
        <h2 className="block antialiased tracking-normal font-sans text-4xl font-bold  text-white  !leading-snug lg:!text-4xl">
          Task Manager
        </h2>
        <p className="block antialiased font-sans text-xl font-semibold  leading-relaxed text-inherit mt-2 w-full  !text-gray-200 lg:w-5/12">
          Manage your tasks efficiently and get notified an hour before they're due. Safe and reliable task management.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md min-h-[30rem] items-end overflow-hidden">
            <img src="https://bucket.material-tailwind.com/magic-ai/58b51625af5803baea7811b7e9128c8b23c0706c3271fa863b6bc287c2d3958a.jpg" alt="Task Management" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="p-6 relative flex flex-col justify-end">
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">Efficient Task Management</h4>
              <p className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">
                Our task manager helps you organize and prioritize your tasks efficiently. Stay on top of your deadlines with ease.
              </p>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md min-h-[30rem] items-end overflow-hidden">
            <img src="https://bucket.material-tailwind.com/magic-ai/36e7d64250cd9568062f658a26b4d0107c00235cb3b85fa4919b3ba4070c9bed.jpg" alt="Notification System" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="p-6 relative flex flex-col justify-end">
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">Timely Notifications</h4>
              <p className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">
                Get email notifications an hour before your tasks are due, ensuring you never miss a deadline again.
              </p>
            </div>
          </div>
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md min-h-[30rem] items-end overflow-hidden">
            <img src="https://bucket.material-tailwind.com/magic-ai/36e7d64250cd9568062f658a26b4d0107c00235cb3b85fa4919b3ba4070c9bed.jpg" alt="Security" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="p-6 relative flex flex-col justify-end">
              <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-white">Secure and Reliable</h4>
              <p className="block antialiased font-sans text-base font-light leading-relaxed text-white my-2 font-normal">
                Your tasks and personal information are kept secure with our top-notch security measures, ensuring your data is safe.
              </p>
            </div>
          </div>
        </div>
        <div className="text-gray-500 mt-5 font-bold">
          Created by Dhairyash Jain
        </div>
      </section>
    </div>
  )
}
