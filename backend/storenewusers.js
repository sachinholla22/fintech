const express = require('express');
const router1 = express.Router();
const conn = require('./server');
const nodemailer = require('nodemailer');
require('dotenv').config();
const bcrypt = require('bcrypt'); // Import bcrypt
const saltRounds = 10;

// Your remaining code...
 

/*
router1.get('/loginHistory', (req, res) => {
  // console.log(req.session.user.id);
   let sql = "CREATE TABLE IF NOT EXISTS loginhistory (id INT(11)AUTO_INCREMENT PRIMARY KEY, user_id INT(11), loginTime VARCHAR(200))";
   conn.query(sql, (err, result) => {
     if (err) {
       console.error('Error creating loginhistory table:', err);
       return res.status(500).json({ error: "Database error" });
     }
     console.log('loginhistory table created successfully');
     res.status(200).json(result);
   });
 });
*/
 router1.post('/logout', (req, res) => {
  // Destroy the user's session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Error logging out' });
    }

    // Send a success response
    return res.json({ message: 'Logged out successfully' });
  });
});

router1.get('/createtable',(req,res)=>{
let sql="CREATE TABLE IF NOT EXISTS newbankuser(id INT(11) AUTO_INCREMENT PRIMARY KEY,userID INT(11),name VARCHAR(200),dob VARCHAR(200), city VARCHAR(200),pincode VARCHAR(200),phnumber VARCHAR(200),email VARCHAR(200),aadhar VARCHAR(200),gender VARCHAR(100),initialamt VARCHAR(200),bankname VARCHAR(200),username VARCHAR(200),password VARCHAR(200),accNum VARCHAR(200))";
conn.query(sql,(err,result)=>{
  if(err){
    console.log("error connecting db",err)
  }
  console.log("database created succesfully newbankuser")
  return res.status(200).json(result)
})
})
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
  },
});// Define salt rounds for hashing

router1.post('/storenewuser', (req, res) => {
  const {
    name, dob, city, pincode, phnumber, email, aadhar,
    gender, initialamt, pin, username, password, accNum
  } = req.body;

  // Check if all required data is received
  if (!name || !dob || !city || !pincode || !phnumber || !email || !aadhar || !gender || !initialamt || !pin || !username || !password || !accNum) {
    return res.status(400).json("Did not receive all required data from the frontend");
  }

  // SQL query to check if a user already exists
  const checkQuery = `SELECT email FROM newbankuser WHERE email=?`;

  conn.query(checkQuery, [email], (err, result) => {
    if (err) {
      console.log('Database error during lookup:', err);
      return res.status(500).json("Database error during lookup.");
    }

    if (result.length > 0) {
      // User exists, set session
      return res.status(200).json("User already exists");
    } else {
      // Hash the password before inserting into the database
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.log("Error during password hashing:", err);
          return res.status(500).json("Error during password hashing.");
        }

        // User does not exist, insert a new user
        const insertQuery = `
          INSERT INTO newbankuser (name, dob, city, pincode, phnumber, email, aadhar, gender, initialamt, pin_number, username, password, accNum, userID) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
        `;
        
        conn.query(insertQuery, [name, dob, city, pincode, phnumber, email, aadhar, gender, initialamt, pin, username, hashedPassword, accNum], async (err, results) => {
          if (err) {
            console.log("Error occurred during bank registration:", err);
            return res.status(500).json("Failed to register new bank account.");
          }
          const userEmail = email; // Replace with actual email from the database
          let mailOptions = {
              from: process.env.EMAIL,
              to: userEmail,
              subject: "Your Application Status",
              text: `Congratulations! Your registration is successfull and this is your account number ${accNum} please refer this everytime from now`,
          };
    
          try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Bank account registered and session created.", data: results });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            return res.status(500).json({ error: 'Failed to make registration, but failed to send email.' });
        }
  

          // Set session after successful registration
    
        });
      });
    }
  });
});

