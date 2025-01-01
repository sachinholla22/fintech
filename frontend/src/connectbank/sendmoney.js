import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import './sendmoney.css'

export default function SendMoney() {
  const [currAcc, setAcc] = useState("");
  const [currContact, setContact] = useState("");
  const [currAmt, setAmt] = useState("");
  const [data, setData] = useState(false);
  const [error, setError] = useState(null);
  const [paymentId,setPaymentid]=useState('')
 const navigate=useNavigate();
 
  const generatePaymentIdNumber = () => {
    const min = 1000000000; // Minimum 10-digit number
    const max = 9999999999;

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setPaymentid( randomNumber.toString()); // Generate a random 10-digit number
  };
  
  useEffect(()=>{
    
    generatePaymentIdNumber();
  },[])

  useEffect(() => {
    async function CheckData() {
      try {
        let res = await axios.get("http://localhost:3003/checkmoney",{withCredentials:true});
        if (res.status === 200) {
          setData(true);
        } else {
          setData(false);
        }
      } catch (err) {
        console.log("Error occurred:", err);
      }
    }
    CheckData();
  }, []);

  async function sendData(e) {
    e.preventDefault();
    setError(null); // Reset the error state
   
    let Data = {
      
      accnum: currAcc,
      contact: currContact,
      amount: currAmt,
      paymentId
    };
    const Headers = {
      headers: {
        "Content-type": "application/json"
      },withCredentials:true
    };
    try {
      let res = await axios.post("http://localhost:3003/sendmoney", Data, Headers);
      console.log(res);
      if (res.status === 200) {
        alert("Details submitted successfully.");
        navigate('/dashboard')
      } else {
        alert("Invalid details. Please check.");
      }
    } catch (err) {
      console.error("Error sending money:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Set error message from server
      } else {
        setError("An error occurred. Please try again."); // Generic error message
      }
    }
  }

  return (
    <>
    <section className="forAllBackgroundofthissection">
      <div className="for-boxes">
          <div className="inside-boxes text-center">
            <div className="row">
      <h3>Provide the Details of the Receiver's Bank to Send Money</h3>
      <hr/>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicAccnum">
          <Form.Label className="for-labels">Account Number</Form.Label>
          <Form.Control 
            type="text" 
            onChange={(e) => setAcc(e.target.value)} 
            value={currAcc} 
            name="accnum" 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContact">
          <Form.Label className="for-labels">Contact Number</Form.Label>
          <Form.Control 
            type="text" 
            onChange={(e) => setContact(e.target.value)} 
            value={currContact} 
            name="contact" 
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAmount">
          <Form.Label id='forsinglelabel'>Enter Amount</Form.Label>
          <Form.Control 
            type="text" 
            onChange={(e) => setAmt(e.target.value)} 
            value={currAmt} 
            name="amount" 
          />
        </Form.Group>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button onClick={sendData} variant="success" type="submit">
          Submit
        </Button>
      </Form>
      </div>
      </div>
      </div>
      </section>
    </>
  );
}
