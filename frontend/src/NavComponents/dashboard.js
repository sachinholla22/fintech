import '../dashboard.css';
import LinksofDashboard from "./linksOfdashboard.js";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import MoneyType from '../connectbank/moneyType.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


export default function Dashboard() {
  const navigate = useNavigate();
  const [sendMoneyBtn, setSendMoneyBtn] = useState(false);
  const [transaction, setTransaction] = useState(false);
  const [bills, setBills] = useState(false); // Define the state for bills
  const [currName, setName] = useState('');
const [addMoney,setAddMoney]=useState(false)
  const [addCards,setAddCards]=useState(false);

  const removeBtn = () => setSendMoneyBtn(false);
  const [hasWaterBill,setWaterBill]=useState(false);
  useEffect(()=>{
    async function getDaata(){
        try{
            let res=await axios.get("http://localhost:3003/getdetailselectricbill",{withCredentials:true});
            if(res.status==200&&res.data.hasAcc){
                console.log(res,"got result")
                setWaterBill(true)
            }
            else{
                console.log("nothing")
                setWaterBill(false)
            }
        }
        catch(err){
            console.log("cant get data",err.response)
        }
    }
    getDaata()

},[])

  const submitBtn = (e) => {
    e.preventDefault();
    setSendMoneyBtn(true);
  };

  useEffect(() => {
    const getamt = async () => {
      try {
        let res = await axios.get('http://localhost:3003/getaccname',{withCredentials:true});
        if (res.status === 200) {
          setName(res.data);
        } else {
          console.log("Can't fetch data");
        }
      } catch (err) {
        console.log(err);
      }
    };
    getamt();
  }, []);
async function GenerateWaterBill(e){
  e.preventDefault();
  let Header={
    headers:{
      "Content-type":"application/json"
    },withCredentials:true
  }
  try{
    let result=await axios.post("http://localhost:3003/generate-waterbill",Header);
    if(result.status==200){
      setBills(true, navigate('/paybills'));
      console.log("water bill created successfully")
    }

  }catch(err){
    console.log("couldnt generate the water bill",err.response)
  }
}
  const Gototransaction = (e) => {
    e.preventDefault();
    setTransaction(true, navigate('/transactionhistory'));
  };
function gotoPaybills(e){
  e.preventDefault();
  navigate('/paybills')
}
  
  const [clickedAccbalance,setClickedAccBalance]=useState(false)
  return (
<>

<Navbar expand="lg" className={`navbars-dashboard ${sendMoneyBtn || addCards||clickedAccbalance ||addMoney ? 'blur-background' : ''}`} >
      <Container>
       <h3 className='display-6 '>DashBoard</h3>
      </Container>
    </Navbar>

    
    <Navbar expand="lg" className={` navbars-dashboard-vertical`}>
   
      <Container>
      <h4 id='for-h4'>Apply Here</h4>
      <LinksofDashboard addCards={addCards} setAddCards={setAddCards} addMoney={addMoney} setAddMoney={setAddMoney} clickedAccbalance={clickedAccbalance} setClickedAccBalance={setClickedAccBalance}
      className={sendMoneyBtn || addCards||clickedAccbalance ||addMoney ? 'blur-background' : ''} />

      </Container>
      
    </Navbar>

    <div className={`for-alltransaction  ${sendMoneyBtn || addCards ||clickedAccbalance ||addMoney? 'blur-background' : ''}`}>
        <h2>Your Account</h2>
        <div className="forAccbalance">
          <Card className="card-box bg-c-white text-center">
            <Card.Header id='heading'as="h5">Savings Account </Card.Header>
          
            <Card.Body>
              <Card.Title id='title2'>Account Holder's Name</Card.Title>
              <Card.Text id="for-amount1">
            
                  <h5>{currName}</h5>
                
              </Card.Text>
              {sendMoneyBtn && <MoneyType onRemove={removeBtn} />}
              <Button variant="danger"  id="for-button1"onClick={submitBtn} className="btn-btn group">Send Money</Button>
            </Card.Body>
            </Card>
          </div>
       
        <div className="fortransaction">
          <Card className="text-center">
            <Card.Header style={{color:"rgb(28, 66, 20)"}} id='transactionheading' as="h5">View Transaction </Card.Header>
            <Card.Body>
              <Card.Title>View Details</Card.Title>
              <Card.Text id="for-amount2">
                View all transactions made by you
              </Card.Text>
              <Button variant="dark" id="for-button2" onClick={Gototransaction} className="btn-btn group">Check</Button>
            </Card.Body>
          </Card>
        </div>
      </div>

      <section className={`sections ${sendMoneyBtn || addCards||clickedAccbalance||addMoney ? 'blur-background' : ''}`}>
  <div className='containeri'>
    <div className='row'>
      <div className='col md-4  text-center'>
        
      <Card.Header  id="card-header"as="h5">Pay Utility Bills Online</Card.Header>
      <hr/>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text id="for-amount3">
              View All Bills that associated with your account
            </Card.Text>
            <Button variant="warning"  onClick={gotoPaybills}className="btn-btn group">Pay Bills</Button>
          </Card.Body>

      </div>
    </div>
  </div>

</section>
     
      
      {sendMoneyBtn && (
        <>
          <div className="modal-overlay"></div>
          <div className="for-divv">
            <MoneyType onRemove={removeBtn} />
          </div>
        </>
      )}
       <footer className={`for-footer ${sendMoneyBtn || addCards||clickedAccbalance||addMoney ? 'blur-background' : ''}`}>
        &copy;2024 Service Rights
    </footer>


    </>
  
  )}  