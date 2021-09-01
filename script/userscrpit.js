const mongoose=require('mongoose');
const Studentregister=require('../models/studentRegister');
const Teacherregister=require('../models/teacherRegister');
const saltRounds = 10;
const GetGivingSubject=require('../models/getGivingSubject');
const SubjectNotification=require('../models/subjectnotificationmodel');
const bcrypt=require('bcryptjs');
const admin=require('firebase-admin');
let options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
};
module.exports={
    // ------------------------Studentlogin------------
    addStudentregister:async function(req,res){
        if(req.body.studentname==undefined||req.body.studentname==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your studentname",
            });
        }
        if(req.body.email==undefined||req.body.email==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your email",
            });
        }
        if(req.body.password==undefined||req.body.password==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your password",
            });
        }
      
        if(req.body.decipline==undefined||req.body.decipline==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your decipline",
            });
        }
        if(req.body.semester==undefined||req.body.semester==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your semester",
            });
        }
        if(req.body.section==undefined||req.body.section==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your section",
            });
        }
        if(req.body.rollnum==undefined||req.body.rollnum==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your rollnum",
            });
        }
    
        // let olduser = await Studentregister.findOne({email:req.body.email});
        // if(olduser!=null ||olduser.length==1){
        //     return res.send({ Success: false, message: "email already exists" });
        // }
        let studentregister=Studentregister();
        studentregister._id=mongoose.Types.ObjectId();
        studentregister.studentname=req.body.studentname;
        studentregister.email=req.body.email;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
        studentregister.password=hash;
        studentregister.decipline=req.body.decipline;
        studentregister.semester=req.body.semester;
        studentregister.section=req.body.section;
        studentregister.rollnum=req.body.rollnum;
        studentregister.devicetoken=req.body.devicetoken;
        
        studentregister.save(async function (err, student) {
            if(err){
                console.log(err);
            }else{
                res.status(200).json({
                    "Success":true,
                    "message":" Added Student Successfully",

                    'student':student,
                 });
                console.log(student);
            }
           });        
},
getStudentregister : async function(req,res){
        
    try {
        let studentreg=await Studentregister.find();
        return res.status(200).json({
            "Success":true,
            "Studentregister":studentreg,
        });
    } 
 catch (error) {
    
}
},
poststudentstatus: async function(req,res){

try{
   let user_id=req.params._id;
    let studentstatus=await Studentregister.findByIdAndUpdate(user_id,{status:req.body.status});
    // User.findByIdAndUpdate(user_id, { name: 'Gourav' },

// Studentregister.updateOne({
//  user_id,   
// status:true
// });
  return res.status(200).json({
      "Success":true,
      "StudentStatus":studentstatus,
  });

}
catch(erroe){}
},
   //   -------------------delete students------------
   deleteStudents :async function(req,res){
    let student=await Studentregister.deleteOne({_id :req.params.id});
    let studentRegister=await Studentregister.find({});
    res.render('allStudentsGet',{studentRegister});
//    return alert("Delete Successfully");
},



// -----------------get subject by semester-----------
getSubjectsBySemster:async function (req,res){
if(req.params.sem==null||req.params.sem==undefined){
    return res.status(201).json({
        'Success':false,
        'message':'please provide semster'
    });
}
let subjects =await GetGivingSubject.find({semester:req.params.sem});
res.send({ Success: true, subjects: subjects });
},
// ------------------------login student---------
loginuser :async function(req,res){
    console.log("calling");
    if(req.body.email==undefined||req.body.email==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your email",
        });
    }
    if(req.body.password==undefined||req.body.password==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your password",
        });
    }
    
    emailNumber = {
        email: req.body.email,
      };
    console.log(req.body.email);
    let user=await Studentregister.findOne(emailNumber);
    let loginUser = user;
    if(user==null ||user.length<1){
        return res.send({ Success: false, message: "User Not Found" });
    }
    const match = await bcrypt.compare(req.body.password, loginUser.password);

    if (match) {
        if (req.body.devicetoken != undefined && req.body.devicetoken != "") {
          if (user.devicetoken != req.body.devicetoken) {
            user.devicetoken = req.body.devicetoken;
          }
        }
        user.onlineStatus = true;
        await user.save(function (err, user) {
          if (err) console.log(err);
          //else res.send({ "Success": true, "message": "Verification successfull!" })
        });
        res.send({ Success: true, user: loginUser });
      } else {
        return res.send({ Success: false, message: "User Not Found" });
      }
},

