import { Link, useNavigate } from "react-router-dom";
import axios from'axios'
import Form from 'react-bootstrap/Form';
import '../linksofdarshboard.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function LinksofDashboard({ addCards, setAddCards,clickedAccbalance, setClickedAccBalance,addMoney,setAddMoney,className}) {
  const navigate = useNavigate();
  const [forCards, setCards] = useState(false);
  const [pinnumber,setpinnumber]=useState(false);
  const [currbalancedisplay, setCurbalanceDisplay]=useState(false);
  const [amt,setnewAmt]=useState('');
  const [success,setPaymentSuccess]=useState(false);
  let [err,setErr]=useState('')
  
  async function Addmoney(e){
    e.preventDefault()
    try{
 const formData={
  pinNumber:pinnumber,
  newamt:amt
 }
 const header={
  headers:{
    'Content-type':"application/json"


  },withCredentials:true
 
 }
 let res=await axios.post("http://localhost:3003/send-amt",formData,header);
 if(res.status==200){
  setPaymentSuccess(true)
  setAddMoney(true)
  setClickAddamt(false)
  
  console.log('got amount',res)
 }else{
  alert('invalid Pin')
  console.log("data error in pin")
setErr('something went wrong')
 }}
 catch(err){
  console.log("error from backendn",err.response)
  setErr('occured an error',err);
  alert('Invalid pin number, please try again later');
 }

  }
  async function submitPinnum(e) {
    e.preventDefault();
    const formData = {
      pinNumber: pinnumber,
    };
    const headers = {
      headers:{
      'Content-Type': 'application/json'
      },withCredentials:true
    };
  
    try {
      const res = await axios.post('http://localhost:3003/get-pinnum', formData,  headers );
      if (res.status === 200) {
        setCurbalanceDisplay(res.data);
        console.log('got amount', res);
      } else {
        alert('Incorrect Pin Number, Please Try Again');
        setCurbalanceDisplay('');
        console.log('data error in pin');
      }
    } catch (error) {
      console.error('Error submitting pin number:', error);
      alert('Invalid pin number, please try again later');
    }
  }


  function gotToCreditCard(e) {
    e.preventDefault();
    navigate('/creditcard');
  }

  function gotToDebitCard(e) {
    e.preventDefault();
    navigate('/fordebitcard');
  }

function goback(e){
  e.preventDefault();
  setClickedaAccBalance(false)
  setCurbalanceDisplay('')
  setClickedAccBalance(false)
  setClickAddamt(false)
  setAddMoney(false)
  setPaymentSuccess(false)

}
  function forCard(e) {
    e.preventDefault();
    setAddCards(true);
    setCards(true);
  }

  function onRemove() {
    setAddCards(false);
    setCards(false);
  }
  const [clickAddamt,setClickAddamt]=useState(false)
  function clickAddAmt(){
    setClickAddamt(true)
    setAddMoney(true)
  }

  const [clickedaAccbalance,setClickedaAccBalance]=useState(false)
  function clickedAccBalance(){
    setClickedaAccBalance(true)
    setClickedAccBalance(true)
  }
  function GotoLoan(e){
    e.preventDefault();
    navigate('/loantype')

  }
  
  return (
    <>
      {forCards && (
        <>
          <div className={`forbackgroundofcards ${forCards ? '':'model-overlay'} `}>
          <p onClick={onRemove}>Back</p>
            <div className="boxforcards text-center">
            
              <h5>Which Card you would like to add?</h5>
              <br />
              <Button onClick={gotToCreditCard} variant="success" type="submit">Credit Card</Button>
              <Button onClick={gotToDebitCard} variant='warning' type="submit">Debit Card</Button>
           
            </div>
          </div>
          <div className="modal-overlay"></div>
        </>
      )}
  
      <div className={`dashboard-links-container ${className}`}>
        <Link to='/forcards' onClick={forCard} id="forcards">Add Credit or Debit Cards</Link>
        <Link to='/forLoan' id="forloan" onClick={GotoLoan}>Apply Loan</Link>
        <Link onClick={clickAddAmt} id="foraddmoney">Add Money</Link>
        <Link onClick={clickedAccBalance} id="for-checkbalance">Check Account Balance</Link>
      </div>
  
      {clickAddamt && (
        <>
          <div className={`for-balancecheck`}>
            <div className="actasaboxes text-center">
              <p className="back-button" onClick={goback}>Back</p>
              <h6>Enter your 4 Digit Pin</h6>
              <Form onSubmit={Addmoney}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" onChange={(e) => setpinnumber(e.target.value)} name="pinNumber" />
                </Form.Group>
                <h6>Enter the Amount</h6>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="text" onChange={(e) => setnewAmt(e.target.value)} name="newamt" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                {err && <p style={{ color: 'red' }}>{err}</p>}
              </Form>
            </div>
          </div>
          <div className="modal-overlay"></div>
        </>
      )}
  
      {success && (
        <>
          <div className="modal-overlay"></div>
          <div className={`payment-success-modal ${success ?'':'model-overlay'}`}>
            <div className="decorative-div">
              Payment Successful
            </div>
            <h5>Your payment was processed successfully.</h5>
            <Button variant="warning" onClick={goback}>
              Back
            </Button>
          </div>
        </>
      )}
  
      {clickedaAccbalance && (
        <>
          <div className={`forbalancecheck ${clickedAccBalance ? '':'model-overlay'}`}>
            <div className="actasabox text-center">
              <p className="back-button" onClick={goback}>Back</p>
              <h5>Enter your 4 Digit Pin</h5>
              <br />
              <Form onSubmit={submitPinnum}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" onChange={(e) => setpinnumber(e.target.value)} name="pinNumber" />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
            </div>
          </div>
          <div className="modal-overlay"></div>
        </>
      )}
  
      {currbalancedisplay && (
        <>
          <div className={`forbalancecheckers text-center ${currbalancedisplay ? '': 'model-overlay'}`}>
        
              <p className="back-button" onClick={goback}>Back</p>
              <h5>Your Account Balance</h5>
              <h3>Rs. {Number(currbalancedisplay.initialamt).toLocaleString('en-IN')}.00</h3>


            </div>
        
          <div className="modal-overlay"></div>
        </>
      )}
    </>
  );}