const express = require('express');
const router8 = express.Router();
const conndb = require('./server');
const nodemailer=require('nodemailer')
require("dotenv").config();


router8.get('/getPersonaldetailsforadmin', (req, res) => {
  
    conndb.query("SELECT * FROM perso_personal_loan WHERE status='pending'",  (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results});
    });
});


router8.get('/getFinancedetailsforadmin', (req, res) => {
  
    conndb.query("SELECT * FROM financi_personal_loan WHERE status='pending'",  (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results});
    });
});


router8.get('/getFinaldetailsforadmin', (req, res) => {
  
    conndb.query("SELECT * FROM final_personal_loan WHERE status='pending'",  (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results});
    });
});

// Create transporter for sending emails
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

router8.post('/approveLoanApplication', async (req, res) => {
    let { applicationId, status, loanAmt } = req.body;

    // Validate input
  
    if ( !loanAmt) {
        return res.status(400).json({ data: false, msg: "No data amount loan Found" });
    }
    if ( !applicationId) {
        return res.status(400).json({ data: false, msg: "No application id fouind" });
    }
    if ( !status) {
        return res.status(400).json({ data: false, msg: "No status found" });
    }
console.log(loanAmt,"this is loan amt")
    loanAmt = parseFloat(loanAmt); // Ensure loanAmt is parsed as a number

    // Prepare SQL statement to get the email
    let sql2 = "SELECT email FROM perso_personal_loan WHERE id=?";

    // Get the email from the database
    conndb.query(sql2, [applicationId], async (errrs, gettingEmail) => {
        if (errrs) {
            return res.status(400).json({ data: false, msg: "Can't get email" });
        }

        // Check if we received an email
        if (gettingEmail.length === 0) {
            return res.status(404).json({ data: false, msg: "Email not found" });
        }

        let MainEmail = gettingEmail[0].email;

        // Get user ID
        let getUserId = "SELECT user_id FROM financi_personal_loan WHERE id=?";
        conndb.query(getUserId, [applicationId], (erring, getId) => {
            if (erring) {
                return res.status(500).json("Cannot get userId");
            }

            let usersId = getId[0].user_id;

            // Get initial amount for the user
            let getInitalamt = "SELECT initialamt FROM newbankuser WHERE userID=?";
            conndb.query(getInitalamt, [usersId], async (errings, getamt) => {
                if (errings) {
                    return res.status(500).json("Cannot get initial amount");
                }

                let getInitialamount = parseFloat(getamt[0].initialamt);
                let finalAmt = getInitialamount + loanAmt; // Add loan amount to initial balance

                // Prepare SQL statements for updating the application status
                const updateLoanStatusQueries = [
                    "UPDATE final_personal_loan SET status=? WHERE id=?",
                    "UPDATE financi_personal_loan SET status=? WHERE id=?",
                    "UPDATE perso_personal_loan SET status=? WHERE id=?"
                ];

                const updateBankBalanceQuery = "UPDATE newbankuser SET initialamt=? WHERE userID=?";

                try {
                    // Execute loan status updates
                    for (const sql of updateLoanStatusQueries) {
                        await new Promise((resolve, reject) => {
                            conndb.query(sql, [status, applicationId], (err, results) => {
                                if (err) {
                                    return reject(err); // Reject the promise on error
                                }
                                resolve(results); // Resolve the promise on success
                            });
                        });
                    }

                    // Update bank balance
                    await new Promise((resolve, reject) => {
                        conndb.query(updateBankBalanceQuery, [finalAmt, usersId], (err, results) => {
                            if (err) {
                                return reject(err); // Reject the promise on error
                            }
                            resolve(results); // Resolve the promise on success
                        });
                    });

                    // Email sending logic
                    let mailOptions = {
                        from: process.env.EMAIL,
                        to: MainEmail, // Use the email retrieved from the database
                        subject: "Your Application Status",
                        text: `Congratulations! Your application has been approved. A loan amount of Rs ${loanAmt} has been credited to your account. You will soon be asked for a digital signature. Please wait. Thank you for your cooperation.`,
                    };

                    // Send email
                    await transporter.sendMail(mailOptions);
                    return res.status(200).json({ message: 'Application status updated successfully and email sent.' });

                } catch (error) {
                    console.error('Error occurred:', error);
                    return res.status(500).json({ data: false, msg: "Error in the code" });
                }
            });
        });
    });
});



