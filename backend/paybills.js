const conn=require('./server.js');
const express=require('express');
let router4=express.Router();
let nodemailer=require('nodemailer')

const generateBillnum=()=>{
    let min=100000;
    let max=999999;
    let randNum=Math.floor(Math.random()* (max - min + 1)) + min;
    return randNum
}

const Billmonth=()=>{
    let now=new Date();
    let year=now.getFullYear();
    let month=String(now.getMonth()+1).padStart(2,"0");
    return `${year}-${month}`;
}
const Duedate=()=>{
    let now=new Date();
    now.setDate(now.getDate() + 30); // Correct way to call setDate on the Date object
    return now.toISOString().split('T')[0];
    
}
const generateAmt=()=>{
    let max=999;
    let min=100;
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

router4.post('/postelectricitybilldata',(req,res)=>{
    let userId=req.session.user.id;
if(!userId){
    console.log("No user id")
    return res.status(500).json("No user id")
}
    let sql="SELECT userID,name,phnumber FROM newbankuser WHERE  userID=?";
    conn.query(sql,[userId],(err,result)=>{
        if(err){
            console.log("error occured while retreieving newbankuser")
        }
        if(result.length>0){
            let { userID, name, phnumber } = result[0];
            let Billnum=generateBillnum();
            let BillMonth=Billmonth();
            let dueDate=Duedate();
            let amount=generateAmt();
             let sql2="INSERT INTO electricitybill (bill_id,userId,name,phone_num,billing_month,due_date,status,payment_date,amount)VALUES(?,?,?,?,?,?,'pending',NOW(),?)";
             conn.query(sql2,[Billnum,userID,name,phnumber,BillMonth,dueDate,amount],(errors,resultofquery)=>{
                if(errors){
                    console.log("Couldnt enter the details for electic bill table",errors);
                    return res.status(400).json({inserted:false})
                }
                return res.status(200).json({inserted:true,data:resultofquery})

             })
        }
    })
})

router4.post("/postbilliddetails",(req,res)=>{
    let billId=req.body.bill_id;
    console.log("Received billId:", billId);
    conn.query("SELECT * FROM electricitybill WHERE bill_id=?",[billId],(err,results)=>{
        if(err){
            console.log("cant retrive data",err)
        }
        if (results.length > 0) {
            console.log("Bill details found:", results[0]);
            return res.status(200).json(results[0]);
        } else {
            console.log("Bill not found for ID:", billId); 
            return res.status(404).json({ error: "Bill not found" });
        }
    })
})


router4.get("/getdetailselectricbill", (req, res) => {
    const userId = req.session.user.id;

    if (!userId) {
        console.log("User ID is not available in session.");
        return res.status(401).json({ error: "User not authenticated" });
    }

    console.log("User ID:", userId);

    conn.query("SELECT * FROM electricitybill WHERE userId = ?", [userId], (err, results) => {
        if (err) {
            console.log("Can't retrieve data", err);
            return res.status(500).json({ error: "Error retrieving bill details" });
        }

        if (results.length > 0) {
            console.log("Bill details found:", results);
            return res.status(200).json({ hasAcc: true, data: results });
        } else {
            console.log("No bill details found for user ID:", userId);
            return res.status(404).json({ hasAcc: false });
        }
    });
});

function generatePaymentId(){
    let min=1000000000;
    let max=9999999999;
    let res=Math.floor(Math.random()*(max-min+1))+min;
    return res;
}
router4.post('/confirm-payment', (req, res) => {
    const { name, cardno, cardtype, ccv, amount, payCreditcard, bill_of } = req.body;

    if (!name || !cardno || !cardtype || !ccv || !amount || !payCreditcard || !bill_of) {
        console.log("Invalid input");
        return res.status(401).json({ error: "All fields are required" });
    }

    try {
        if(bill_of=="Electric_bill"){
        const sql = "SELECT * FROM creditcards WHERE name=? AND credit_card_number=? AND card_type=? AND cvv=?";
        conn.query(sql, [name, cardno, cardtype, ccv], (err, result) => {
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
                    const sql3 = "SELECT available_credit FROM creditcards WHERE userId=?";
                    conn.query(sql3, [userId], (anyerr, getAmt) => {
                        if (anyerr) {
                            return res.status(500).json({ error: "Cannot retrieve available credit" });
                        }
                        console.log(getAmt)
                        const initialAvailableamt = parseFloat(getAmt[0].available_credit);
                        const finalAmt = parseFloat(initialAvailableamt - amount);
                        
                        // Update available credit amount
                        const sql4 = "UPDATE creditcards SET available_credit=? WHERE userId=?";
                        conn.query(sql4, [finalAmt, userId], (errorRes, updatedres) => {
                            if (errorRes) {
                                return res.status(500).json({ error: "Cannot update available credit" });
                            }
                            console.log(updatedres)
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
                                        conn.query(sql8, [paymentId, Phnum, `Payment to ${bill_of}`, amount, payCreditcard], (bigError, maxResult) => {
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
                    });
                });
            } else {
                return res.status(401).json({ error: "Invalid credit card details" });
            }
        });}
        else if(bill_of=="Water_bill"){
            const sql = "SELECT * FROM creditcards WHERE name=? AND credit_card_number=? AND card_type=? AND cvv=?";
            conn.query(sql, [name, cardno, cardtype, ccv], (err, result) => {
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
                        const sql3 = "SELECT available_credit FROM creditcards WHERE userId=?";
                        conn.query(sql3, [userId], (anyerr, getAmt) => {
                            if (anyerr) {
                                return res.status(500).json({ error: "Cannot retrieve available credit" });
                            }
                            console.log(getAmt)
                            const initialAvailableamt = parseFloat(getAmt[0].available_credit);
                            const finalAmt = parseFloat(initialAvailableamt - amount);
                            
                            // Update available credit amount
                            const sql4 = "UPDATE creditcards SET available_credit=? WHERE userId=?";
                            conn.query(sql4, [finalAmt, userId], (errorRes, updatedres) => {
                                if (errorRes) {
                                    return res.status(500).json({ error: "Cannot update available credit" });
                                }
                                console.log(updatedres)
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
                                            conn.query(sql8, [paymentId, Phnum, `Payment to ${bill_of}`, amount, payCreditcard], (bigError, maxResult) => {
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
                        });
                    });
                } else {
                    return res.status(401).json({ error: "Invalid credit card details" });
                }
            })
            

           
        }
        
        else if(bill_of=="Mobile_Recharge"){
            let {validity, services, mobileno} = req.body;
            const sql = "SELECT * FROM creditcards WHERE name=? AND credit_card_number=? AND card_type=? AND cvv=?";
            conn.query(sql, [name, cardno, cardtype, ccv], (err, result) => {
                if (err) {
                    console.log("error in creditcards", err);
                    return res.status(500).json({ error: "Internal server error" });
                }
                if (result.length > 0) {
                    console.log("got details", result);
                    const userId = req.session.user.id;
        
                    // Insert mobile recharge record
                    const sql2 = "INSERT INTO mobile_recharge(userId, mobile_no, status, paid_on) VALUES (?, ?, 'paid', NOW())";
                    conn.query(sql2, [userId, mobileno], (errors, response) => {
                        if (errors) {
                            console.log("cannot insert mobile recharge", errors);
                            return res.status(500).json({ error: "Cannot update bill status" });
                        }
                        console.log(response);
        
                        // Update credit card balance
                        const sql3 = "SELECT available_credit FROM creditcards WHERE userId=?";
                        conn.query(sql3, [userId], (anyerr, getAmt) => {
                            if (anyerr) {
                                return res.status(500).json({ error: "Cannot retrieve available credit" });
                            }
                            console.log(getAmt);
                            const initialAvailableamt = parseFloat(getAmt[0].available_credit);
                            const finalAmt = parseFloat(initialAvailableamt - amount);
                             console.log(generateAmt,"generated anount");
                             console.log(finalAmt,"finalamt")
                            const sql4 = "UPDATE creditcards SET available_credit=? WHERE userId=?";
                            conn.query(sql4, [finalAmt, userId], (errorRes, updatedres) => {
                                if (errorRes) {
                                    console.log(errorRes)
                                    return res.status(500).json({ error: "Cannot update available credit",bigError:errorRes });
                                }
                                console.log(updatedres,"final creditcard update");
        
                                // Update initial amount in bank
                                const sql5 = "SELECT initialamt FROM newbankuser WHERE userID=?";
                                conn.query(sql5, [userId], (nores, getInitil) => {
                                    if (nores) {
                                        return res.status(500).json({ error: "Cannot retrieve initial amount" });
                                    }
                                    console.log(getInitil);
                                    const IntialbankAmt = parseFloat(getInitil[0].initialamt);
                                    const updatedInitialAmt = parseFloat(IntialbankAmt - amount);
        
                                    const sql6 = "UPDATE newbankuser SET initialamt=? WHERE userID=?";
                                    conn.query(sql6, [updatedInitialAmt, userId], (errorOccured, updatedmoney) => {
                                        if (errorOccured) {
                                            return res.status(500).json({ error: "Cannot update initial amount" });
                                        }
                                        console.log("updated data", updatedmoney);
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
                                            conn.query(sql8, [paymentId, Phnum, `Payment to ${bill_of}`, amount, payCreditcard], (bigError, maxResult) => {
                                                if (bigError) {
                                                    console.log("cannot insert data",bigError)
                                                    return res.status(400).json({ error: "Cannot insert payment details", sent: false });
                                                }
                                                console.log("inserted data",maxResult)
                                        // Retrieve user email
                                        const sql9 = "SELECT email FROM newbankuser WHERE userID=?";
                                        conn.query(sql9, [userId], async (errorrrr, getmail) => {
                                            if (errorrrr) {
                                                return res.status(500).json({ error: "Cannot retrieve email" });
                                            }
                                            const MainEmail = getmail[0].email;
        
                                            // Send email notification
                                            try {
                                                let mailOptions = {
                                                    from: process.env.EMAIL,
                                                    to: MainEmail,
                                                    subject: "Recharge Successful",
                                                    text: `Your Plan Rs ${amount} is successful and valid till ${validity} with ${services}`,
                                                };
        
                                                await transporter.sendMail(mailOptions);
                                                return res.status(200).json({ message: 'Recharge Successful and email has been sent', data: response, sent: true });
                                            } catch (emailErr) {
                                                console.log("Failed to send email", emailErr);
                                                return res.status(500).json({ error: "Recharge successful, but email not sent" });
                                            }
                                        });
                                    })
                                })
                                    });
                                });
                            });
                        });
                    });
                } else {
                    return res.status(401).json({ error: "Invalid credit card details" });
                }
            });
        }
    } catch (error) {
        console.log("Error occurred:", error);
        return res.status(500).json({ error: "An error occurred during the transaction" });
    }
});

router4.get('/get-paidstatus',(req,res)=>{
    let userId=req.session.user.id;
    conn.query("SELECT status FROM electricitybill WHERE status='paid' AND userId=?",[userId],(err,result)=>{
        if(err||result.length==0){
            console.log("error in reteriving");
            return res.status(500).json({data:false})

        }
        else{
            return res.status(200).json({data:result})
        }
    })
})
router4.get('/getBilldetails',(req,res)=>{
    let userId=req.session.user.id;
    conn.query("SELECT phnumber FROM newbankuser WHERE  userID=?",[userId],(err,result)=>{
        if(err){
            console.log("error in reteriving");

        }
    let phnum=result[0].phnumber;
    let sql2="SELECT * FROM utilitybills WHERE phone_number=?";
    conn.query(sql2,[phnum],(error,response)=>{
        if(error){
            console.log(error,"cant get details");
        }
        return res.status(200).json(response)
    })
    })
})

function DueDate(){
    let now=new Date();
    now.setDate(now.getDate() + 30); // Correct way to call setDate on the Date object
    return now.toISOString().split('T')[0];
}
function  Amount(){
    let max=999;
    let min=100;
    let res=Math.floor(Math.random()*(max-min+1))+min;
    return res;
}
function  waterUsage(){
    let max=99;
    let min=10;
    let res=Math.floor(Math.random()*(max-min+1))+min;
    return res;
}
function calculateLateFee(dueDate, paymentDate, dailyRate) {
    // Convert dates to JavaScript Date objects
    const due = new Date(dueDate);
    const payment = new Date(paymentDate);

    // Calculate the difference in time (in milliseconds)
    const timeDiff = payment - due;

    // Convert time difference to days
    const daysLate = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // If the payment is late, calculate the late fee
    if (daysLate > 0) {
        return daysLate * dailyRate;
    } else {
        return 0; // No late fee if paid on or before the due date
    }
}
function BillAccNum(){
    let min=10000000;
    let max=99999999;
    let res=Math.floor(Math.random()*(max-min+1))+min;
    return res;
}
router4.post('/generate-waterbill',(req,res)=>{
    let userId=req.session.user.id;
    let Billingmonth=Billmonth();
    let Duedate=DueDate();
    let Amountdue=Amount();
    let waterUse=waterUsage();
    let lateFee='0';
    let billAccnum=BillAccNum();
if(!userId||!Billingmonth||!Duedate||!Amountdue||!waterUse){
    return res.status(500).json({data:false,msg:'couldnt receive datas correctly'})
}
if(!lateFee){
    console.log(lateFee)
    return res.status(500).json({data:false,msg:'couldnt receive LATE FEE and AccNum'})
}
conn.query("SELECT name FROM newbankuser WHERE userID=?",[userId],(nameError,getName)=>{
    if(nameError){
        return res.status(500).json({data:false,msg:'cannot get name'})
    }
    let names=getName[0].name;

    let sql ="INSERT INTO water_bill(userId,billing_month,due_date,amount_due,water_usage,status,payment_date,late_fee,bill_AccNum,name) VALUES(?,?,?,?,?,'pending',Null,?,?,?) ";
    conn.query(sql,[userId,Billingmonth,Duedate,Amountdue,waterUse,lateFee,billAccnum,names],(err,result)=>{
        if(err){
            return res.status(500).json({data:false,msg:'cannot insert data for water bill'})
        }
        let sql3="SELECT email FROM newbankuser WHERE userID=?";
        conn.query(sql3,[userId],async(emailerror,emailresult)=>{
            if(emailerror){
                return res.status(404).json("no email")
            }
            let MainEmail=emailresult[0].email;
        
        let mailOptions = {
            from: process.env.EMAIL,
            to: MainEmail, // Use the email retrieved from the database
            subject: "Your Water Bill for this Month",
            text: "Your Water Bill for this Month is in Due ,Please Pay it as soon as possible to avoid late Charges.",
        };

        // Send email
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Application status updated successfully and email sent.',data:result[0] });
    })
    })
    })
})

module.exports=router4;

