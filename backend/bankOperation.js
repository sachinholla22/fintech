const express = require('express');
const router2 = express.Router();
const conndb = require('./server');

router2.get('/getaccname', (req, res) => {
    let userId = req.session.user.id;
    let sql = "SELECT name FROM newbankuser WHERE userID = ?";
    conndb.query(sql, [userId], (err, result) => {
      if (err) {
        console.log("error occurred", err);
        return res.status(500).json({ error: "Error fetching account balance" });
      } else {
        if (result.length > 0) {
          return res.status(200).json(result[0].name);
        } else {
          return res.status(404).json({ error: "User not found" });
        }
      }
    });
  });
  router2.post('/sendmoney', (req, res) => {
    const { accnum, contact, amount,paymentId } = req.body;
    const userId = req.session.user.id;
    
  
    if (!accnum || !contact || !amount ||!paymentId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      // Convert amount to a number
      const transferAmount = parseFloat(amount);
  
      // Start a transaction
      conndb.beginTransaction((err) => {
        if (err) {
          return res.status(500).json({ error: 'Transaction error.' });
        }
  
        // Retrieve sender's phone number from user ID
        conndb.query('SELECT phnumber FROM newbankuser WHERE userID = ?', [userId], (err, senderResults) => {
          if (err || senderResults.length === 0) {
            conndb.rollback();
            return res.status(404).json({ error: 'Sender account not found.' });
          }
  
          const senderPhoneNum = senderResults[0].phnumber;
          //retireve sender accNum for adding in transacction
          conndb.query('SELECT accNum FROM newbankuser WHERE phnumber = ?', [senderPhoneNum], (err, senderaccnumber) => {
            if (err || senderaccnumber.length === 0) {
              conndb.rollback();
              return res.status(404).json({ error: 'Sender account not found.' });
            }
            const senderAccountNum=senderaccnumber[0].accNum;
    
  
          // Retrieve sender's initial amount
          conndb.query('SELECT initialamt FROM newbankuser WHERE phnumber = ?', [senderPhoneNum], (err, senderInitialAmtResults) => {
            if (err || senderInitialAmtResults.length === 0) {
              conndb.rollback();
              return res.status(404).json({ error: 'Sender initial amount not found.' });
            }
  
            const senderInitialAmt = parseFloat(senderInitialAmtResults[0].initialamt);
  
            // Check if sender has sufficient balance
            if (senderInitialAmt < transferAmount) {
              conndb.rollback();
              return res.status(400).json({ error: 'Insufficient funds.' });
            }
  
            // Retrieve receiver's account
            conndb.query('SELECT * FROM newbankuser WHERE phnumber = ?', [contact], (err, receiverResults) => {
              if (err || receiverResults.length === 0) {
                conndb.rollback();
                return res.status(404).json({ error: 'Receiver account not found.' });
              }
  
              const receiverAccount = receiverResults[0];
  
              // Deduct from sender's balance
              const newSenderBalance =parseFloat( senderInitialAmt - transferAmount);
              conndb.query('UPDATE newbankuser SET initialamt = ? WHERE phnumber = ?', [newSenderBalance, senderPhoneNum], (err, result) => {
                if (err) {
                  conndb.rollback();
                  return res.status(500).json({ error: 'Failed to update sender balance.' });
                }
  
                // Credit to receiver's balance
                const newReceiverBalance = parseFloat(receiverAccount.initialamt + transferAmount);
                conndb.query('UPDATE newbankuser SET initialamt = ? WHERE phnumber = ?', [newReceiverBalance, contact], (err, result) => {
                  if (err) {
                    conndb.rollback();
                    return res.status(500).json({ error: 'Failed to update receiver balance.' });
                  }
  
                  // Log transactions for sender
                  conndb.query('INSERT INTO transactiondetails (paymentId,accnum, date, description, amount, type) VALUES (?,?, NOW(), ?, ?, ?)', [paymentId,senderPhoneNum, `Transfer to  ${receiverAccount.accNum}`, `Rs.${transferAmount}`, 'debit'], (err, result) => {
                    if (err) {
                      conndb.rollback();
                      return res.status(500).json({ error: 'Failed to log sender transaction.' });
                    }
  
                    // Log transactions for receiver
                    conndb.query('INSERT INTO transactiondetails (paymentId,accnum, date, description, amount, type) VALUES (?,?, NOW(), ?, ?, ?)', [paymentId,contact, `Transfer from ${senderAccountNum}`, `Rs.${transferAmount}`, 'credit'], (err, result) => {
                      if (err) {
                        conndb.rollback();
                        return res.status(500).json({ error: 'Failed to log receiver transaction.' });
                      }
  
                      // Commit transaction
                      conndb.commit((err) => {
                        if (err) {
                          conndb.rollback();
                          return res.status(500).json({ error: 'Transaction failed, rolled back.' });
                        } else {
                          return res.status(200).json({ message: 'Transfer successful.' });
                        }
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    })
    } catch (error) {
      console.error('Error during money transfer:', error);
      return res.status(500).json({ error: 'Server error.' });
    }
  });
  

  router2.get("/checkmoney",(req,res)=>{
    let {accnum,contact}=req.query;
    let sql="SELECT * FROM newbankuser WHERE accNum=? AND phnumber=?";
    conndb.query(sql,[accnum,contact],(error,result)=>{
        if(error){
            console.log("cannot get data",error)
        }else{
            return res.status(200).json(result)
        }
    })
  })
  router2.post('/PHONETRANSFER', (req, res) => {
    const { contact, amount ,paymentId} = req.body;
    const userId = req.session.user.id;

    if (!contact || !amount||!paymentId) {
        return res.status(400).json({ error: "All details required" });
    }

    try {
        const TransferAmount = parseFloat(amount);

        conndb.beginTransaction((err) => {
            if (err) {
                return res.status(500).json({ error: 'Transaction error.' });
            }

            // Retrieve sender's phone number
            conndb.query("SELECT phnumber FROM newbankuser WHERE userID=?", [userId], (err, sendersPhnumber) => {
                if (err || sendersPhnumber.length === 0) {
                    conndb.rollback();
                    return res.status(404).json({ error: "Cannot retrieve sender's phone number" });
                }
                const SenderPhnum = sendersPhnumber[0].phnumber;

                // Retrieve sender's bank balance
                conndb.query("SELECT initialamt FROM newbankuser WHERE phnumber=?", [SenderPhnum], (err, senderInitialamt) => {
                    if (err || senderInitialamt.length === 0) {
                        conndb.rollback();
                        return res.status(404).json({ error: "Cannot get initial balance of sender" });
                    }
                    let senderAmount =senderInitialamt[0].initialamt;

                    if (senderAmount < TransferAmount) {
                        conndb.rollback();
                        return res.status(400).json({ error: "Insufficient bank balance" });
                    }

                    // Retrieve receiver's phone number
                    conndb.query("SELECT * FROM newbankuser WHERE phnumber=?", [contact], (err, receiverPhnumber) => {
                        if (err || receiverPhnumber.length === 0) {
                            conndb.rollback();
                            return res.status(404).json({ error: "Cannot retrieve receiver's phone number" });
                        }
                        let ReceiverPhnumber = receiverPhnumber[0].phnumber;

                        // Retrieve receiver's bank balance
                        conndb.query("SELECT initialamt FROM newbankuser WHERE phnumber=?", [ReceiverPhnumber], (err, receiverAmount) => {
                            if (err || receiverAmount.length === 0) {
                                conndb.rollback();
                                return res.status(404).json({ error: "Cannot retrieve receiver's bank balance" });
                            }
                            let ReceiverBankbalance = parseFloat(receiverAmount[0].initialamt);

                            // Update sender's bank account
                            let updatedsenderbalance = parseFloat(senderAmount - TransferAmount);
                            conndb.query('UPDATE newbankuser SET initialamt=? WHERE phnumber=?', [updatedsenderbalance, SenderPhnum], (err, updatedBalance) => {
                                if (err) {
                                    conndb.rollback();
                                    return res.status(500).json({ error: "Cannot update sender's balance" });
                                }

                                // Update receiver's bank balance
                                let receiverBalance = parseFloat(ReceiverBankbalance + TransferAmount);
                                conndb.query('UPDATE newbankuser SET initialamt=? WHERE phnumber=?', [receiverBalance, ReceiverPhnumber], (err, updatedRECBalance) => {
                                    if (err) {
                                        conndb.rollback();
                                        return res.status(500).json({ error: "Cannot update receiver's balance" });
                                    }

                                    // Update sender's transaction
                                    conndb.query("INSERT INTO transactiondetails (paymentId,accnum, date, description, amount, type) VALUES (?,?, NOW(), ?, ?, ?)", [paymentId,SenderPhnum, `Transferred to ${ReceiverPhnumber}`,`Rs ${TransferAmount}`, 'debit'], (err, result) => {
                                        if (err) {
                                            conndb.rollback();
                                            return res.status(500).json({ error: 'Failed to log sender transaction.' });
                                        }

                                        // Update receiver's transaction
                                        conndb.query("INSERT INTO transactiondetails (paymentId,accnum, date, description, amount, type) VALUES (?,?, NOW(), ?, ?, ?)", [paymentId,ReceiverPhnumber, `Transferred from ${SenderPhnum}`,`Rs ${TransferAmount}`, 'credit'], (err, result) => {
                                            if (err) {
                                                conndb.rollback();
                                                return res.status(500).json({ error: 'Failed to log receiver transaction.' });
                                            }

                                            conndb.commit((err) => {
                                                if (err) {
                                                    conndb.rollback();
                                                    return res.status(500).json({ error: 'Transaction failed, rolled back.' });
                                                } else {
                                                    return res.status(200).json({ message: 'Transfer successful.' });
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error during money transfer:', error);
        return res.status(500).json({ error: 'Server error.' });
    }
});

router2.get("/gettransactiondetails",(req,res)=>{
  let userId=req.session.user.id;
  if (!userId) {
    return res.status(400).json({ error: "User not authenticated" });
}
try{
  let sql1="SELECT phnumber FROM newbankuser WHERE userID=?";
  conndb.query(sql1,[userId],(err,currPhnum)=>{
    if(err||currPhnum.length==0){
     
      return res.status(400).json({error:"cannot retreive account num"})
    

     
      
    }
    let currUserPhNum=currPhnum[0].phnumber;
     let sql="SELECT paymentId,date,description,amount,type FROM transactiondetails WHERE accnum=?";
     conndb.query(sql,[currUserPhNum],(err,result)=>{
      if(err||result.length==0){
       
        return res.status(400).json({error:"No dataa"})
      }
      return res.status(200).json(result)

     })

    

  })
}catch(err){
  console.log(err,"error and cant retrieve data")
}
 
})



module.exports = router2;