/*
router1.post('/storenewuser',(req,res)=>{
  const userID=req.session.user.id;
  const {name,dob,city,pincode ,phnumber,email,aadhar,gender,initialamt,pin,username,password,accNum}=req.body;
  req.session.userID = userID;
  req.session.accNum = accNum;
  req.session.phnumber=phnumber;
  let mysql="INSERT INTO newbankuser(userID,name,dob,city,pincode,phnumber,email,aadhar,gender,initialamt,pin_number,username,password,accNum) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  conn.query(mysql,[userID,name,dob,city,pincode,phnumber,email,aadhar,gender,initialamt,pin,username,password,accNum],async(err,results)=>{
    if(err){
      console.log("error occured ",err)
    }

    let mailOptions = {
      from: process.env.EMAIL,
      to: email, // Use the email retrieved from the database
      subject: "Your Bank Registration",
      text: `Congratulations ${name},The Account Number ${accNum} has been Registered for the mobile number ${phnumber}.
      Please keep your  account number safe and use it for the Existing user.
      Thank You..`,
  };


  // Send email
  await transporter.sendMail(mailOptions);

    return res.status(200).json(results)
  })
})
*/

router1.get('/getnewuser', (req, res) => {
  if (!req.session.user) {
    return res.status(400).json({ error: "No session data found." });
  }

  const accNum = req.session.user.accNum;
  if (!accNum) {
    return res.status(400).json({ error: "Account number missing in session." });
  }

  const sql = "SELECT * FROM newbankuser WHERE accNum = ?";
  conn.query(sql, [accNum], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Error fetching user data' });
    }
    return res.status(200).json(results);
  });
});

router1.get('/getUserdetailsBank',(req,res)=>{
  if(req.session.user){
    console.log("user has logged in",req.session.user)
    console.log("this is logged in session id",req.sessionID)
    return res.status(200).json("user logged")
  }
  else {
    console.log("No user found");
    console.log("session ID",req.sessionID)
    return res.status(500).json("No usr found")
  }
})

router1.get('/fornewdetails',(req,res)=>{
  console.log("check sessions ",req.session)
  if(req.session.user && req.session.user.id){
    console.log("user Id is",req.session.user.id)
    res.status(200).send({dashboard:true})
  }
 else{
  console.log("user not logged in")
  res.status(401).json({error:'user not logged in'})
 }
})


/*
router1.get('/user-exist',(req,res)=>{
  let userID=req.session.user.id;
  let sql="SELECT * FROM newbankuser WHERE userID=?"
  conn.query(sql,[userID],(err,result)=>{
    if (err) {
      console.error('Error checking existing user:', err);
      return res.status(500).json({ error: 'Error checking existing user' });
    }

    if (result.length > 0) {
      // User has an existing bank account
      return res.status(200).json({ hasAccount: true });
    } else {
      // User does not have an existing bank account
      return res.status(200).json({ hasAccount: false });
    }

  })
  
})
  */
router1.get("/existingusertable",(req,res)=>{
 
  let sql="CREATE TABLE IF NOT EXISTS existingbankusers (id INT(10) AUTO_INCREMENT PRIMARY KEY,userId INT(10),username VARCHAR(200), password VARCHAR(200),accountNum VARCHAR(200))";
  conn.query(sql,(err,result)=>{
    if(err){
      console.log('error occured cant create db',err);

    }else{
      return res.status(200).json(result)
    }
  })
})


// Assuming 'router1' is your Express router
router1.post('/existinguserscheck', (req, res) => {
  let { username, password, accountNum } = req.body;

  // First, retrieve the user by username and account number
  let sql = "SELECT * FROM newbankuser WHERE username=? AND accNum=?";
  conn.query(sql, [username, accountNum], async (err, result) => {
    if (err) {
      console.log("Error fetching user data:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length > 0) {
      const user = result[0];
      
      // Use bcrypt to compare the plain text password with the hashed password from the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (isPasswordValid) {
        // If the password is valid, create the session
        req.session.user = user;
        req.session.user.id = user.id;
        console.log("Session created with ID:", req.session.user.id);
        console.log("Session ID:", req.sessionID);

        let userId = req.session.user.id;

        // Update the user ID in the database (if needed)
        let newSql = "UPDATE newbankuser SET userID=? WHERE username=? AND accNum=?";
        conn.query(newSql, [userId, username, accountNum], (error, insertdata) => {
          if (error) {
            console.log("Error updating data:", error);
            return res.status(500).json({ message: "Internal Server Error" });
          } else {
            return res.status(200).json({ credentials: true, insertdata: insertdata, hasCreatedSession: true });
          }
        });
      } else {
        // If the password does not match
        return res.status(401).json({ credentials: false, message: "Invalid password" });
      }
    } else {
      // If no user found
      return res.status(401).json({ credentials: false, message: "User not found" });
    }
  });
});



router1.get('/alreadyExistingacc',(req,res)=>{
  
})



module.exports = router1;
