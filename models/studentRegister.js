const mongoose=require('mongoose');
const studentregister=mongoose.Schema({
    studentname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String, required:true},
    decipline:{type:String,required:true},    
    semester:{type:String,required:true,ref:'AsignSubject'},
    section:{type:String,required:true},
    rollnum:{type:String,required:true},
    devicetoken:{type:String,required:false},
    status: { type: Boolean, default: false },  
});
module.exports=mongoose.model('Studentregister',studentregister);