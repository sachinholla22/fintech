const conn=require('./server.js');
const express=require('express');
let router9=express.Router();
let nodemailer=require('nodemailer');




router9.post("/sendAccNumofwaterbill",(req,res)=>{
    let {billAccNum}=req.body;
    let userId=req.session.user.id;
    let sql="SELECT * FROM water_bill WHERE bill_AccNum=? AND userId=?";
    conn.query(sql,[billAccNum,userId],(error,result)=>{
        if(error){
            return res.status(500).json({data:false,msg:"error occured"})
        }
        if(result.length==0){
            return res.status(500).json({data:false,msg:"no data available"})
        }
        if(result.length>0){
        return res.status(200).json({data:result[0]})
        }
    })
})


router9.get("/getPaymentdetails-of-waterBill",(req,res)=>{
    let userId=req.session.user.id;
    let sql="SELECT status FROM water_bill WHERE userId=? AND status='paid'";
    conn.query(sql,[userId],(error,result)=>{
        if(error){
            return res.status(500).json({isPaid:false,msg:"error occured"})
        }
        if(result.length==0){
            return res.status(500).json({isPaid:false,msg:"not paid"})
        }
        if(result.length>0){
        return res.status(200).json({isPaid:true})
        }
    })
})
function generatePaymentId(){
    let min=1000000000;
    let max=9999999999;
    let res=Math.floor(Math.random()*(max-min+1))+min;
    return res;
}
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});


