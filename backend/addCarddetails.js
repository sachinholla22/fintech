const express = require('express');
const router3 = express.Router();
const conndb = require('./server');
let multer=require('multer');
const path =require('path');
require("dotenv").config();
const nodemailer = require("nodemailer");

let storage1=multer.diskStorage({
    destination:function(req,file,cb){
        let uploadsPath=path.join(__dirname,'uploads');
       
        cb(null,uploadsPath)

    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});
let upload=multer({storage:storage1});

router3.post('/savecreditcarddetails',upload.single('idphoto'),(req,res)=>{
    console.log('received request',req.body,req.file);
    const {name,dateofbirth,contact,address,Id,idnumber,professionname,Monthlysalary}=req.body;
    const idphoto=req.file ? req.file.filename : null;
    let sql="INSERT INTO creditcardapplication (name,dateofbirth,contact,address,Id,idnumber,professionname,Monthlysalary,idphoto,status) VALUES(?,?,?,?,?,?,?,?,?,'pending')";
    conndb.query(sql,[name,dateofbirth,contact,address,Id,idnumber,professionname,Monthlysalary,idphoto],(err,result)=>{
        if(err){
            console.log("error occured");
            return res.status(500).json({err:"invalid credentials"})
        }
        return res.status(200).json(result)
    })

})


router3.post('/foradminlogin',(req,res)=>{
    const {adminname,password}=req.body;
    let sql="SELECT * FROM adminlogin WHERE adminname=? AND password=?";
    conndb.query(sql,[adminname,password],(err,results)=>{
        if(err){
            console.log("error orccured")
            return res.status(500).json({error:"invalid credentials",hasdata:false})
        }
        if (results.length === 0) {
          return res.status(401).json({error: "Invalid credentials", hasdata: false});
      }
        return res.status(200).json({hasdata:true,data:results[0],msg:"got from bck"})
    })
})

router3.get("/pendingapplication",(req,res)=>{
    let sql="SELECT * FROM creditcardapplication WHERE status='pending'";
    conndb.query(sql,(err,result)=>{
        if(err){
            console.log("an error occured and cannot sent",err);
            return res.status(401).json({err:"error"})
        }
        else{
            return res.status(200).json(result)
        }
    })
})

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router3.post("/approveapplication", async (req, res) => {
  const { applicationId, status } = req.body;

  // Validate status
  if (status !== "approved") {
      return res.status(400).json("Invalid status");
  }

  // SQL query to update application status
  let sql = "UPDATE creditcardapplication SET status=? WHERE application_id=?";
  conndb.query(sql, [status, applicationId], async (err, result) => {
      if (err) {
          console.error('Error updating application status:', err);
          return res.status(500).json({ error: 'Failed to update application status' });
      }

      // Prepare to send email
      const userEmail = "sachinholla01@gmail.com"; // Replace with actual email from the database
      let mailOptions = {
          from: process.env.EMAIL,
          to: userEmail,
          subject: "Your Application Status",
          text: "Congratulations! Your application has been approved.",
      };

      // Send email
      try {
          await transporter.sendMail(mailOptions);
          return res.status(200).json({ message: 'Application status updated successfully and email sent.' });
      } catch (emailError) {
          console.error('Error sending email:', emailError);
          return res.status(500).json({ error: 'Application status updated, but failed to send email.' });
      }
  });
});
router3.post("/rejectapplication",(req,res)=>{
    const {applicationId,status}=req.body;
    if(status!=="rejected"){
  return res.status(400).json("invalid status")
    }
    let sql="UPDATE creditcardapplication SET status=? WHERE application_id=?";
    conndb.query(sql,[status,applicationId],(err,result)=>{
        if (err) {
            console.error('Error updating application status:', err);
            return res.status(500).json({ error: 'Failed to update application status' });
          }
          return res.status(200).json({ message: 'Application status updated successfully',result });
    })

})
router3.get('/showapplication',(req,res)=>{
    let userId=req.session.user.id;
    let sql="SELECT phnumber FROM newbankuser WHERE userID=?";
    conndb.query(sql,[userId],(err,result)=>{
        if(err || result.length==0){
            console.log("cant retrive userid")
        }
        let contactOfcredituser=result[0].phnumber;
        console.log(contactOfcredituser)
        let sql2='SELECT status  FROM creditcardapplication WHERE contact=?';
        conndb.query(sql2,[contactOfcredituser],(error,gotresult)=>{
            if(error){
                console.log("didnt get value frromm applicsation")
                console.log(error)
            }
            if (gotresult.length > 0) {
              console.log(gotresult)
                return res.status(200).json(gotresult);
              } else {
                return res.status(200).json([{ status: "rejected" }]);
              }
        })
    })
})

router3.get('/getapplicationId',(req,res)=>{
    let userId=req.session.user.id;
    let sql="SELECT phnumber FROM newbankuser WHERE userID=?";
    conndb.query(sql,[userId],(err,result)=>{
        if(err || result.length==0){
            console.log("cant retrive userid")
        }

        let contactOfcredituser=result[0].phnumber;
        let sql2='SELECT application_id FROM creditcardapplication WHERE contact=?';
        conndb.query(sql2,[contactOfcredituser],(error,gotresult)=>{
            if(error){
                console.log("didnt get value frromm applicsation")
            }
            if (gotresult.length > 0) {
                return res.status(200).json({ application_id: gotresult[0].application_id });
              } else {
                return res.status(200).json([{ status: "rejected" }]);
              }
        })

})
})

const generateeCCV=()=>{
    return Math.floor(100 + Math.random() * 900).toString();
}
function generateCreditCardNumber() {
    const num = '4' + Math.floor(Math.random() * 10**15).toString().padStart(15, '0');
    return num;
}
function generateExpirydate(){
    const now=new Date();
    let year=now.getFullYear()+3;
    const month=String(now.getMonth()+1).padStart(2,'0');
    return `${year}-${month}-01`;
}
function generateCreditLimit(salary) {
    return salary * 2; // Example: Credit limit is twice the monthly salary
}

function generateBillingCycle() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start, end };
}
router3.post("/create-creditcard", (req, res) => {
    const { application_id } = req.body;
    const userId = req.session.user ? req.session.user.id : null;
  
    if (!application_id) {
      return res.status(401).json({ error: "Cannot get the application id from frontend" });
    }
  
    try {
      let sql = "SELECT * FROM creditcardapplication WHERE application_id=? AND status='approved'";
      conndb.query(sql, [application_id], (err, result) => {
        if (err) {
          console.error("Error occurred while querying database:", err);
          return res.status(500).json({ error: "Database error" });
        }
  
        if (!result || result.length === 0) {
          console.log("Application ID not found:", application_id);
          return res.status(404).json({ error: "Application ID not found" });
        }
  
        const Application = result[0];
  
        const cardNumber = generateCreditCardNumber();
        const cvv = generateeCCV();
        const expiryDate =  generateExpirydate()
        const creditLimit = generateCreditLimit(Application.Monthlysalary);
        const { start: billingCycleStart, end: billingCycleEnd } = generateBillingCycle();
        const issuanceDate = new Date().toISOString().split("T")[0];
  
        const insertQuery =
          "INSERT INTO creditcards (userId, application_id, name, dateofbirth, contact, address, id_type, id_number, profession_name, monthly_salary, id_photo, credit_card_number, card_type, expiry_date, cvv, credit_limit, available_credit, issuance_date, billing_cycle_start, billing_cycle_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        conndb.query(
          insertQuery,
          [
            userId,
            application_id,
            Application.name,
            Application.dateofbirth,
            Application.contact,
            Application.address,
            Application.Id,
            Application.idnumber,
            Application.professionname,
            Application.Monthlysalary,
            Application.idphoto,
            cardNumber,
            "visa", // Hardcoded card type 'visa' (adjust as per your application logic)
          
            expiryDate,
            cvv,
            creditLimit,
            creditLimit, // Assuming available credit starts with the full credit limit
            issuanceDate,
            billingCycleStart,
            billingCycleEnd,
          ],
          (error, resultSet) => {
            if (error) {
              console.error("Error inserting data into creditcards table:", error);
              return res.status(400).json({ error: "Failed to insert data into creditcards table" });
            }
            console.log("Credit card created successfully");
            return res.status(200).json(resultSet);
          }
        );
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Unexpected error" });
    }
  });

  router3.get('/account-detailsofcreditcard',(req,res)=>{
    let userId=req.session.user.id;
    let sql="SELECT creditcard_id FROM creditcards WHERE userId=?";
    conndb.query(sql,[userId],(err,result)=>{
      if(err){
        console.log("cannot retreiev user");
       
      }
      if(result.length>0){
        console.log(result)
      return res.status(200).json({hasAccount:true, data: result })
      }else{
        console.log("no records")
        return res.status(404).json({hasAccount:false,error: "No credit card found for user"})
      }
    })
  })
  
  router3.get('/gettingcreditdata',(req,res)=>{
    let userId=req.session.user.id;
    let sql='SELECT credit_card_number,card_type,expiry_date,cvv,credit_limit,available_credit,issuance_date,billing_cycle_start,billing_cycle_end,created_at FROM creditcards WHERE userId=?';
    conndb.query(sql,[userId],(err,results)=>{
      if(err){
        console.log('error occured',err);

      }
      console.log(results)
      return res.status(200).json(results)

    })
  })


  router3.get('/hascreditcardapplication', (req, res) => {
    let userId = req.session.user.id;
    let sql = 'SELECT phnumber FROM newbankuser WHERE userID=?';
    
    conndb.query(sql, [userId], (err, results) => {
        if (err) {
            console.log('error occurred', err);
            return res.status(500).json({ data: false, msg: "Error" });
        }
        if (results.length == 0) {
            return res.status(404).json({ data: false, msg: "nocontact" }); // Use 404 for not found
        }

        let phNum = results[0].phnumber;
        let sql2 = 'SELECT application_id FROM creditcardapplication WHERE contact=?';
        
        conndb.query(sql2, [phNum], (error, result) => {
            if (error) {
                console.log('error occurred', error);
                return res.status(500).json({ data: false, msg: "Error" });
            }
            if (result.length == 0) {
                return res.status(404).json({ data: false, msg: "no application" }); // Use 404 for not found
            }

            // Send a response back to the client when an application is found
            return res.status(200).json({ data: true, msg: "Application found", applicationId: result[0].application_id });
        });
    });
});

module.exports=router3;