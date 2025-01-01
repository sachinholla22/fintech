import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './forbankdetails.css';
import { useAuth0 } from '@auth0/auth0-react'; 

export default function BankDetails() {
  const [currAcc, setAcc] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credentials, setCredentials] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const[Accerror,setAccError]=useState('');
const [UnameError,setUnameError]=useState('');
const [passError,setPassError]=useState('');

const[addbtnclicked,setAddbtnclicked]=useState(false);
function Testing(e){
  e.preventDefault();
  setAddbtnclicked(true);


}

const {isAuthenticated}=useAuth0()
useEffect(()=>{
if(isAuthenticated){
  setIsLoggedIn(true);
}
},[isAuthenticated])


  async function handleSubmit(e) {
    e.preventDefault();
    const userDetails = { username, password, accountNum: accountNumber };
    const Header={
      headers:{
        'Content-type':'application/json'
      },
      withCredentials: true
    }

    try {
      const response = await axios.post("http://localhost:3003/existinguserscheck", userDetails,  Header );
      if (response.status === 200) {
        if(!response.data.credentials){
          setAccError('');
          setUnameError('');
          setPassError('')
          if (!response.data.isAccountNumberValid) {
            setAccError('Account number does not match.');
          }
          if (!response.data.isUsernameValid) {
            setUnameError('Username does not match.');
          }
          if (!response.data.isPasswordValid) {
            setPassError('Password does not match.');
          }
        }else
{        localStorage.setItem("accountNum", accountNumber);
        alert("Details submitted successfully.");
        navigate('/dashboard');
      } 
    }else {
        alert("Failed to submit details.");
      }
    } catch (err) {
      console.log("Error occurred while submitting details:", err);
      alert("Error occurred while submitting details.");
    }
  }

  function goBack(e) {
    e.preventDefault();
    navigate('/');
  }


   

  return (
    <div id='to-background'>
      <div className="outsidebox">
        {isLoggedIn ? (
          <>
            <div id='background-heading'>
              <h2 id="for-heading">Enter Your Details</h2>
            </div>
            <div className="for-bankdetails">
              <form onSubmit={handleSubmit}>
                <label id='for-accnum'>Enter Account Number</label>
                <input
                  id='for-input1'
                  type="text"
                  name="accountNum"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
        {Accerror && <span className='forErrors'>{Accerror}</span> }
                <label id='for-name'>User Name</label>
                <input
                  id='for-input2'
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {UnameError  && <span className='forErrors'>{UnameError}</span> }
                <label id='for-pass'>Password</label>
                <input
                  id='for-input3'
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                 {passError  && <span className='forErrors'>{passError}</span> }
                {!currAcc && (
                  <Link style={{ position: "relative", left: "70%", top: "-5px" }} to="/newbank">
                    New User?
                  </Link>
                )}
                {currAcc && (
                  <p id='for-note'><strong style={{ color: "red" }}>Note:</strong> You already have an existing bank account. Please use your existing account details.</p>
                )}
             <Button variant="info" className='bank-details-btn' type="submit">
  Submit
</Button>

              </form>
            </div>
          </>
        ) : (
          <div className="loading">Loading...</div>
        )}
    <Button variant="danger" className='back-btn' onClick={goBack}>
  Go Back
</Button>


      </div>
    </div>
  );
}
