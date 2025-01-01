const conn = require('./server'); // Ensure this path is correct
const multer=require('multer')
const express = require('express');
const router7 = express.Router();
const path =require('path');


router7.post('/sendPersonal-personal',(req,res)=>{
    let userId=req.session.user.id;
    if(!userId){
        return res.status(500).json({data:false,error:"No user Id"})
    }
    let {fullname,dateofbirth,gender,marriage,nationality,address,contact,email,empStatus,occupation,experience,income}=req.body;
    if(!fullname||!dateofbirth||!nationality||!address||!contact||!email||!occupation||!experience||!income){
        return res.status(500).json("error  from frontend no received data")
    }
    if(!gender||!marriage||!empStatus){
        return res.status(500).json("error  from error in enum no received data")
    }
    let sql="INSERT INTO perso_personal_loan(userId,fullname,dateofbirth,gender,marital_status,nationality,address,contact,email,employment_status,occupation,years_of_employment,annual_income) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ";
    conn.query(sql,[userId,fullname,dateofbirth,gender,marriage,nationality,address,contact,email,empStatus,occupation,experience,income],(error,result)=>{
        if(error){
            return res.status(500).json({data:false,error:"cant insert data"})
        }
        return res.status(200).json({data:result[0]})
    })

})
router7.get('/getPersonaldetails', (req, res) => {
    let userId = req.session.user.id;
    conn.query("SELECT * FROM perso_personal_loan WHERE userId = ?", [userId], (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results[0]});
    });
});
let storage1=multer.diskStorage({
    destination:function(req,file,cb){
        let uploadsPath=path.join(__dirname,'uploads2');
       
        cb(null,uploadsPath)

    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});
let upload=multer({storage:storage1});
router7.post("/sendFinancialdetails", upload.fields([
    { name: 'bankStatements', maxCount: 1 }, 
    { name: 'taxReturns', maxCount: 1 }
]),(req,res)=>{
    let userId=req.session.user.id;
    let {loanAmount,loanPurpose,loanTenure,interestRate,emi,creditScore}=req.body;
    let bankStatements=req.files.bankStatements ?req.files.bankStatements[0].filename:null;
    let taxReturns=req.files.taxReturns? req.files.taxReturns[0].filename:null;
if(!loanTenure||!interestRate||!emi){
    return res.status(500).json({msg:"didnt receive data"})
}
    let sql2="INSERT INTO financi_personal_loan (user_id,loan_amount,loan_purpose,loan_tenure,interest_rate,emi,credit_score,bank_statements,tax_returns) VALUES(?,?,?,?,?,?,?,?,?)";
    conn.query(sql2,[userId,loanAmount,loanPurpose,loanTenure,interestRate,emi,creditScore,bankStatements,taxReturns],(errors,result)=>{
        if(errors){
            return res.status(500).json({data:false,msg:"error from backend"})
        }
        if(result.length==0){
            return res.status(200).json({data:false,msg:"No data available"})
        }
        return res.status(200).json({data:result[0]})
    })


    
})

router7.get('/getFinancialdetails', (req, res) => {
    let userId = req.session.user.id;
    conn.query("SELECT * FROM financi_personal_loan WHERE user_id = ?", [userId], (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results[0]});
    });
});

router7.post('/sendFinalData',(req,res)=>{
    let userId=req.session.user.id;
    let {repay,repaySchedule,referName,relationship,contactInfo}=req.body;
    if(!repay||!repaySchedule||!referName||!relationship||!contactInfo){
        return res.status(500).json({data: false, msg: "didnt receive from frontend"});
    }
    let sql="INSERT INTO final_personal_loan (userId,repay_method,repay_schedule,reference_name,relationship_to_applicant,contact_info)VALUES(?,?,?,?,?,?)";
    conn.query(sql,[userId,repay,repaySchedule,referName,relationship,contactInfo],(err,results)=>{
        if(err){
            return res.status(500).json({data: false, msg: "data not inserted"});
        }
        return res.status(200).json({data: results[0]});
    })
})
router7.get('/getPersonalloan', (req, res) => {
    let userId = req.session.user.id;
    conn.query("SELECT * FROM final_personal_loan WHERE user_id = ?", [userId], (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results[0]});
    });
});
router7.post('/postpersonalEducationaldetails',(req,res)=>{
    let userId=req.session.user.id;
    let {fname,dob,gender,marriage,nationality,address,contact,email,parentName,parentOccupation,parentAnnuallIncome,contactParent}=req.body;
    if(!fname||!nationality||!address||!contact||!email||!parentName||!parentOccupation||!parentAnnuallIncome||!contactParent){
        return res.status(500).json("Data not received corrrectly from frontend")
    }
    if(!dob||!gender||!marriage){
        return res.status(500).json("no gender,dob,maariage")
    }
    let sql="INSERT INTO edu_peronal_details (userId,full_name,date_of_birth,gender,marital_status,nationality,address,contact_information,email,parent_name,parent_occupation,parent_annual_income,parent_contact_information,status)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,'pending')"
    conn.query(sql,[userId,fname,dob,gender,marriage,nationality,address,contact,email,parentName,parentOccupation,parentAnnuallIncome,contactParent],(errors,result)=>{
        if(errors){
            return res.status(500).json({data:false,msg:"error from backend"})
        }
        if(result.length==0){
            return res.status(200).json({data:false,msg:"No data available"})
        }
        return res.status(200).json({data:result[0]})
    })
})
router7.get('/getPersonal-educational-details', (req, res) => {
    let userId = req.session.user.id;
    conn.query("SELECT * FROM edu_peronal_details WHERE userId= ? ", [userId], (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results[0]});
    });
});