router8.get('/getEduPeronaldata', (req, res) => {
  
    conndb.query("SELECT * FROM edu_peronal_details WHERE status='pending'",  (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results});
    });
});
router8.get('/getEduEducationaldata', (req, res) => {
  
    conndb.query("SELECT * FROM edu_edu_details WHERE status='pending'",  (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results});
    });
});
router8.get('/getEduFinaldata', (req, res) => {
  
    conndb.query("SELECT * FROM edu_final_details WHERE status='pending'",  (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results});
    });
});



router8.post('/rejectApplicationLoan', async (req, res) => {
    let { applicationId, status } = req.body;

    // Validate input
  
 
    if ( !applicationId) {
        return res.status(400).json({ data: false, msg: "No application id fouind" });
    }
    if ( !status) {
        return res.status(400).json({ data: false, msg: "No status found" });
    }


    // Prepare SQL statement to get the email
    let sql2 = "SELECT email FROM edu_peronal_details WHERE id=?";

    // Get the email from the database
    conndb.query(sql2, [applicationId], async (errrs, gettingEmail) => {
        if (errrs) {
            return res.status(400).json({ data: false, msg: "Can't get email" });
        }

        // Check if we received an email
        if (gettingEmail.length === 0) {
            return res.status(404).json({ data: false, msg: "Email not found" });
        }

        let MainEmail = gettingEmail[0].email;

        // Get user ID
     

     // Add loan amount to initial balance

                // Prepare SQL statements for updating the application status
                const updateLoanStatusQueries = [
                    "DELETE FROM edu_peronal_details  WHERE id=?",
                    "DELETE FROM edu_edu_details  WHERE id=?",
                    "DELETE FROM edu_final_details  WHERE id=?"
                ];

              

                try {
                    // Execute loan status updates
                    for (const sql of updateLoanStatusQueries) {
                        await new Promise((resolve, reject) => {
                            conndb.query(sql, [applicationId], (err, results) => {
                                if (err) {
                                    return reject(err); // Reject the promise on error
                                }
                                resolve(results); // Resolve the promise on success
                            });
                        });
                    }

                    // Update bank balance
                  

                    // Email sending logic
                    let mailOptions = {
                        from: process.env.EMAIL,
                        to: MainEmail, // Use the email retrieved from the database
                        subject: "Your Loan Application Status",
                        text: `Sorry Your Education Loan Application has Been Rejected due due improper documents ..Please reUpload or Contact the customer-care for more information .`,
                    };

                    // Send email
                    await transporter.sendMail(mailOptions);
                    return res.status(200).json({ message: 'Application status updated successfully and email sent.' });

                } catch (error) {
                    console.error('Error occurred:', error);
                    return res.status(500).json({ data: false, msg: "Error in the code" });
                }
            });
        });
  

       
        
router8.post(' /rejectApplicationPersonalLoan', async (req, res) => {
    let { applicationId, status } = req.body;

    // Validate input
  
 
    if ( !applicationId) {
        return res.status(400).json({ data: false, msg: "No application id fouind" });
    }
    if ( !status) {
        return res.status(400).json({ data: false, msg: "No status found" });
    }


    // Prepare SQL statement to get the email
    let sql2 = "SELECT email FROM perso_peronal_loans WHERE id=?";

    // Get the email from the database
    conndb.query(sql2, [applicationId], async (errrs, gettingEmail) => {
        if (errrs) {
            return res.status(400).json({ data: false, msg: "Can't get email" });
        }

        // Check if we received an email
        if (gettingEmail.length === 0) {
            return res.status(404).json({ data: false, msg: "Email not found" });
        }

        let MainEmail = gettingEmail[0].email;

        // Get user ID
     

     // Add loan amount to initial balance

                // Prepare SQL statements for updating the application status
                const updateLoanStatusQueries = [
                    "DELETE FROM perso_personal_loan  WHERE id=?",
                    "DELETE FROM financi_personal_loan  WHERE id=?",
                    "DELETE FROM final_personal_loan WHERE id=?"
                ];

              

                try {
                    // Execute loan status updates
                    for (const sql of updateLoanStatusQueries) {
                        await new Promise((resolve, reject) => {
                            conndb.query(sql, [applicationId], (err, results) => {
                                if (err) {
                                    return reject(err); // Reject the promise on error
                                }
                                resolve(results); // Resolve the promise on success
                            });
                        });
                    }

                    // Update bank balance
                  

                    // Email sending logic
                    let mailOptions = {
                        from: process.env.EMAIL,
                        to: MainEmail, // Use the email retrieved from the database
                        subject: "Your Loan Application Status",
                        text: `Sorry Your Personal Loan Application has Been Rejected due due improper documents ..Please reUpload or Contact the customer-care for more information .`,
                    };

                    // Send email
                    await transporter.sendMail(mailOptions);
                    return res.status(200).json({ message: 'Application status deletedsuccessfully and email sent.' });

                } catch (error) {
                    console.error('Error occurred:', error);
                    return res.status(500).json({ data: false, msg: "Error in the code" });
                }
            });
        });
  
        
