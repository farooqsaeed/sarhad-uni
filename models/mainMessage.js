const mongoose=require('mongoose');
const mainmessgae=mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    tittle:{type:String,required:true},
    message:{type:String,required:true},
       
    
    
  
    
});
module.exports=mongoose.model('Mainmessgae',mainmessgae);