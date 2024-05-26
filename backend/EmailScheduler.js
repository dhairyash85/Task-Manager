const cron = require("node-cron");
const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
const Tasks = require("./Model/Tasks");
require('dotenv').config();
console.log("HHEE", process.env.API_KEY)
sgMail.setApiKey(process.env.API_KEY);


const sendEmail = (email, task) => {
  const msg = {
    to: email,
    from: "jaindhairyashj@gmail.com",
    subject: `Reminder: ${task.task_name} is due soon`,
    text: `Hi, just a reminder that your task "${task.task_name}" is due in an hour.`,
    html: `<p>Hi, just a reminder that your task "<strong>${task.task_name}</strong>" is due in an hour.</p>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const nowIST = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); // Convert to IST
  const oneHourLaterIST = new Date(nowIST.getTime() + 60 * 60 * 1000);
  console.log(nowIST);
  console.log(oneHourLaterIST);
  console.log(new Date(nowIST.toISOString().split("T")[0]))
  const currentDateIST = new Date(nowIST.getFullYear(), nowIST.getMonth(), nowIST.getDate());
  console.log(currentDateIST)
  const tasksDueSoon = await Tasks.find({
    date: new Date(nowIST.toISOString().split("T")[0]), // Exact date in IST
    time: {
        $gte: nowIST.toISOString().split('T')[1].slice(0, 5), // Current time in IST
        $lt: oneHourLaterIST.toISOString().split('T')[1].slice(0, 5) // Time one hour later in IST
      },
      emailSent:false
  });
  console.log(tasksDueSoon);
  tasksDueSoon.forEach((task) => {
    sendEmail(task.email, task);
    Tasks.updateOne({task_name:task.task_name, time: task.time}, {emailSent:true})
  });

});
console.log("Email scheduler started");
// cron.schedule("* * * * *", async () => {
//     const now = new Date(now.getTime() + 5.5 * 60 * 60 * 1000)
//     console.log("Time to delete tasks:", now);
  
//     const tasksDueNow = await Tasks.find({
//       date: new Date(now.toISOString().split("T")[0]),
//       time: {
//         lte: now.toISOString().split("T")[1].slice(0, 5),
//       }
//     });
    
//     console.log("to be deleted, ", tasksDueNow)
//     tasksDueNow.forEach(async (task) => {
//       try {
//         await Tasks.findByIdAndDelete(task._id);
//         console.log(`Task '${task.task_name}' deleted.`);
//       } catch (error) {
//         console.error(`Error deleting task '${task.task_name}':`, error);
//       }
//     });
//   });
  
//   console.log("Task deletion scheduler started");