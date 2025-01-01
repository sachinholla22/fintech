const conn = require('./server'); // Ensure this path is correct

const express = require('express');
const router = express.Router();


router.get('/signup', (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS user (id INT(5) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), email VARCHAR(150), pass VARCHAR(100), dob VARCHAR(100), contact VARCHAR(30), address VARCHAR(500))";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating user table:', err);
      return res.status(500).json({ error: "Error creating user table" });
    }
    console.log('User table created or already exists');
    res.status(200).json(result);
  });
});


router.post('/signup1', (req, res) => {
  const { email, email_verified, name } = req.body;

  if (!email || !email_verified || !name) {
      return res.status(400).json({ message: "Missing data from frontend." });
  }

  const sql = "SELECT * FROM user WHERE email = ?";
  conn.query(sql, [email], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error.", error: err });
      if (result.length > 0) {
        return res.status(200).json("user Already Exists")
      } 
      else{
          // Insert new user
          const insertQuery = "INSERT INTO user (email, email_verified, name) VALUES (?, ?, ?)";
          conn.query(insertQuery, [email, email_verified, name], (error, results) => {
              if (error) {
                  return res.status(500).json({ message: "Failed to insert user.", error });
              }
              // Create session for new user
            
              return res.status(200).json({ message: "User registered." });
          });
        }
      
  });
});


router.get('/forsessionCheck', (req, res) => {
  console.log("current session",req.session)
  console.log("session id",req.session.id)
  console.log("user INFO",req.session.user)
  if (req.session.user) {
      res.json({ message: `Welcome, ${req.session.user.name}` });
  } else {
      res.status(401).json({ message: 'User not logged in' });
  }
});
/*

router.post('/login', (req, res) => {
  const { loginname, pass } = req.body;
  let sql = "SELECT * FROM user WHERE name=? AND pass=?";
  conn.query(sql, [loginname, pass], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length > 0) {
      req.session.user = results[0];
      req.session.user.id = results[0].id; // Explicitly set the user ID
      console.log('User ID:', req.session.user.id);
      console.log('Session ID:', req.session.id);

      let user_id = req.session.user?.id;
      let loginTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      if (user_id) {
        let sql = "INSERT INTO loginhistory (user_id, loginTime) VALUES(?, ?)";
        conn.query(sql, [user_id, loginTime], (err, result) => {
          if (err) {
            console.error('Error inserting login history:', err);
            return res.status(500).json({ error: 'Database error' });
          }
          console.log('Login history inserted successfully');
          res.status(200).json(result);
        });
      } else {
        console.error('User ID is not available in the session');
        return res.status(400).json({ error: 'User ID is not available' });
      }
    } else {
      console.log("invalid credentials");
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});
*/

/*
router.post('/forloginHistory', (req, res) => {
  let user_id = req.session.user?.id;
  let loginTime = new Date();
  if (!user_id) {
    console.error('User ID is not available in the session');
    return res.status(400).json({ error: 'User ID is not available' });
  }

  let sql = "INSERT INTO loginhistory (user_id, loginTime) VALUES(?, ?)";
  conn.query(sql, [user_id, loginTime], (err, result) => {
    if (err) {
      console.error('Error inserting login history:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    console.log('Login history inserted successfully');
    res.status(200).json(result);
  });
});
*/

router.get('/forloginHistory', (req, res) => {
  console.log(req.session.user.id);
  let sql = "CREATE TABLE IF NOT EXISTS loginhistory (id INT(70) PRIMARY KEY, user_id INT(70), loginTime VARCHAR(200), FOREIGN KEY (user_id) REFERENCES user(id))";
  conn.query(sql, (err, result) => {
    if (err) {
      console.error('Error creating loginhistory table:', err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log('loginhistory table created successfully');
    res.status(200).json(result);
  });
});



module.exports = router;