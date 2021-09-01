const mongoose=require('mongoose');
const AsignSubject=require('../../models/asingSubject');
const Studentregister=require('../../models/studentRegister');
const Teacherregister=require('../../models/teacherRegister');
// const AdminUser=require('../../module/adminReg');
const Mainmessgae=require('../../models/mainMessage');
const GetGivingSubject=require('../../models/getGivingSubject');
const { collection } = require('../../models/asingSubject');

module.exports={
getAsignSubject :async function(req,res){
    let asingSubject= await AsignSubject.find({});
    res.render('11',{asingSubject});
},
// -----------------studentregister----------
getStudentRregister:async function(req,res){
    let studentregister=await Studentregister.find({});
    res.render('allStudentsGet',{studentregister});
},
// -----------------teacherregister-----------
getTeacherRregister:async function(req,res){
    let teacherregister=await Teacherregister.find({});
    res.render('demo',{teacherregister});
    // console.log(teacherregister);
},
TeacherRregisterGet:async function(req,res){
    let teacherRegister=await Teacherregister.find({});
    res.render('allTeacherGet',{teacherRegister});
    // console.log(teacherregister);
},
getteacherRregisterCounter:async function(req,res){
    let collection = "sarhadUni.teacherregisters";
    let teacherregistercounter=await Teacherregister.countDocuments(collection)
       console.log(teacherregistercounter);
    //    res.render('dashboard',{teacherregistercounter});
},

// -------------------adminReg-----------------
// getAdminReg:async function(req,res){
//     let adminReg= await AdminUser.find({});
//     res.render('adminlogin',{adminReg});
// },

// -----------------------mainmessage-----------
getMainMessage : async function(req,res){
    let mainmessgae=await Mainmessgae.find({});
    res.render('allMessageGet',{mainmessgae});
},
getPostMainMessage:async function(req,res){
    let postmainmessage=await Mainmessgae.find({});
    res.render('postMainMessage',{postmainmessage});
},
// ----------------------GetGivingSubject----------
getGivingSubject : async function(req,res){
    let givingSuject = await GetGivingSubject.find({});
    res.render('GetgivingSubject',{givingSuject});
},
// ----------------SubjectNotification--------
getSubjectNotification: async function(req,res){
    let subjectnotification= await SubjectNotification.find({});
    res.render('SubjectNotification',{subjectnotification});
},

}
