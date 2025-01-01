import "./personalLoan.css";
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import LoanApplicationProgress from "./forProgressBar";
import Step2PersonalLoan from './steps2PersonalLoan'


export default function PersonalLoan() {
    const navigate=useNavigate();
    const [forProgress,setProgress]=useState(false)
    const [step,setStep]=useState(1);
    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        
      };
      const previousStep=()=>{
        if(step>1)setStep(step-1)
      }
    let[hasSaved,setHassaved]=useState(false);
    const [hasPeronaldata,setPeronaldata]=useState(false);

    useEffect(() => {
        async function hasPeronaldata() {
            try {
                let res = await axios.get("http://localhost:3003/getPersonaldetails",{withCredentials:true});
                if (res.status == 200 && res.data.data) {
                    setPeronaldata(true);  // Existing user, data already saved
                    console.log(res, "Data found for existing user");
                } else {
                    setPeronaldata(false); // New user, no data found
                    console.log(res, "No data available for new user");
                }
            } catch (error) {
                console.error("Error while retrieving personal details:", error);
            }
        }
        hasPeronaldata();
    }, []);
    const [fname,setFname]=useState('');
    const [dob,setDOB]=useState('')
    const[gender,setGender]=useState('');
    const [marriage,setMarriage]=useState('')
    const [nationality,setNationality]=useState('')
    const [address,setAdress]=useState('');
    const [contact,setContact]=useState('')
    const [email,setEmail]=useState('');
    let [empStatus,setEmpStatus]=useState('');
let [occupation,setOccupation]=useState('');
const[experience,setExperience]=useState('');
const [income,setIncome]=useState('');

