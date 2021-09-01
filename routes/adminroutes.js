const express=require('express');
// const teacherRegister = require('../module/teacherRegister');
// const asingSubject = require('../module/asingSubject');
const router=express.Router();
const objectId =require('mongodb').ObjectID;
const GetItems=require('../script/admin/function');
const postItems=require('../script/adminscript');


// -------------asingSubject--------------
// router.get('/asignSubject',(req,res)=>{
//     GetItems.getAsignSubject(req,res);
// });
router.post('/asignSubject',(req,res)=>{
    postItems.addAsignSubject(req,res);
});

router.get('/studentRegister',(req,res)=>{
    (req, res) => res.render('register')
});
// ---------------------teacherRegister-----------------
router.get('/teacherRegister',(req,res)=>{
    GetItems.getTeacherRregister(req,res);
});
router.post('/teacherRegister',(req,res)=>{
    postItems.addTeacherregister(req,res);
});
router.get('/getteacherRegister',(req,res)=>{
    GetItems.TeacherRregisterGet(req,res);
    // res.render('allTeacherGet');
});

router.get('/getteacherRegister/delete/:id',(req,res)=>{
    postItems.deleteTeacher(req,res);
        // res.render('allTeacherGet');

});

router.get('/teacherregistercounter',(req,res)=>{
    GetItems.getteacherRregisterCounter(req,res);
    // res.render('dashboard');

});
// --------------------tracherlogin---------
router.post('/teacherlogin',(req,res)=>{
    postItems.Addloginteacher(req,res);
});
// ----------------------Admin Reg---------
router.get('/Admin',(req,res)=>{
    GetItems.getAdminReg(req,res);
});
router.post('/Admin',(req,res)=>{
    postItems.loginAdmin(req,res);
        // res.render('adminlogin');

});
// ---------------Mainmessage----------
router.get('/mainMessage',(req,res)=>{
    GetItems.getMainMessage(req,res);
});
router.post('/postmainMessage',(req,res)=>{
    postItems.AddMainMessage(req,res);
});
router.get('/getMainMessage',(req,res)=>{
    postItems.getMainMessage(req,res);
});
router.get('/postMainMessage',(req,res)=>{
    GetItems.getPostMainMessage(req,res);
});
router.get('/getMainMessage/delete/:id',(req,res)=>{
    postItems.deleteMainMessage(req,res);
        // res.render('allTeacherGet');

});
// ---------------getGivingSubject------------
router.get('/getGivingSubject',(req,res)=>{
    GetItems.getGivingSubject(req,res);
});
router.post('/getGivingSubject',(req,res)=>{
    postItems.addGivingSubject(req,res);
});
router.get('/getgivingSbject',(req,res)=>{
    postItems.getGivingSubject(req,res);
});

module.exports=router;