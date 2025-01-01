import {useState,useEffect} from 'react';
import axios from 'axios'

export default function DisplayCreditCard(){

    const [getData,setData]=useState([]);
    useEffect(()=>{
     async  function getData(){
        try{
            let res=await axios.get("http://localhost:3003/gettingcreditdata",{withCredentials:true});
            if(res.status==200){
                if(!Array.isArray(res.data)){
                    console.log("not in array from")
                }
                setData(res.data)
            }
        }
       
        catch(error){
        console.log(error,"catched error")
        }
     }
     getData()
    },[])

    return(
        <>
       <h2>Credit Card Details</h2>
      <table>
        <thead>
          <tr>
            <th>Credit Card Number</th>
            <th>Card Type</th>
            <th>Expire Date</th>
            <th>CCV Number</th>
            <th>Card Limit</th>
            <th>Available Credit</th>
            <th>Issuance Date</th>
            <th>Billing Cycle Start</th>
            <th>Billing Cycle End</th>
            <th>Created On</th>
         
           
          </tr>
        </thead>
        <tbody>
            {getData.map((users)=>(
            <tr key={users.userId}>
                <td>{users.credit_card_number}</td>
                <td>{users.card_type}</td>
                <td>{users.expiry_date}</td>
                <td>{users.cvv}</td>
                <td>{users.credit_limit}</td>
                <td>{users.available_credit}</td>
                <td>{users.issuance_date}</td>
                <td>{users.billing_cycle_start}</td>
                <td>{users.billing_cycle_endr}</td>
                <td>{users.created_at}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </>
    )
}