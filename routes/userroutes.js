const express=require('express');
const router=express.Router();

const GetItems=require('../script/admin/function');
const postItems=require('../script/userscrpit');

// router.get('/Teachersubject',(req,res)=>{
//     res.render('demo');

// });
router.get('/TeacherSubject',(req,res)=>{
    GetItems.getAsignSubject(req,res);
    });
// ------------studentRegister-------------

router.post('/studentregister',(req,res)=>{
    postItems.addStudentregister(req,res);
});    
router.get('/studentregister',(req,res)=>{
    GetItems.getStudentRregister(req,res);
});

router.get('/getStudentRegister',(req,res)=>{
    postItems.getStudentregister(req,res);
    // res.render('allStudentsGet');
});
router.get('/statusupdate/:id/:status',(req,res)=>{
    postItems.poststudentstatus(req,res);
    res.render('allStudentsGet');
});
// ---------------------------------for student delete-----------

router.get('/getStudents/delete/:id',(req,res)=>{
    postItems.deleteStudents(req,res);
        res.render('allStudentsGet');

});
module.exports=router;