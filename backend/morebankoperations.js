const express = require('express');
const router6 = express.Router();
const conndb = require('./server');


router6.post("/get-pinnum",(req,res)=>{
    let {pinNumber}=req.body;
    let userId=req.session.user.id;
    if(!pinNumber ||!userId){
        return res.status(500).json("didnt receive pin or user Id")
    }
   
    conndb.query("SELECT initialamt FROM newbankuser WHERE pin_number=? AND userID=?",[pinNumber,userId],(err,results)=>{
        if(err){
            console.log("cant retrive data",err)
        }
        if (results.length > 0) {
            console.log("amount details found:", results[0].initialamt);
            return res.status(200).json(results[0]);
        } else {
           
            return res.status(404).json({ error: "Bill not found" });
        }
    })
})


router6.post('/send-amt',(req,res)=>{
    let {pinNumber,newamt}=req.body;
    let userId=req.session.user.id;
    if(newamt<=0){
        return res.status(401).json("amount must be greater than 0")

    }
    conndb.query("SELECT * FROM newbankuser WHERE pin_number=? AND userID=?",[pinNumber,userId],(err,results)=>{
        if(err||results.length==0){
            console.log(err,"cannot retireve data")
            return res.status(500).json({err})
        }
        if(results.length>0){
            conndb.query("SELECT initialamt FROM newbankuser WHERE userID=?",[userId],(bigerr,ress)=>{
                if(bigerr||ress.length==0){
                    console.log(err,"cannot retireve data")
                    return res.status(500).json({err})
                }
        let neewamt=parseFloat(newamt)
            let  NewAmt=parseFloat(ress[0].initialamt);
            let finalamt=NewAmt+neewamt;
            conndb.query('UPDATE newbankuser SET initialamt=? WHERE userID=?',[finalamt,userId],(error,mainresult)=>{
                if(error||mainresult.length==0){
                    return res.status(500).json({err})
                }
                return res.status(200).json({data:mainresult})
            })
        })

    }
    })
})


module.exports=router6