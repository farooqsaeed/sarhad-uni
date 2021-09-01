const express=require('express');
const fetch=require('node-fetch');

const router=express.Router();
const Studentregister=require('../script/userscrpit');
router.post('/studentlogin',(req,res)=>{
    Studentregister.loginuser(req,res);
});
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://cloud.mongodb.com/v2/607e9d28b1c4bb59b99cd364#metrics/replicaSet/607e9e75a189d21ac8c9df08/explorer/sarhadUni"
//   });


// router.post('/sendToAll',(req,res)=>{
//     console.log('hhhhhhhhhhhhhhhhhhhhh');
//     const  registrationToken = 'f1FJycoTTW-Tu-P5TLqHnW:APA91bFL2A-G7-Ry3g7DcLA8X2ML2EKLvVEleYflgMyYQVsE_ra29H9M_7PnXvwHUUwItxr35NjYHp3hgpYjbAZvZT7lyHaGcbll6Y3SgnNB_SP_cpI7ENT-nz8JfMmKj3x2rQuzt9Ml';
//     var payload = {
//         notification: {
//           title: "Account Deposit",
//           body: "A deposit to your savings account has just cleared."
//         },
      
//       data: {
//         account: "Savings",
//         balance: "$3020.25"
//       }
//     };
//     var options = {
//         priority: "normal",
//         timeToLive: 60 * 60
//       };
//       admin.messaging().sendToDevice(registrationToken, payload, options)
//       .then(function(response) {
//         console.log("Successfully sent message:", response);
//       })
//       .catch(function(error) {
//         console.log("Error sending message:", error);
//       });
// });
    
     

// ----------get semester by sec-----
router.get('/getSem/:sem',(req,res)=>{
    Studentregister.getSubjectsBySemster(req,res);
});
// router.post('/getSem/:sem/:sec')
module.exports=router;