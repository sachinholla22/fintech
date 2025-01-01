import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import './mobilemoney.css'

export default function MobileTransfer(){
let navigate=useNavigate();
    const [forContact,setContact]=useState('')
    const[amount,setAmount]=useState('');
    let [err,setErr]=useState(null)
    const [paymentId,setPaymentid]=useState('')

    const generatePaymentIdNumber = () => {
      const min = 1000000000; // Minimum 10-digit number
      const max = 9999999999;
  
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      setPaymentid( randomNumber.toString()); // Generate a random 10-digit number
    };
    
    useEffect(()=>{
      
      generatePaymentIdNumber();
    },[])
    async function Onsubmit(e){
        e.preventDefault();
        setErr(null)
        const daata={
            contact:forContact,
            amount:amount,
            paymentId
        }
        const header={
            headers:{
                "Content-type":"application/json"
            },withCredentials:true
        }
        try{
        let result=await axios.post("http://localhost:3003/PHONETRANSFER",daata,header);
        console.log(result)
        if(result.status==200){
         alert("money sent successfullly")
         navigate('/dashboard')
        }
        else if(result.status==500){
          alert("Cannot send money try again later")
          navigate('/dashboard')

        }
        else if(result.status==404){
          alert("no resource")
        }
        }
        catch(err){
            console.log("error on sending data to backend",err)
            if (err.response && err.response.data && err.response.data.error) {
              setErr(err.response.data.error); // Set error message from server
            } else {
              setErr("An error occurred. Please try again."); // Generic error message
            }
        }

        
    }
    return(
        <>
        <div className="for-box">
          <div className="inside-box text-center">
            <div className="row">
         
              <h3>Pay Securely Using Mobile Number</h3>
              <hr/>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="foralllabel">Enter Receivers Mobile Number</Form.Label>
        <Form.Control value={forContact}onChange={(e)=>setContact(e.target.value)}type="text" name="contact" />
     
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="foralllabel2"> Enter a Amount</Form.Label>
        <Form.Control onChange={(e)=>setAmount(e.target.value)}type="text"value={amount}name="amount"/>
      </Form.Group>
     
      <Button onClick={Onsubmit}variant="dark" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </div>
    </div>
 
        </>
    )
}