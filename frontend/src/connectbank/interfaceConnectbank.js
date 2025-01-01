import "./bankconnect.css"
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import BankDetails from './bankdetails.js'


export default  function BankConnect(){
    let navigate=useNavigate();
    let [options,setOptions]=useState('');
    function OnSubmit(e){
     e.preventDefault();
     setOptions(e.target.value)
     navigate('/bankdetails');


    }
    return(
        <>
        <div className="background-bankconnect">
            <div className="for-content">
                <h2>Connect to :</h2>
        <Form.Select id="forbootstrap" size="lg">
        <option value="savings">Savings Bank</option>
        <option>Commercial Bank</option>
        <option> NRI</option>
      </Form.Select>

      <br />
      { options ==="savings" && <BankDetails />}
      <button onClick={OnSubmit} type="submit" className="btn-connect">Submit</button>
      </div>
        </div>

        </>
    )
}