let storage2=multer.diskStorage({
    destination:function(req,file,cb){
        let uploadsPath=path.join(__dirname,'uploads3');
       
        cb(null,uploadsPath)

    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});

let upload2=multer({storage:storage2});
router7.post('/sendEducationaldatas',upload2.fields([
    { name: 'sslc', maxCount: 1 }, 
    { name: 'markscard', maxCount: 1 }
]),(req,res)=>{
    let userId=req.session.user.id;
    let {institutionName,courseName,courseDuration,currentYear,graduationDate,marksCardDescription}=req.body;
    let sslc=req.files.sslc?  req.files.sslc[0].filename:null;
    let markscard=req.files.markscard? req.files.markscard[0].filename:null;
    if(!sslc||!markscard){
        return res.status(500).json({data: false, msg: "didnt receive files"});
    }
    if(!institutionName||!courseName||!courseDuration||!currentYear||!graduationDate||!marksCardDescription){
        return res.status(500).json({data: false, msg: "didnt receive written data"});
    }
    
    let sql="INSERT INTO edu_edu_details (user_id,institution_name,course_name,course_duration,current_year_of_study,expected_graduation_date,sslc_marks_card,previous_study_marks_card,marks_card_description,status)VALUES(?,?,?,?,?,?,?,?,?,'pending')"
    conn.query(sql,[userId,institutionName,courseName,courseDuration,currentYear,graduationDate,sslc,markscard,marksCardDescription],(errors,result)=>{
        if(errors){
            return res.status(500).json({data:false,msg:"error from backend"})
        }
        if(result.length==0){
            return res.status(200).json({data:false,msg:"No data available"})
        }
        return res.status(200).json({data:result[0]})
    })
})


let storage3=multer.diskStorage({
    destination:function(req,file,cb){
        let uploadsPath=path.join(__dirname,'uploads4');
       
        cb(null,uploadsPath)

    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
    }
});

let upload3=multer({storage:storage3});
router7.post('/postEducationalLoanDetails',upload3.single('estimation'),(req,res)=>{
    let userId=req.session.user.id;
  let {tuitionFee,otherExpenses,totalLoan,tenure,interestRate,emi}=req.body;
    let estimation=req.file?  req.file.filename:null;
    
   
    
    let sql="INSERT INTO edu_final_details (userId,tuitionFee,otherExpenses,totalLoan,tenure,interestRate,emi,estimation)VALUES(?,?,?,?,?,?,?,?)"
    conn.query(sql,[userId,tuitionFee,otherExpenses,totalLoan,tenure,interestRate,emi,estimation],(errors,result)=>{
        if(errors){
            return res.status(500).json({data:false,msg:"error from backend"})
        }
        if(result.length==0){
            return res.status(200).json({data:false,msg:"No data available"})
        }
        return res.status(200).json({data:result[0]})
    })
})



router7.get('/getfinaldetails', (req, res) => {
    let userId = req.session.user.id;
    conn.query("SELECT * FROM edu_final_details WHERE userId= ?", [userId], (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results[0]});
    });
});


router7.get('/getEducationalDatas', (req, res) => {
    let userId = req.session.user.id;
    conn.query("SELECT * FROM edu_edu_details WHERE user_id= ?", [userId], (error, results) => {
        if (error) {
            return res.status(500).json({data: false, msg: "Server error"});
        }
        if (results.length == 0) {
            // No data found, indicating a new user
            return res.status(200).json({data: false, msg: "No data available"});
        }
        // Data found, indicating an existing user
        return res.status(200).json({data: results[0]});
    });
});
module.exports=router7
