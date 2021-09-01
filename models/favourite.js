let mongoose = require('mongoose');

let favourite =new mongoose.Schema({
    studentregister:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"Studentlogin",
    }
});
module.exports=mongoose.model('Favourite',favourite);