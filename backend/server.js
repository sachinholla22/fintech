const mysql=require('mysql2');

const db=mysql.createConnection({
    host:"localhost",
    user:"root",

    password:"sachinholla2001",
    database:"db_fintech"

})

db.connect((err)=>{
    if(err){
        console.log("error cannot connect",err)
    }else{
        console.log("connected successfully")
    }
})
module.exports=db;