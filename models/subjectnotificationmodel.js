const mongoose=require('mongoose');
const subjectnotification=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    semester:{type:String,required:true},
    section:{type:String,required:true},
    subject:{type:String, required:true},
    title:{type:String,required:true},    
    discription:{type:String,required:true},
     
    
    
  
    
});
module.exports=mongoose.model('SubjectNotification',subjectnotification);