const express = require('express');
const fetch=require('node-fetch');
const router=express.Router();
router.post('/sendToAll',(req,res)=>{
    console.log('hhhhhhhhhhhhhhhhhhhhh');
    var notification ={
        titlte:'Title of notification',
        body:'Subtitle'
    };
    var fcm_tokens=['c_DfteXhS865NnycooiQ0T:APA91bHbveeKh2vfau5R5LVvgK3RRxDk7JetIUsGL7CpJLQNgu-4JX6yPAbTL9oBge70W49zrL4UUYVut3hHMU_xdnOqfszECQ-gVSql0ogK5bdBgTD7_E3-R-4ggTIG97s03Py3hTrG'];
    
    var notification_body={
        'notification':notification,
        'registration_ids':fcm_tokens
    }

    fetch('https://fcm.googleapis.com/fcm/send',{
        'method':'POST',
        'headers':{
            'Authorization':'key='+'AAAAtVQ4F9I:APA91bHfQzZ2R74t0Hp4SgIJDsbokXR4ojwd0wQGNKTu6p25IlA_h3z0i1VVK2gVvx9k8tXJAKO1O9Ia_Tjwm4RZe7JEe5dYBr1n34ERskgaIIleMuIRNMF_PWQ1vwxMl4d9p7UbXGbo',
            'Content-Type':'application/json'
        },
        'body':JSON.stringify(notification_body)
    }).then(()=>{
        res.status(200).send('Notification Send Successfuly');
    }).catch((err)=>{
        res.status(400).send('Something is worng');
        console.log(err);
    })
});
module.exports=router;