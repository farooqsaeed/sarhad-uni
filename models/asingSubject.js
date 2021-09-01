const mongoose=require('mongoose');
const asignsubject=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    decipline:{type:String,required:true},
    semester:{type:String,required:true},
    section:{type:String},
    subject1:{type:String,required:true},
    scode1:{type:String},    
    subject2:{type:String,required:true},
    scode2:{type:String},    
    subject3:{type:String,required:true},
    scode3:{type:String},    
    subject4:{type:String,required:true},
    scode4:{type:String},    
    subject5:{type:String,required:true},
    scode5:{type:String},    
    subject6:{type:String},
    scode6:{type:String},
    subject7:{type:String},
    scode7:{type:String},
    
    
});
module.exports=mongoose.model('AsignSubject',asignsubject);