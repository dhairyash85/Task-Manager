const express = require("express");
const router = express.Router();
const Tasks = require("../Model/Tasks");

router.post('/createtask', async(req, res)=>{
    const {email, name, description, time, date} = req.body;
    try{
        await Tasks.create({
            email:email,
            task_name:name,
            task_description:description,
            date:date,
            time:time
        })
        res.json({success:true})
    }catch(err){
        res.json({success:false, err:err})
    }
})

router.post('/gettask', async(req, res)=>{
    const {email} = req.body;
    try{
        const task=await Tasks.find({email:email})
        res.json({success:true, task:task})
    }
    catch(error){
        res.json({success:false, err:error})
    }
})

module.exports=router