// ---------------------favourite---------------
addFavourite:async function(req,res){
    console.log("adding to fav");
    if(req.body.postId==undefined||req.body.postId==null){
        return res.status(200).json({
            "Success":false,
            "message":"please provide postId",
        });
    }
    if(req.body.userId==undefined||req.body.userId==null){
        return res.status(200).json({
            "Success":false,
            "message":"please provide userId",
        });
    }
    if(req.body.type=="studentregister"){
        let foundfav = await Favourite.findOne({studentregister : req.body.postId, user : req.body.userId});
        if(foundfav != null && foundfav !=''){
            await foundfav.remove();
            return res.send({'Success' : true,'message' : 'Product removed from Favourites'})
        }else{
            let newFav =  Favourite();
            newFav.user = req.body.userId;
            newFav.studentregister = req.body.postId;
            await newFav.save(async function (err, product){
                if(err){
                    console.log(err);
                }else{
                    res.status(200).json({
                       "Success":true,
                       'product':product,
                       "message":" Added Successfully",
                    });
                }
            });
        }
    }
},
getTeacherInfoById:async function(req,res){
if(req.params.userId==null||req.params.userId==undefined){
    return res.status(200).json({
            "Success":false,
            "message":"please provide userId",
        });
}
let teacherData=await Teacherregister.findOne({_id:req.params.userId});
res.send({ Success: true, teacherInfo: teacherData });
},
// ---------------------------SubjectNotification--------------
addSubjectNoitification:async function(req,res){
   
    if(req.body.semester==undefined||req.body.semester==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your semester",
        });
    }
    if(req.body.section==undefined||req.body.section==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your section",
        });
    }
    if(req.body.subject==undefined||req.body.subject==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your subject ",
        });
    }
    if(req.body.title==undefined||req.body.title==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your tittle ",
        });
    }
    
    if(req.body.discription==undefined||req.body.discription==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your discription ",
        });
    }
    
    
    let subjnotification=SubjectNotification();
    subjnotification._id=mongoose.Types.ObjectId();
    // givingSuject.decipline=req.body.decipline;
    subjnotification.semester=req.body.semester;
    subjnotification.section=req.body.section;
    subjnotification.subject=req.body.subject;
    subjnotification.title=req.body.title;
    subjnotification.discription=req.body.discription;
    
    

    subjnotification.save(async function (err, product) {
        
        if(err){
            console.log(err);
        }else{
            
            let UserFound = await Studentregister.find({$or:[{semester : req.body.semester},{section:req.body.section}]}).lean();
            
            
        let payload = {
            notification: {
                title: req.body.title,
                body:req.body.discription,
                sound: "default",
                click_action : 'FLUTTER_NOTIFICATION_CLICK'
            },
            data : {
                'status' : '/notifications',
                info:"/subject",
                click_action : 'FLUTTER_NOTIFICATION_CLICK'
            }
        };
        UserFound.forEach(element => {

            admin.messaging().sendToDevice(element.devicetoken, payload, options).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        });
            return res.status(200).json({
                "success":true,
                "message":"notification calling"
            });
        } 
       });
},
getSubjectNotification : async function(req,res){
        console.log(req.params.semester);
        console.log( req.params.subject);
        console.log( req.params.section);

    try {
        // let subjectnotification=await SubjectNotification.find();
        let subjectnotification = await SubjectNotification.find({semester : req.params.semester,section:req.params.section,subject:req.params.subject});
        return res.status(200).json({
            "Success":true,
            "SubjectNotification":subjectnotification,
        });
    } 
 catch (error) {
    
}
},
}