const mongoose=require('mongoose');
const getgivingsubject=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    // decipline:{type:String,required:true},
    semester:{type:String,required:true},
    // section:{type:String},
    subject:{type:String,required:true},
    scode:{type:String,required:true},    
   
    
});
module.exports=mongoose.model('GetGivingSubject',getgivingsubject);