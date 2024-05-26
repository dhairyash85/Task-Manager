const mongoose=require('mongoose')
const {Schema}=mongoose;
const taskSchema = new Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    task_name: {
      type: String,
      required: true,
      trim: true
    },
    task_description: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true,
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'is invalid'] 
    }
  });
  
  const Task = mongoose.model('Task', taskSchema);
  
  module.exports = Task;
  