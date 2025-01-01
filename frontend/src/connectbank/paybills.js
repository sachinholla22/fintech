import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import './paybill.css'
import electricity from '../electricity_bill.jpg'
import water from '../water_bill.jpg'
import recharge from '../recharges.jpg'

export default function PayBills(){
    let Navigate=useNavigate()

    const [electric,setElectric]=useState(false)
useEffect(()=>{
    async function getDaata(){
        try{
            let res=await axios.get("http://localhost:3003/getdetailselectricbill",{withCredentials:true});
            if(res.status==200&&res.data.hasAcc){
                console.log(res,"got result")
                setElectric(true)
            }
            else{
                console.log("nothing")
                setElectric(false)
            }
        }
        catch(err){
            console.log("cant get data",err)
        }
    }
    getDaata()

},[])
    async function SubmitforElectric(e){
        e.preventDefault()
        const Header={
            headers:{
                'Content-type':'application/json'

            },withCredentials:true
        }
    let res=await axios.post("http://localhost:3003/postelectricitybilldata",Header)
    console.log(res);
    if(res.status==200){
        console.log("data sent to backend");
        Navigate('/payelectricbill')
    }
    }
    function goToPay(e){
        e.preventDefault();
        Navigate('/payelectricbill')

    }
    function goToPayWaterBill(e){
      e.preventDefault();
      Navigate('/gotowaterbill')
    }
  
    function goToPayRecharge(e){
      e.preventDefault();
      Navigate('/gotorecharge')
    }

    return(
        <>
        <div className='forWholeSection'>
       <section className='apply-css'>
        <div className='myDesign'>
            <h2 >Pay Your Bills</h2>
        <div className="biggestContainer text-center">
          
            <div className="row">
                <div className="col md-4">

             
          
       <Card style={{ width: '18rem' }}>
       <Card.Img variant="top" src={electricity} />
      <Card.Body>
        <Card.Title>Pay Electricity Bill</Card.Title>
        <Card.Text>
         View Your Bill
        </Card.Text>
      { !electric &&( <Button onClick={SubmitforElectric}variant="primary">Pay</Button>)}
      {electric && (<Button onClick={goToPay}variant="success">Pay</Button>)}
      </Card.Body>
    </Card>
    
    </div>
    <div className="col md-4">   
         <Card style={{ width: '18rem' }}>
         <Card.Img variant="top" src={water} />
   
   <Card.Body>
     <Card.Title>Pay Water Bill</Card.Title>
     <Card.Text>
      View Your Bill
     </Card.Text>
 <Button onClick={goToPayWaterBill}variant="info">Pay</Button>
   </Card.Body>
 </Card>
 </div>
 <div className="col md-4"> 
  <Card style={{ width: '18rem' }}>
    <Card.Img 
      variant="top" 
      src={recharge} 
      style={{ width: '100%', height: '160px', objectFit: 'cover' }} // Adjust height as needed
    />
    <Card.Body>
      <Card.Title>Recharge Mobile</Card.Title>
      <Card.Text>
        View Plans
      </Card.Text>
      
        <Button onClick={goToPayRecharge} variant="primary">Pay</Button>
     
    
      
    </Card.Body>
  </Card>
</div>

</div>
</div>
</div>
</section>
</div>
       
         
           </>
    )
}
