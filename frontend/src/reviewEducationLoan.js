import {useState,useEffect} from 'react'
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import './reviewEducationalloan.css'

export default function ReviewEducationLoan(){
const Navigate=useNavigate()
    const [persoData,setPersoData]=useState('')
    const [step,setStep]=useState(1);
    function NxtStep(){
        if(step<4){
            setStep(prevStep=>prevStep+1)
        }

    }
    function Back(e){
        e.preventDefault();
        Navigate('/loanApplications')
    }
    function PrevStep(){
        if(step>1){
            setStep(prev=>prev-1)
        }
    }
    useEffect(()=>{
        async function GetPersodata(){
            try{
                let res=await axios.get('http://localhost:3003/getEduPeronaldata')
                if(res.status==200 && res.data.data){
                    setPersoData(res.data.data);

                }
            }
            catch(err){
                console.log(err,"catched error for personal details")
            }
        }
        console.log(step)
        GetPersodata();
       
    },[])
const [educationalData,setEducationalData]=useState([])
    useEffect(()=>{
        async function GetEducationaldata(){
            try{
                let res=await axios.get('http://localhost:3003/getEduEducationaldata')
                if(res.status==200 && res.data.data){
                    setEducationalData(res.data.data);

                }
            }
            catch(err){
                console.log(err,"catched error for educational details")
            }
        }
        if(step>=2){
            console.log(step)
        GetEducationaldata();
        }
       
    },[step])
    const [finalData,setFinalData]=useState([])
    useEffect(()=>{
        async function GetFinaldata(){
            try{
                let res=await axios.get('http://localhost:3003/getEduFinaldata')
                if(res.status==200 && res.data.data){
                    setFinalData(res.data.data);

                }
            }
            catch(err){
                console.log(err,"catched error for final details")
            }
        }
        if(step>=3){
            console.log(step)
        GetFinaldata();
        }
       
    },[step])
    async function ApproveApplication(applicationId,loanAmt){
        const datas={
            applicationId,status:"Approved",loanAmt
        }
        const Header={
            headers:{
                "Content-type":"application/json"
            }
        }
        try{
        let res=await axios.post("http://localhost:3003/approveApplicationLoan",datas,Header);
        if(res.status==200){
            alert('Application Has been Approved and an Detailed Email  has been sent')
        }
    }catch(err){
        console.log(err.response,"catched error")
    }
    }
    async function RejectApplication(applicationId){
        const datas={
            applicationId,status:"Rejected"
        }
        const Header={
            headers:{
                "Content-type":"application/json"
            }
        }
        try{
        let res=await axios.post("http://localhost:3003/rejectApplicationLoan",datas,Header);
        if(res.status==200){
            alert('Application Has been Rejected and an Detailed Email  has been sent')
        }
    }catch(err){
        console.log(err.response,"catched error")
    }
    }
    
    return(

        <>
 {step === 1 && (
                <div className="backgroundForViewpersonalapplication">
                    <div className="boxforLoanApplication">
                  { /* <Button id="forNxtapplication" onClick={Back} type="button">Back</Button>*/}
                        <h2>Personal Details</h2>
                        {persoData.length > 0 ? (
                            persoData.map((user) => (
                                <Container key={user.id} className="mb-4 user-data-container">
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Application ID:</strong> {user.id}</Col>
                                        <Col sm={6} className="data-box"><strong>User ID:</strong> {user.userId}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Name:</strong> {user.full_name}</Col>
                                        <Col sm={6} className="data-box"><strong>Date of Birth:</strong> {user.date_of_birth}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Gender:</strong> {user.gender}</Col>
                                        <Col sm={6} className="data-box"><strong>Marital Status:</strong> {user.marital_status}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Nationality:</strong> {user.nationality}</Col>
                                        <Col sm={6} className="data-box"><strong>Address:</strong> {user.address}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Contact:</strong> {user.contact_information}</Col>
                                        <Col sm={6} className="data-box"><strong>Email:</strong> {user.email}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Parent Name:</strong> {user.parent_name}</Col>
                                        <Col sm={6} className="data-box"><strong>Parent Occupation:</strong> {user.parent_occupation}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Parent Annual Income:</strong> {user.parent_annual_income}</Col>
                                        <Col sm={6} className="data-box"><strong>Parent Contact Information:</strong> {user.parent_contact_information}</Col>
                                    </Row>
                                </Container>
                            ))
                        ) : (
                            <>
                                <p>No personal loan applications found.</p>
                           
                            </>
                        )}
                        <Button id="forNxtapplication" onClick={NxtStep} type="button">Next</Button>
                    </div>
                </div>
            )}

            {step === 2 && (

                <div className="backgroundForViewpersonalapplication">
                    <div className="boxforLoanApplication">
                        
                        <h2>Financial Details</h2>
                        {educationalData.length > 0 ? (
                            educationalData.map((usersall) => (
                                <Container key={usersall.id} className="mb-4 user-data-container">
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Institution Name:</strong> {usersall.institution_name}</Col>
                                        <Col sm={6} className="data-box"><strong>Course Name:</strong> {usersall.course_name}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Course Duration:</strong> {usersall.course_duration}</Col>
                                        <Col sm={6} className="data-box"><strong>Current Year of Study:</strong> {usersall.current_year_of_study}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Expected Graduation Date:</strong> {usersall.expected_graduation_date}</Col>
                                        <Col sm={6} className="data-box"><strong>SSLC Marks Card:</strong> {usersall.sslc_marks_card}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Previous Study Marks Card:</strong> {usersall.previous_study_marks_card}</Col>
                                        <Col sm={6} className="data-box"><strong>Marks Card Description:</strong> {usersall.marks_card_description}</Col>
                                    </Row>
                                </Container>
                            ))
                        ) : (
                            <p>No financial details found.</p>
                        )}
                        <Button id="forpreviousapplication" onClick={PrevStep} type="button">Previous</Button>
                        <Button id="forNxtapplication" onClick={NxtStep} type="button">Next</Button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="backgroundForViewpersonalapplication">
                    <div className="boxforLoanApplication">
                    <Button id="forBackapplication" onClick={Back} type="button">Back</Button>
                        <h2>Final Details</h2>
                        {finalData.length > 0 ? (
                            finalData.map((usersall) => (
                                <Container key={usersall.id} className="mb-4 user-data-container">
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Tuition Fee:</strong> {usersall.tuitionFee}</Col>
                                        <Col sm={6} className="data-box"><strong>Other Expenses:</strong> {usersall.otherExpenses}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Total Loan:</strong> {usersall.totalLoan}</Col>
                                        <Col sm={6} className="data-box"><strong>Tenure:</strong> {usersall.tenure}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Interest Rate:</strong> {usersall.interestRate}</Col>
                                        <Col sm={6} className="data-box"><strong>Emi:</strong> {usersall.emi}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Estimation:</strong> {usersall.estimation}</Col>
             
                                    </Row>
   <Row>
 {
    <Button
                                      
                                        id="foracceptapplicationloan"
                                        onClick={() => {
                                            console.log("Loan Amount in Button Click:", usersall.id,usersall.totalLoan);
                                            ApproveApplication(usersall.id,usersall.totalLoan)
                                        }}
                                        type="button"
                                    >
                                        Accept
                                    </Button> }
   
 

   
   </Row>
   <Row>

    <Button
                                       
                                        id="forrejectapplicationloan"
                                        onClick={() => {
                                            console.log("Loan Amount in Button Click:", usersall.id);
                                            RejectApplication(usersall.id)
                                           
                                        }}
                                     
                                        type="button"
                                    >
                                        Reject
                                    </Button>
   


   
   </Row>
                              
                                </Container>
                            ))
                        ) : (
                            <p>No final details found.</p>
                        )}
                        <Button id="forpreviousapplication" onClick={PrevStep} type="button">Previous</Button>

   
                    </div>
            
                </div>
            )}
        </>
    )
}