router8.post('/approveApplicationLoan', async (req, res) => {
    let { applicationId, status, loanAmt } = req.body;

    // Validate input
  
    if ( !loanAmt) {
        return res.status(400).json({ data: false, msg: "No data amount loan Found" });
    }
    if ( !applicationId) {
        return res.status(400).json({ data: false, msg: "No application id fouind" });
    }
    if ( !status) {
        return res.status(400).json({ data: false, msg: "No status found" });
    }
console.log(loanAmt,"this is loan amt")
    loanAmt = parseFloat(loanAmt); // Ensure loanAmt is parsed as a number

    // Prepare SQL statement to get the email
    let sql2 = "SELECT email FROM edu_peronal_details WHERE id=?";

    // Get the email from the database
    conndb.query(sql2, [applicationId], async (errrs, gettingEmail) => {
        if (errrs) {
            return res.status(400).json({ data: false, msg: "Can't get email" });
        }

        // Check if we received an email
        if (gettingEmail.length === 0) {
            return res.status(404).json({ data: false, msg: "Email not found" });
        }

        let MainEmail = gettingEmail[0].email;

        // Get user ID
        let getUserId = "SELECT user_id FROM edu_edu_details WHERE id=?";
        conndb.query(getUserId, [applicationId], (erring, getId) => {
            if (erring) {
                return res.status(500).json("Cannot get userId");
            }

            let usersId = getId[0].user_id;

            // Get initial amount for the user
            let getInitalamt = "SELECT initialamt FROM newbankuser WHERE userID=?";
            conndb.query(getInitalamt, [usersId], async (errings, getamt) => {
                if (errings) {
                    return res.status(500).json("Cannot get initial amount");
                }

                let getInitialamount = parseFloat(getamt[0].initialamt);
                let finalAmt = getInitialamount + loanAmt; // Add loan amount to initial balance

                // Prepare SQL statements for updating the application status
                const updateLoanStatusQueries = [
                    "UPDATE edu_peronal_details SET status=? WHERE id=?",
                    "UPDATE edu_edu_details SET status=? WHERE id=?",
                    "UPDATE edu_final_details SET status=? WHERE id=?"
                ];

                const updateBankBalanceQuery = "UPDATE newbankuser SET initialamt=? WHERE userID=?";

                try {
                    // Execute loan status updates
                    for (const sql of updateLoanStatusQueries) {
                        await new Promise((resolve, reject) => {
                            conndb.query(sql, [status, applicationId], (err, results) => {
                                if (err) {
                                    return reject(err); // Reject the promise on error
                                }
                                resolve(results); // Resolve the promise on success
                            });
                        });
                    }

                    // Update bank balance
                    await new Promise((resolve, reject) => {
                        conndb.query(updateBankBalanceQuery, [finalAmt, usersId], (err, results) => {
                            if (err) {
                                return reject(err); // Reject the promise on error
                            }
                            resolve(results); // Resolve the promise on success
                        });
                    });

                    // Email sending logic
                    let mailOptions = {
                        from: process.env.EMAIL,
                        to: MainEmail, // Use the email retrieved from the database
                        subject: "Your Application Status",
                        text: `Congratulations! Your Educational application has been approved. A loan amount of Rs ${loanAmt} has been credited to your account. You will soon be asked for a digital signature. Please wait. Thank you for your cooperation.`,
                    };

                    // Send email
                    await transporter.sendMail(mailOptions);
                    return res.status(200).json({ message: 'Application status updated successfully and email sent.' });

                } catch (error) {
                    console.error('Error occurred:', error);
                    return res.status(500).json({ data: false, msg: "Error in the code" });
                }
            });
        });
    });
});


module.exports=router8;