import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './newbankuser.css';
import ValidateNewBankUser from './ValidateNewBankUser';

export default function NewUsersBank() {
  const [name, setname] = useState('');
  const [dob, setdob] = useState('');
  const [city, setcity] = useState('');
  const [pincode, setpincode] = useState('');
  const [phnumber, setphnumber] = useState('');
  const [email, setemail] = useState('');
  const [aadhar, setaadhar] = useState('');
  const [gender, setgender] = useState('');
  const [initialAmt, setinitialAmt] = useState('');
  const[firstPin,set1stPin]=useState('')
  const [pin, setPin] = useState('');
  const [username, setusername] = useState('');
  const [firstPassword,setFirstPassword]=useState('')
  const [password, setpassword] = useState('');
  const [accNum, setaccNum] = useState("");

  useEffect(() => {
    generateAccountNumber();
  }, []);

  const generateAccountNumber = () => {
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number
    const res = Math.floor(Math.random() * (max - min + 1)) + min; 
    setaccNum(res.toString()); // Generate a random 8-digit number
  };

  const navigate = useNavigate();
const[error,setError]=useState('')


  async function SendData(e) {
    e.preventDefault();
const {errors,isValid}=ValidateNewBankUser({name,dob,city,pincode,phnumber,email,aadhar,gender,initialAmt,firstPin,pin,username,firstPassword,password})
setError(errors);
if(isValid){
const newUserData = {
      name,
      dob,
      city,
      pincode,
      phnumber,
      email,
      aadhar,
      gender,
      initialamt: initialAmt,
      pin,
      username,
      password,
      accNum
    };

    const Headers = {
      headers: {
        "Content-type": "application/json"
      },
      withCredentials: true
    };

    try {
      const data = await axios.post("http://localhost:3003/storenewuser", newUserData, Headers);
      if (data.status === 200) {
        navigate("/bankdetails");
        alert("You have Successfully created a regiration and Detailed Email has been sent")
      }
    } catch (err) {
      console.log("error ,", err);
    }
  }
  }

  return (
    <section className="mySection">
      <div className="bigbox">
        <div className="form-container">
          <h2 style={{color:"brown"}}>Personal Details</h2>
          <hr/>
          <Form onSubmit={SendData}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setname(e.target.value)} 
                name="fullname" 
                placeholder="Enter your full name" 
              />
              {error && <span className='forErrorMsg'>{error.name}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDOB">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control 
                type="date" 
                onChange={(e) => setdob(e.target.value)} 
                name="dob" 
              />
                 {error && <span className='forErrorMsg'>{error.dob}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>City</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setcity(e.target.value)} 
                name="city" 
                placeholder="Enter your city" 
              />
                 {error && <span className='forErrorMsg'>{error.city}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPincode">
              <Form.Label>Pin Code</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setpincode(e.target.value)} 
                name="pincode" 
                placeholder="Enter your pin code" 
              />
                 {error && <span className='forErrorMsg'>{error.pincode}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setphnumber(e.target.value)} 
                name="phnumber" 
                placeholder="Enter your phone number" 
              />
                 {error && <span className='forErrorMsg'>{error.phnumber}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                onChange={(e) => setemail(e.target.value)} 
                name="email" 
                
                placeholder="Enter your email" 
              />
                 {error && <span className='forErrorMsg'>{error.email}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAadhar">
              <Form.Label>Aadhar Card Number</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setaadhar(e.target.value)} 
                name="aadhar" 
                placeholder="Enter your Aadhar card number" 
              />
                 {error && <span className='forErrorMsg'>{error.aadhar}</span>}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Gender</Form.Label>
              <div className="gender-options">
                <Form.Check 
                  type="radio" 
                  onChange={(e) => setgender(e.target.value)} 
                  name="gender" 
                  label="Male" 
                  value="male" 
                />
                <Form.Check 
                  type="radio" 
                  name="gender" 
                  onChange={(e) => setgender(e.target.value)}  
                  label="Female" 
                  value="female" 
                />
                <Form.Check 
                  type="radio" 
                  name="gender" 
                  onChange={(e) => setgender(e.target.value)} 
                  label="Others" 
                  value="others" 
                />
              </div>
              {error && <span>{error.gender}</span>}
            </Form.Group>

            <h2 style={{color:"brown"}}>Bank Details</h2>
            <hr/>

            <Form.Group className="mb-3" controlId="formBasicInitialAmt">
              <Form.Label>Initial Deposit Amount</Form.Label>
              <Form.Control 
                type="text" 
                name="initialAmt"  
                onChange={(e) => setinitialAmt(e.target.value)} 
                placeholder="Minimum Rs 2000" 
              />
                 {error && <span className='forErrorMsg'>{error.initialAmt}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPin">
              <Form.Label>Set 4 Digit Pin</Form.Label>
              <Form.Control 
                type="password" 
                onChange={(e) => set1stPin(e.target.value)}  
                name="1stpin"  
              />
                 {error && <span className='forErrorMsg'>{error.firstPin}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPin">
              <Form.Label>Re-Enter the 4 Digit Pin</Form.Label>
              <Form.Control 
                type="password" 
                onChange={(e) => setPin(e.target.value)}  
                name="pin"  
              />
                 {error && <span className='forErrorMsg'>{error.pin}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                onChange={(e) => setusername(e.target.value)}  
                name="username"  
              />
                 {error && <span className='forErrorMsg'>{error.username}</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label> Enter a Password</Form.Label>
              <Form.Control 
                type="password" 
                onChange={(e) => setFirstPassword(e.target.value)}  
                name="firstpassword" 
              />
                 {error && <span className='forErrorMsg'>{error.firstPassword}</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Re-Enter Password</Form.Label>
              <Form.Control 
                type="password" 
                onChange={(e) => setpassword(e.target.value)}  
                name="password" 
              />
                 {error && <span className='forErrorMsg'>{error.password}</span>}
            </Form.Group>

            <p className="info-text">An Account Number will be Generated when you successfully upload details and Submit</p>

            <Button variant="primary" className='btn-control w-100' type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
}
