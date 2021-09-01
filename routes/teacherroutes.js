const express=require('express');
// const { addSubjectNoitification } = require('../script/userscrpit');
const router=express.Router();
const postItems=require('../script/userscrpit');
const GetItems=require('../script/admin/function')
router.get('/getTeacherInfo/:userId',(req,res)=>{
    postItems.getTeacherInfoById(req,res);
});
// ------------------SubjectNoitification-----
router.post('/addsubjectnotification',(req,res)=>{
    postItems.addSubjectNoitification(req,res);
});
// router.get('/getsubjectnotification/:semester/:section/:subject',(req,res)=>{
//     postItems.getSubjectNotification(req,res);
// });
router.get('/getsubjectnotification/:semester/:section/:subject',(req,res)=>{
    
    postItems.getSubjectNotification(req,res);
});
module.exports=router;