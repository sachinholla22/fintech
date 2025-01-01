const express = require('express');
const router5 = express.Router();
const conndb = require('./server');
let multer=require('multer');
const path =require('path');

let storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadsPath = path.join(__dirname, 'uploads');
        cb(null, uploadsPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

let upload = multer({ storage: storage1 });

router5.post('/savedebitcarddetails', upload.single('idphoto'), (req, res) => {
    console.log('Received request', req.body, req.file);
    const { name, bankacc, dateofbirth, contact, address, Id, idnumber,debitpin } = req.body;

    const idphoto = req.file ? req.file.filename : null;
    let sql2 = "SELECT accNum FROM newbankuser WHERE accNum=?";
    
    conndb.query(sql2, [bankacc], (errors, results) => {
        if (errors) {
            console.error('Database query error:', errors);
            res.status(500).json({ errors: "Error querying database" });
            return;
        }

        console.log('Query results:', results); // Log the results to verify the query response

        if (results.length > 0) {
            console.log('Bank account found:', bankacc);

            let sql = "INSERT INTO debicardapplication (name, bankacc, dateofbirth, contact, address, Id, idnumber,debit_pin,idphoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";
            conndb.query(sql, [name, bankacc, dateofbirth, contact, address, Id, idnumber,debitpin, idphoto], (err, result) => {
                if (err) {
                    console.error("Error occurred while inserting data:", err);
                    return res.status(500).json({ err: "Error inserting data" });
                }
                return res.status(200).json(result);
            });
        } else {
            console.log('Invalid bank account number:', bankacc);
            return res.status(400).json({ error: "Invalid bank account number" });
        }
    });
});


router5.get('/debituser-exists',(req,res)=>{
    let userId=req.session.user.id;
    let sql ="SELECT phnumber FROM newbankuser WHERE userID=? ";
     conndb.query(sql,[userId],(err,result)=>{
        if(err){
            console.log(err,"cant get ph num")
        }
        let contact=result[0].phnumber;
        conndb.query('SELECT * FROM debicardapplication WHERE contact=?',[contact],(error,results)=>{
            if(error ||results.length==0){
              return res.status(500).json({err:"no details",data:null})
            }
            return res.status(200).json({data:results})
        })
     })
})

router5.get('/getdebitcardapplicationId', (req, res) => {
  let userId = req.session.user.id;
  let sql = "SELECT phnumber FROM newbankuser WHERE userID=?";
  conndb.query(sql, [userId], (err, result) => {
      if (err || result.length == 0) {
          console.log("can't retrieve user ID");
          return res.status(500).json({ status: "error", message: "can't retrieve user ID" });
      }

      let contactOfdebituser = result[0].phnumber;
      console.log(contactOfdebituser);
      let sql2 = 'SELECT application_id FROM debicardapplication WHERE contact=?';
      conndb.query(sql2, [contactOfdebituser], (error, gotresult) => {
          if (error) {
              console.log("didn't get value from application");
              return res.status(500).json({ status: "error", message: "didn't get value from application" });
          }
          if (gotresult.length > 0) {
              return res.status(200).json({ status: "success", application_id: gotresult[0].application_id });
          } else {
              return res.status(500).json({ status: "rejected", application_id: "rcb" });
          }
      });
  });
});


const generateeCCV=()=>{
    return Math.floor(100 + Math.random() * 900).toString();
}
function generateDebitCardNumber() {
    const num = '4' + Math.floor(Math.random() * 10**15).toString().padStart(15, '0');
    return num;
}
function generateExpirydate(){
    const now=new Date();
    let year=now.getFullYear()+4;
    const month=String(now.getMonth()+1).padStart(2,'0');
    return `${year}-${month}-01`;
}

router5.post('/create-debitcard',(req,res)=>{
    const { application_id } = req.body;
    const userId = req.session.user ? req.session.user.id : null;
  
    if (!application_id) {
      return res.status(401).json({ error: "Cannot get the application id from frontend" });
    }
  
    try {
      let sql = "SELECT * FROM debicardapplication WHERE application_id=?";
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
  
        const cardNumber = generateDebitCardNumber();
        const cvv = generateeCCV();
        const expiryDate =  generateExpirydate()
       
        const issuanceDate = new Date().toISOString().split("T")[0];
  
        const insertQuery =
          "INSERT INTO debitcards (userId, application_id, name, dateofbirth, contact, address, id_type, id_number,  id_photo, debit_card_number,  expiry_date, cvv, issuance_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
          
            Application.idphoto,
            cardNumber,
         // Hardcoded card type 'visa' (adjust as per your application logic)
          
            expiryDate,
            cvv,
       // Assuming available credit starts with the full credit limit
            issuanceDate,
       
          ],
          (error, resultSet) => {
            if (error) {
              console.error("Error inserting data into creditcards table:", error);
              return res.status(400).json({ error: "Failed to insert data into debitcards table" });
            }
            console.log("Debit card created successfully");
            return res.status(200).json(resultSet);
          }
        );
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Unexpected error" });
    }
  });

  
router5.get('/has-debitcardapplied',(req,res)=>{
  let userId=req.session.user.id;
  let sql ="SELECT * FROM debitcards WHERE userID=? ";
   conndb.query(sql,[userId],(err,result)=>{
      if(err||result.length==0){
          console.log(err,"cant get details from backend")
          return res.status(500).json({err:"no details",data:null})
      }
      else{
      console.log(result)
      return res.status(200).json({data:result})
      }
   
})
})



router5.get('/get-debit-user',(req,res)=>{
  let userId=req.session.user.id;
  let sql ="SELECT phnumber FROM newbankuser WHERE userID=? ";
   conndb.query(sql,[userId],(err,result)=>{
      if(err){
          console.log(err,"cant get ph num")
      }
      let contact=result[0].phnumber;
      conndb.query('SELECT userId,name,contact,debit_card_number,expiry_date,cvv,issuance_date FROM debitcards WHERE contact=?',[contact],(error,results)=>{
          if(error ||results.length==0){
            return res.status(500).json({err:"no details",data:null})
          }
          return res.status(200).json({data:results})
      })
   })
})


module.exports=router5;