async function SavePersonal(e){
    e.preventDefault();
    setHassaved(true)
    let formdata={
        fullname:fname,
        dateofbirth:dob,
        gender:gender,
        marriage:marriage,
        nationality:nationality,
        address:address,
        contact:contact,
        email:email,
        empStatus:empStatus,
        occupation:occupation,
        experience:experience,
        income:income
    }
    const Header={
        headers:{
            'Content-type':'application/json'
        },withCredentials:true
    }
    try{
        let results=await axios.post('http://localhost:3003/sendPersonal-personal',formdata,Header)
        if(results.status==200){
            alert("Saved Personal details successfully")
        }
    }catch(err){
        console.log(err.response,"Error from catch")
    }
}
const [repay,setRepay]=useState('');
const [repaySchedule,setSchedule]=useState('');
const [referName,setRefername]=useState('');
const [relationship,setRelationship]=useState('');
const[contactInfo,setContactinfo]=useState('')
async function SubmitAll(e){
    e.preventDefault();
    const datas={
        repay,
        repaySchedule,
        referName,
        relationship,
        contactInfo

    }
    const header={
        headers:{
            "Content-type":"application/json"
        },withCredentials:true
    }
    try{
        let res=await axios.post('http://localhost:3003/sendFinalData',datas,header);
        if(res.status==200){
            alert("Data Submitted Successfully")
            navigate('/loanType')
            
        }
    }catch(err){
        console.log(err.response,"catched error while submitting")
    }

}

    return (
        <>
        <section className="sectionPeronalLoan">
            <div className="divForPeronalLoan">
          
                
                <h2>Personal Loan Application</h2>
                <LoanApplicationProgress step={step} />
                
                <hr/>
                {step==1 &&(
                <form className="personalLoanForm">
                  
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input type="text" name="fullname" onChange={(e)=>setFname(e.target.value)} placeholder="Enter your full name" />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth:</label>
                        <input type="date"onChange={(e)=>setDOB(e.target.value)} name='dateofbirth' />
                    </div>
                    <div className="form-group">
                        <label>Gender:</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="" disabled>Select gender</option> {/* Default empty option */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
                    </div>
                    <div className="form-group">
                        <label>Marital Status:</label>
                        <select value={marriage} onChange={(e) => setMarriage(e.target.value)}>
            <option value="" disabled>Select marital status</option> {/* Default empty option */}
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Divorced">Divorced</option>
        </select>
                    </div>
                    <div className="form-group">
                        <label>Nationality:</label>
                        <input type="text" name="nationality"  onChange={(e)=>setNationality(e.target.value)}placeholder="Enter your nationality" />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input type="text" name="address" onChange={(e)=>setAdress(e.target.value)}placeholder="Enter your address" />
                    </div>
                    <div className="form-group">
                        <label>Contact Information:</label>
                        <input type="text" name="contact" onChange={(e)=>setContact(e.target.value)}placeholder="Enter your phone number" />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email address" />
                    </div>
                    <div className="form-group">
                        <label>Employment Status:</label>
                        <select value={empStatus} onChange={(e) => setEmpStatus(e.target.value)}>
            <option value="" disabled>Select employment status</option> {/* Default empty option */}
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Retired">Retired</option>
        </select>
                    </div>
                    <div className="form-group">
                        <label>Occupation:</label>
                        <input type="text" name="occupation" onChange={(e)=>setOccupation(e.target.value)}placeholder="Enter your occupation" />
                    </div>
                 
                    <div className="form-group">
                        <label>Years of Employment:</label>
                        <input type="text" name="experience" onChange={(e)=>setExperience(e.target.value)}placeholder="Enter years of employment" />
                    </div>
                    <div className="form-group">
                        <label>Annual Income:</label>
                        <input type="text"name="income" onChange={(e)=>setIncome(e.target.value)} placeholder="Enter your annual income" />
                        
                    </div>
                   
                    <Button type="submit" onClick={SavePersonal} disabled={hasPeronaldata || hasSaved} className="custom-save-btn">Save</Button>
                    <Button type="submit" onClick={nextStep} className="custom-next-btn">Next</Button>
                    
                </form>
)}
          {
            
    step==2 && (
        <> 

        <Step2PersonalLoan nextStep={nextStep} previousStep={previousStep} setProgress={setProgress} />
        </>
    )
}
{
    step==3 && (
        <> 
            <form className="repaymentReferencesForm">
                {/* Repayment Details */}
                <div className="form-group">
                    <label>Preferred Repayment Method:</label>
                    <select name="repaymentMethod" onChange={(e)=>setRepay(e.target.value)} defaultValue="">
                        <option value="" disabled>Select repayment method</option>
                        <option value="bankTransfer">Bank Transfer</option>
                        <option value="autoDebit">Auto-Debit</option>
                        <option value="cheque">Cheque</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Repayment Schedule:</label>
                    <select name="repaymentSchedule" onChange={(e)=>setSchedule(e.target.value)} defaultValue="">
                        <option value="" disabled>Select repayment schedule</option>
                        <option value="monthly">Monthly</option>
                        <option value="biWeekly">Bi-Weekly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                    </select>
                </div>

                {/* References/Guarantors */}
                <div className="form-group">
                    <label>Reference Name:</label>
                    <input type="text" name="referenceName" onChange={(e)=>setRefername(e.target.value)} placeholder="Enter reference name" />
                </div>
                <div className="form-group">
                    <label>Relationship to Applicant:</label>
                    <input type="text" name="relationship" onChange={(e)=>setRelationship(e.target.value)} placeholder="Enter relationship" />
                </div>
                <div className="form-group">
                    <label>Contact Information:</label>
                    <input type="text" name="contactInformation"  onChange={(e)=>setContactinfo(e.target.value)} placeholder="Enter contact information" />
                </div>

                <Button type="button" onClick={previousStep} className="custom-lstStepprevious-btn">Previous</Button>
                <Button type="submit" onClick={SubmitAll} className="custom-lastSave-btn">Submit</Button>
            </form>
        </>
    )
}
               
            </div>
  
        </section>
        </>
    )
}
