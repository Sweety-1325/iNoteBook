const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
//const mongoURI='mongodb://localhost:27017/users?readPreference=primary&appName=MongoDB%2520Compass&tls=false&directConnection=true';
const mongoURI='mongodb+srv://Madhumita:Madhumita@cluster0.pxpg6ye.mongodb.net/inotebook';
const connectToMongo=(()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("CONNECTED TO MONGOOSE SUCCESSFULLY")
    })
})


  
  
module.exports=connectToMongo;