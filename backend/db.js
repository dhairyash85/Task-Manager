const mongoose=require('mongoose')
const mongoURI='mongodb+srv://jaindhairyashj:rg3m8SgnZUpbqxu5@task-manager.kqisdvz.mongodb.net/?retryWrites=true&w=majority&appName=Task-Manager'

const connectToMongo=async ()=>{
    try {
        mongoose.set("strictQuery", false);
        console.log("Connecting")
        mongoose.connection.on('connected', () => console.log('connected'));
        mongoose.connection.on('open', () => console.log('open'));
        mongoose.connection.on('disconnected', () => console.log('disconnected'));
        mongoose.connection.on('reconnected', () => console.log('reconnected'));
        mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
        mongoose.connection.on('close', () => console.log('close'));
        var connection=mongoose.connection
        connection.once('open', async()=>{
         console.log("Connected ")
          
        })
        await mongoose.connect(mongoURI)
      } catch (error) {
        console.log(error);
      }
}
module.exports=connectToMongo;