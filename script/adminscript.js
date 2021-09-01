// const AdminUser=require('../module/adminReg');
const bcrypt=require('bcryptjs');
const mongoose=require('mongoose');
const AsignSubject=require('../models/asingSubject');
const Teacherregister=require('../models/teacherRegister');
const Studentregister=require('../models/studentRegister');
let passport=require('passport');
const Mainmessgae = require('../models/mainMessage');
const GetGivingSubject= require('../models/getGivingSubject');
const saltRounds = 10;
module.exports={
    addAsignSubject:async function(req,res){
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
                "message":"please enter your section ",
            });
        }
        if(req.body.subject1==undefined||req.body.subject1==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your subject1",
            });
        }
        if(req.body.scode1==undefined||req.body.scode1==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your scode1 ",
            });
        }
        if(req.body.subject2==undefined||req.body.subject2==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your subject2",
            });
        }
        if(req.body.scode2==undefined||req.body.scode2==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your scode2 ",
            });
        }
        if(req.body.subject3==undefined||req.body.subject3==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your subject3",
            });
        }
        if(req.body.scode3==undefined||req.body.scode3==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your scode3 ",
            });
        }
        if(req.body.subject4==undefined||req.body.subject4==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your subject4",
            });
        }
        if(req.body.scode4==undefined||req.body.scode4==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your scode4 ",
            });
        }
        if(req.body.subject5==undefined||req.body.subject5==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your subject5",
            });
        }
        if(req.body.scode5==undefined||req.body.scode5==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your scode5 ",
            });
        }
        // if(req.body.subject6==undefined||req.body.subject6==null){
        //     return res.status(200).json({
        //         "Success":false,
        //         "message":"please enter your subject6",
        //     });
        // }
        // if(req.body.scode6==undefined||req.body.scode6==null){
        //     return res.status(200).json({
        //         "Success":false,
        //         "message":"please enter your scode6 ",
        //     });
        // }
        // if(req.body.subject7==undefined||req.body.subject7==null){
        //     return res.status(200).json({
        //         "Success":false,
        //         "message":"please enter your subject7",
        //     });
        // }
        // if(req.body.scode7==undefined||req.body.scode7==null){
        //     return res.status(200).json({
        //         "Success":false,
        //         "message":"please enter your scode7 ",
        //     });
        // }
        
       
        
        let asignsubject=AsignSubject();
        asignsubject._id=mongoose.Types.ObjectId();
        asignsubject.decipline=req.body.decipline;
        asignsubject.semester=req.body.semester;
        asignsubject.section=req.body.section;
        asignsubject.subject1=req.body.subject1;
        asignsubject.scode1=req.body.scode1;
        asignsubject.subject2=req.body.subject2;
        asignsubject.scode2=req.body.scode2;
        asignsubject.subject3=req.body.subject3;
        asignsubject.scode3=req.body.scode3;
        asignsubject.subject4=req.body.subject4;
        asignsubject.scode4=req.body.scode4;
        asignsubject.subject5=req.body.subject5;
        asignsubject.scode5=req.body.scode5;
        asignsubject.subject6=req.body.subject6;
        asignsubject.scode6=req.body.scode6;
        asignsubject.save(async function (err, product) {
            if(err){
                console.log(err);
            }else{
                console.log(product);
            }
           });
    },
    getAsignSubject : async function(req,res){
        
            try {
                let subject=await AsignSubject.find();
                return res.status(200).json({
                    "Success":true,
                    "AsignSubject":subject,
                });
            } 
         catch (error) {
            
        }
    },
    // --------------------teacher register-------------
    addTeacherregister:async function(req,res){
        if(req.body.teachername==undefined||req.body.teachername==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter Teacher Name",
            });
        }
        if(req.body.email==undefined||req.body.email==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter Teacher email",
            });
        }
        if(req.body.password==undefined||req.body.password==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter Teacher password ",
            });
        }
        
        emailNumber = {
            email: req.body.email.toLowerCase().replace(/\s/g, ""),
          };
        let user=await Teacherregister.findOne(emailNumber);
        // console.log(user.length);
        if(user!=null){
            console.log("email already exist");
            return res.send({Success:false, message:"email already exist"});
        }
        let teacherReg=Teacherregister();
        teacherReg._id=mongoose.Types.ObjectId();
        teacherReg.teachername=req.body.teachername;
        teacherReg.email=req.body.email;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
        teacherReg.password=hash;
        teacherReg.semster1=req.body.semster1;
        teacherReg.SemSter1sectionA=req.body.SemSter1sectionA;
        teacherReg.Semster1SectionASubject=req.body.Semster1SectionASubject;
        teacherReg.SemSter1sectionB=req.body.SemSter1sectionB;
        teacherReg.Semster1SectionBSubject=req.body.Semster1SectionBSubject;
        teacherReg.SemSter1sectionC=req.body.SemSter1sectionC;
        teacherReg.Semster1SectionCSubject=req.body.Semster1SectionCSubject;

        
        teacherReg.semster2=req.body.semster2;
        teacherReg.SemSter2sectionA=req.body.SemSter2sectionA;
        teacherReg.Semster2SectionASubject=req.body.Semster2SectionASubject;
        teacherReg.SemSter2sectionB=req.body.SemSter2sectionB;
        teacherReg.Semster2SectionBSubject=req.body.Semster2SectionBSubject;
        teacherReg.SemSter2sectionC=req.body.SemSter2sectionC;
        teacherReg.Semster2SectionCSubject=req.body.Semster2SectionCSubject;

        
  
        teacherReg.semster3=req.body.semster3;
        teacherReg.SemSter3sectionA=req.body.SemSter3sectionA;
        teacherReg.Semster3SectionASubject=req.body.Semster3SectionASubject;
        teacherReg.SemSter3sectionB=req.body.SemSter3sectionB;
        teacherReg.Semster3SectionBSubject=req.body.Semster3SectionBSubject;
        teacherReg.SemSter3sectionC=req.body.SemSter3sectionC;
        teacherReg.Semster3SectionCSubject=req.body.Semster3SectionCSubject;

        
        teacherReg.semster4=req.body.semster4;
        teacherReg.SemSter4sectionA=req.body.SemSter4sectionA;
        teacherReg.Semster4SectionASubject=req.body.Semster4SectionASubject;
        teacherReg.SemSter4sectionB=req.body.SemSter4sectionB;
        teacherReg.Semster4SectionBSubject=req.body.Semster4SectionBSubject;
        teacherReg.SemSter4sectionC=req.body.SemSter4sectionC;
        teacherReg.Semster4SectionCSubject=req.body.Semster4SectionCSubject;

        
        teacherReg.semster5=req.body.semster5;
        teacherReg.SemSter5sectionA=req.body.SemSter5sectionA;
        teacherReg.Semster5SectionASubject=req.body.Semster5SectionASubject;
        teacherReg.SemSter5sectionB=req.body.SemSter5sectionB;
        teacherReg.Semster5SectionBSubject=req.body.Semster5SectionBSubject;
        teacherReg.SemSter5sectionC=req.body.SemSter5sectionC;
        teacherReg.Semster5SectionCSubject=req.body.Semster5SectionCSubject;

        
        teacherReg.semster6=req.body.semster6;
        teacherReg.SemSter6sectionA=req.body.SemSter6sectionA;
        teacherReg.Semster6SectionASubject=req.body.Semster6SectionASubject;
        teacherReg.SemSter6sectionB=req.body.SemSter6sectionB;
        teacherReg.Semster6SectionBSubject=req.body.Semster6SectionBSubject;
        teacherReg.SemSter6sectionC=req.body.SemSter6sectionC;
        teacherReg.Semster6SectionCSubject=req.body.Semster6SectionCSubject;

        
        teacherReg.semster7=req.body.semster7;
        teacherReg.SemSter7sectionA=req.body.SemSter7sectionA;
        teacherReg.Semster7SectionASubject=req.body.Semster7SectionASubject;
        teacherReg.SemSter7sectionB=req.body.SemSter7sectionB;
        teacherReg.Semster7SectionBSubject=req.body.Semster7SectionBSubject;
        teacherReg.SemSter7sectionC=req.body.SemSter7sectionC;
        teacherReg.Semster7SectionCSubject=req.body.Semster7SectionCSubject;

        
        teacherReg.semster8=req.body.semster8;
        teacherReg.SemSter8sectionA=req.body.SemSter8sectionA;
        teacherReg.Semster8SectionASubject=req.body.Semster8SectionASubject;
        teacherReg.SemSter8sectionB=req.body.SemSter8sectionB;
        teacherReg.Semster8SectionBSubject=req.body.Semster8SectionBSubject;
        teacherReg.SemSter8sectionC=req.body.SemSter8sectionC;
        teacherReg.Semster8SectionCSubject=req.body.Semster8SectionCSubject;
        teacherReg.save(async function (err, reg) {
            if(err){
                console.log(err);
            }else{
                res.redirect('getteacherRegister');
                // console.log(reg);
            }
           });
      },
    //   -------------------delete Teacher------------
    deleteTeacher :async function(req,res){
        let teacher=await Teacherregister.deleteOne({_id :req.params.id});
        let teacherRegister=await Teacherregister.find({});
        res.render('allTeacherGet',{teacherRegister});
    //    return alert("Delete Successfully");
    },
  

    //   -----------------------tracherlogin------------
    Addloginteacher :async function(req,res){
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
            email: req.body.email.toLowerCase().replace(/\s/g, ""),
          };
        console.log(req.body.email);
        let user=await Teacherregister.findOne(emailNumber);
        let loginUser = user;
        if(user==null ||user.length<1){
            return res.send({ Success: false, message: "User Not Found" });
        }
        const match = await bcrypt.compare(req.body.password, loginUser.password);
        if(match){
           return res.send({ Success: true, user: {
               'email':loginUser.email,
               'id':loginUser._id,
               'name':loginUser.teachername,
           } });
        }
    },

 
    // ---------------------admin Reg--------------
    // AddregisterAdmin: async function(req,res){
    //     if(req.body.name==undefined||req.body.name==null){
    //         return res.status(200).json({
    //             "Success":false,
    //             "message":"please enter your username",
    //         });
    //     }
    //     if(req.body.email==undefined||req.body.email==null){
    //         return res.status(200).json({
    //             "Success":false,
    //             "message":"please enter your email",
    //         });
    //     }
    //     if(req.body.password==undefined||req.body.password==null){
    //         return res.status(200).json({
    //             "Success":false,
    //             "message":"please enter your password",
    //         });
    //     }
    //     let newUser=AdminUser();
    //     newUser._id=mongoose.Types.ObjectId(),
    //     newUser.name=req.body.name;
    //     newUser.email=req.body.email;
    //     let salt = bcrypt.genSaltSync(saltRounds);
    //     let hash = bcrypt.hashSync(req.body.password, salt);
    //     newUser.password=hash;
    //     newUser.save(async function(err,user){
    //         if(err){
    //             console.log(err);
    //             res.send(err);
    //         }else{
    //             res.send({ Success: true, user: user });
    //         }
    //     });
    // },
    // loginAdmin :async function(req,res){
    //     console.log('this is calling');
    //     passport.authenticate('local-login', function(err, user, info) {
    //         if (err) {
    //             console.log('error', "" + err);
    //             req.flash('error', "" + err); // will generate a 500 error
    //             return res.redirect('admin');
    //         }
    //         if (!user) {  
    //             return res.send(info);
    //             //console.log(info.message);
    //         }
    //         req.login(user, loginErr => {
    //             if (loginErr) {
    //                 console.log(loginErr);
    //             }
    //             res.render('dashboard');
    //         });
    //     })(req, res);
        
    // },
    // -------------------mainMessage-------------
    AddMainMessage: async function(req,res){
        if(req.body.tittle==undefined||req.body.tittle==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your tittle",
            });
        }
        if(req.body.message==undefined||req.body.message==null){
            return res.status(200).json({
                "Success":false,
                "message":"please enter your messgae",
            });
        }
        let mainmessage=Mainmessgae();
        mainmessage._id=mongoose.Types.ObjectId(),
        mainmessage.tittle=req.body.tittle;
        mainmessage.message=req.body.message;
        mainmessage.save(async function(err,user){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                // res.send({ Success: true, user: user });
                res.redirect('mainMessage');
            }
        });
},
getMainMessage : async function(req,res){
    try {
        let messgae=await Mainmessgae.find();
        return res.status(200).json({
            "Success":true,
            "MainMessage":messgae,
        });
    } catch (error) {
        
    }
},
  //   -------------------delete Teacher------------
    deleteTeacher :async function(req,res){
        let teacher=await Teacherregister.deleteOne({_id :req.params.id});
        let teacherRegister=await Teacherregister.find({});
        res.render('allTeacherGet',{teacherRegister});
    //    return alert("Delete Successfully");
    },
  
   //   -------------------delete students------------
   deleteMainMessage :async function(req,res){
    let student=await Mainmessgae.deleteOne({_id :req.params.id});
    let mainmessgae=await Mainmessgae.find({});
    res.render('allMessageGet',{mainmessgae});
//    return alert("Delete Successfully");
},

// ------------------------getGiving Subject-------
addGivingSubject:async function(req,res){
   
    if(req.body.semester==undefined||req.body.semester==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your semester",
        });
    }
    if(req.body.subject==undefined||req.body.subject==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your subject",
        });
    }
    if(req.body.scode==undefined||req.body.scode==null){
        return res.status(200).json({
            "Success":false,
            "message":"please enter your scode ",
        });
    }
    
   
    
    let givingSuject=GetGivingSubject();
    givingSuject._id=mongoose.Types.ObjectId();
    // givingSuject.decipline=req.body.decipline;
    givingSuject.semester=req.body.semester;
    // givingSuject.section=req.body.section;
    givingSuject.subject=req.body.subject;
    givingSuject.scode=req.body.scode;

    givingSuject.save(async function (err, product) {
        if(err){
            console.log(err);
        }else{
            console.log(product);
        }
       });
},
getGivingSubject : async function(req,res){
    
        try {
            let givingsubject=await GetGivingSubject.find();
            return res.status(200).json({
                "Success":true,
                "GetGivingSubject":givingsubject,
            });
        } 
     catch (error) {
        
    }
},

}