router9.post('/confirm-Debit-card-payment', (req, res) => {
    const { name, cardno, ccv, amount, payDebitcard, bill_of } = req.body;

    if (!name || !cardno || !ccv || !amount || !payDebitcard || !bill_of) {
        console.log("Invalid input");
        return res.status(401).json({ error: "All fields are required" });
    }

    try {
        if(bill_of=="Electric_bill"){
        const sql = "SELECT * FROM debitcards WHERE name=? AND debit_card_number=? AND cvv=?";
        conn.query(sql, [name, cardno, ccv], (err, result) => {
            if (err) {
                console.log("error in creditcards",err)
                return res.status(500).json({ error: "Internal server error" });
            }
            if (result.length > 0) {
                console.log("got details",result)
                const userId = req.session.user.id;
                
                // Update electricity bill status
                const sql2 = "UPDATE electricitybill SET status='paid' WHERE userId=?";
                conn.query(sql2, [userId], (errors, response) => {
                    if (errors) {
                        console.log(errors,"cant update bill status")
                        return res.status(500).json({ error: "Cannot update bill status" });
                       
                    }
                    console.log(response)
                    // Retrieve initial credit card amount
                   
                            // Retrieve initial amount from bank
                            const sql5 = "SELECT initialamt FROM newbankuser WHERE userID=?";
                            conn.query(sql5, [userId], (nores, getInitil) => {
                                if (nores) {
                                    console.log('cannot get initial amt')
                                    return res.status(500).json({ error: "Cannot retrieve initial amount" });
                                }
                                console.log(getInitil)
                                const IntialbankAmt = parseFloat(getInitil[0].initialamt);
                                const updatedInitialAmt = parseFloat(IntialbankAmt - amount);
                                
                                // Update initial amount in bank
                                const sql6 = "UPDATE newbankuser SET initialamt=? WHERE userID=?";
                                conn.query(sql6, [updatedInitialAmt, userId], (errorOccured, updatedmoney) => {
                                    if (errorOccured) {
                                        console.log("cannot update newbank user")
                                        return res.status(500).json({ error: "Cannot update initial amount" });
                                    }
                                    console.log("updated data",updatedmoney)
                                    
                                    // Retrieve user phone number
                                    const sql7 = "SELECT phnumber FROM newbankuser WHERE userID=?";
                                    conn.query(sql7, [userId], (phError, gotPhnum) => {
                                        if (phError) {
                                            console.log("cant get ph number",phError)
                                            return res.status(500).json({ error: "Cannot retrieve phone number" });
                                        }
                                        console.log("got ph num ",gotPhnum)
                                        const Phnum = gotPhnum[0].phnumber;
                                        
                                        // Insert payment details into utilitybills
                                        const paymentId = generatePaymentId();
                                        const sql8 = "INSERT INTO utilitybills (paymentId, phone_number, date, description, amount, payment_type) VALUES (?, ?, NOW(), ?, ?, ?)";
                                        conn.query(sql8, [paymentId, Phnum, `Payment to ${bill_of}`, amount, payDebitcard], (bigError, maxResult) => {
                                            if (bigError) {
                                                console.log("cannot insert data",bigError)
                                                return res.status(400).json({ error: "Cannot insert payment details", sent: false });
                                            }
                                            console.log("inserted data",maxResult)
                                            return res.status(200).json({ data: maxResult, sent: true });
                                        });
                                    });
                                });
                            });
                        });
                  
            } else {
                return res.status(401).json({ error: "Invalid debit card details" });
            }
        });}
        else if(bill_of=="Water_bill"){
            const sql = "SELECT * FROM debitcards WHERE name=? AND debit_card_number=?  AND cvv=?";
            conn.query(sql, [name, cardno, ccv], (err, result) => {
                if (err) {
                    console.log("error in creditcards",err)
                    return res.status(500).json({ error: "Internal server error" });
                }
                if (result.length > 0) {
                    console.log("got details",result)
                    const userId = req.session.user.id;
                    
                    // Update electricity bill status
                    const sql2 = "UPDATE water_bill SET status='paid' WHERE userId=?";
                    conn.query(sql2, [userId], (errors, response) => {
                        if (errors) {
                            console.log(errors,"cant update bill status")
                            return res.status(500).json({ error: "Cannot update bill status" });
                           
                        }
                        console.log(response)
                        // Retrieve initial credit card amount
                      
                                const sql5 = "SELECT initialamt FROM newbankuser WHERE userID=?";
                                conn.query(sql5, [userId], (nores, getInitil) => {
                                    if (nores) {
                                        console.log('cannot get initial amt')
                                        return res.status(500).json({ error: "Cannot retrieve initial amount" });
                                    }
                                    console.log(getInitil)
                                    const IntialbankAmt = parseFloat(getInitil[0].initialamt);
                                    const updatedInitialAmt = parseFloat(IntialbankAmt - amount);
                                    
                                    // Update initial amount in bank
                                    const sql6 = "UPDATE newbankuser SET initialamt=? WHERE userID=?";
                                    conn.query(sql6, [updatedInitialAmt, userId], (errorOccured, updatedmoney) => {
                                        if (errorOccured) {
                                            console.log("cannot update newbank user")
                                            return res.status(500).json({ error: "Cannot update initial amount" });
                                        }
                                        console.log("updated data",updatedmoney)
                                        
                                        // Retrieve user phone number
                                        const sql7 = "SELECT phnumber FROM newbankuser WHERE userID=?";
                                        conn.query(sql7, [userId], (phError, gotPhnum) => {
                                            if (phError) {
                                                console.log("cant get ph number",phError)
                                                return res.status(500).json({ error: "Cannot retrieve phone number" });
                                            }
                                            console.log("got ph num ",gotPhnum)
                                            const Phnum = gotPhnum[0].phnumber;
                                            
                                            // Insert payment details into utilitybills
                                            const paymentId = generatePaymentId();
                                            const sql8 = "INSERT INTO utilitybills (paymentId, phone_number, date, description, amount, payment_type) VALUES (?, ?, NOW(), ?, ?, ?)";
                                            conn.query(sql8, [paymentId, Phnum, `Payment to ${bill_of}`, amount, payDebitcard], (bigError, maxResult) => {
                                                if (bigError) {
                                                    console.log("cannot insert data",bigError)
                                                    return res.status(400).json({ error: "Cannot insert payment details", sent: false });
                                                }
                                                console.log("inserted data",maxResult)
                                                return res.status(200).json({ data: maxResult, sent: true });
                                            });
                                        });
                                    });
                                });
                            });
                       
                } else {
                    return res.status(401).json({ error: "Invalid Debit card details" });
                }
            })
            

           
        }
        else if(bill_of=="Mobile_Recharge"){
            const{validity,services,mobileno}=req.body;
            const sql = "SELECT * FROM debitcards WHERE name=? AND debit_card_number=?  AND cvv=?";
            conn.query(sql, [name, cardno, ccv], (err, result) => {
                if (err) {
                    console.log("error in creditcards",err)
                    return res.status(500).json({ error: "Internal server error" });
                }
                if (result.length > 0) {
                    console.log("got details",result)
                    const userId = req.session.user.id;
                    
                    // Update electricity bill status
                    const sql2 = "INSERT INTO mobile_recharge(userId,mobile_no,status,paid_on)VALUES(?,?,'paid',NOW())";
                    conn.query(sql2, [userId,mobileno], (errors, response) => {
                        if (errors) {
                            console.log(errors,"cant update bill status")
                            return res.status(500).json({ error: "Cannot update bill status" });
                           
                        }
                        console.log(response)
                        // Retrieve initial credit card amount
                      
                                const sql5 = "SELECT initialamt FROM newbankuser WHERE userID=?";
                                conn.query(sql5, [userId], (nores, getInitil) => {
                                    if (nores) {
                                        console.log('cannot get initial amt')
                                        return res.status(500).json({ error: "Cannot retrieve initial amount" });
                                    }
                                    console.log(getInitil)
                                    const IntialbankAmt = parseFloat(getInitil[0].initialamt);
                                    const updatedInitialAmt = parseFloat(IntialbankAmt - amount);
                                    
                                    // Update initial amount in bank
                                    const sql6 = "UPDATE newbankuser SET initialamt=? WHERE userID=?";
                                    conn.query(sql6, [updatedInitialAmt, userId], (errorOccured, updatedmoney) => {
                                        if (errorOccured) {
                                            console.log("cannot update newbank user")
                                            return res.status(500).json({ error: "Cannot update initial amount" });
                                        }
                                        console.log("updated data",updatedmoney)
                                        
                                        // Retrieve user phone number
                                        const sql7 = "SELECT phnumber FROM newbankuser WHERE userID=?";
                                        conn.query(sql7, [userId], (phError, gotPhnum) => {
                                            if (phError) {
                                                console.log("cant get ph number",phError)
                                                return res.status(500).json({ error: "Cannot retrieve phone number" });
                                            }
                                            console.log("got ph num ",gotPhnum)
                                            const Phnum = gotPhnum[0].phnumber;
                                            
                                            // Insert payment details into utilitybills
                                            const paymentId = generatePaymentId();
                                            const sql8 = "INSERT INTO utilitybills (paymentId, phone_number, date, description, amount, payment_type) VALUES (?, ?, NOW(), ?, ?, ?)";
                                            conn.query(sql8, [paymentId, Phnum, `Payment to ${bill_of}`, amount, payDebitcard], (bigError, maxResult) => {
                                                if (bigError) {
                                                    console.log("cannot insert data",bigError)
                                                    return res.status(400).json({ error: "Cannot insert payment details", sent: false });
                                                }
                                                console.log("inserted data",maxResult)
                                                
                                                let sql9="SELECT email FROM newbankuser WHERE userID=?";
                                                conn.query(sql9,[userId],async(errorrrr,getmail)=>{
                                                  if(errorrrr){
                                                      return resstatus(500).json("cannot retrive email")
                                                  }
                                                  let MainEmail=getmail[0].email;
                                               
                                                  let mailOptions = {
                                                      from: process.env.EMAIL,
                                                      to: MainEmail, // Use the email retrieved from the database
                                                      subject: "Recharge Successfull",
                                                      text:`Your Plan Rs ${amount} is successfull and validate till ${validity} with ${services}` ,
                                                  };
                                          
                                                  // Send email
                                                  await transporter.sendMail(mailOptions);
                                                  return res.status(200).json({ message: 'Rechaarge Successfull and email has been sent',data:maxResult,sent:true });
                                            });
                                        });
                                    })
                                    });
                                });
                            });
                       
                } else {
                    return res.status(401).json({ error: "Invalid Debit card details" });
                }
            })
            

           
        }
    } catch (error) {
        console.log("Error occurred:", error);
        return res.status(500).json({ error: "An error occurred during the transaction" });
    }
});



router9.get('/getAllusersdata',(req,res)=>{
    let sql="SELECT * FROM newbankuser";
    conn.query(sql,(err,result)=>{
        if(err||result.length==0){
            return  res.status(500).json("no result")
        }
        return res.status(200).json(result)
    })
})




router9.post('/deleteUser',(req,res)=>{
    let {userId}=req.body;
    if(!userId){
        return res.status(500).json("didnt receive data")
    }
    let sql="DELETE FROM newbankuser WHERE userID=?";
    try{
    conn.query(sql,[userId],(err,result)=>{
        if(err||result.length==0){
            console.log(err,"biggError")
            return  res.status(500).json("no result")
        }
        return res.status(200).json({hasDeleted:true})
    })
}catch(error){
    console.log("catching backerror ",error)
}

})

module.exports=router9;