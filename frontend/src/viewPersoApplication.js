import './viewpersonalloanapp.css';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function ViewPersoApplication() {
    let navigate = useNavigate();
    const [data1, setData] = useState([]);
    const [step, setStep] = useState(1);
    const [finDatas, setFinData] = useState([]);
    const [finalData, setFinalData] = useState([]);

    function NxtStep() {
        if (step < 4) {
            setStep(prevStep => prevStep + 1);
        }
    }

    function PrevStep() {
        if (step > 1) {
            setStep(prevStep => prevStep - 1);
        }
    }

    useEffect(() => {
        async function fetchPersonalDetails() {
            try {
                let res = await axios.get("http://localhost:3003/getPersonaldetailsforadmin");
                if (res.status === 200 && Array.isArray(res.data.data)) {
                    setData(res.data.data);
                    console.log(res, "Data found for existing user");
                } else {
                    setData([]);
                    console.log(res, "No data available for new user");
                }
            } catch (error) {
                console.error("Error while retrieving personal details:", error);
                setData([]);
            }
        }
        fetchPersonalDetails();
    }, []);

    useEffect(() => {
        async function fetchFinancialDetails() {
            try {
                let res = await axios.get("http://localhost:3003/getFinancedetailsforadmin");
                if (res.status === 200 && Array.isArray(res.data.data)) {
                    setFinData(res.data.data);
                    console.log(res, "Financial Data found for existing user");
                } else {
                    setFinData([]);
                    console.log(res, "No data available for new user");
                }
            } catch (error) {
                console.error("Error while retrieving financial details:", error);
                setFinData([]);
            }
        }

        if (step >= 2) {
            fetchFinancialDetails();
            console.log("Incremented to step 2");
            console.log(step, "This is step");
        }
    }, [step]);

    useEffect(() => {
        async function fetchFinalDetails() {
            try {
                let res = await axios.get("http://localhost:3003/getFinaldetailsforadmin");
                if (res.status === 200 && Array.isArray(res.data.data)) {
                    setFinalData(res.data.data);
                    console.log(res, "Final data found for existing user");
                } else {
                    setFinalData([]);
                    console.log(res, "No final data available for new user");
                }
            } catch (error) {
                console.error("Error while retrieving final details:", error);
                setFinalData([]);
            }
        }

        if (step >= 3) {
            fetchFinalDetails();
            console.log("Incremented to step 3");
            console.log(step, "This is step");
        }
    }, [step]);

    async function ApproveApplication(applicationId, loanAmt) {
        let datas = {
            applicationId,
            status: 'approved',
            loanAmt
        };
        const Header = {
            headers: {
                "Content-type": "application/json"
            }
        };
        console.log("Application ID:", applicationId, "Loan Amount:", loanAmt);

        try {
            let res = await axios.post("http://localhost:3003/approveLoanApplication", datas, Header);
            if (res.status === 200) {
                alert("Application is successfully approved and email also sent.");
            } else {
                console.log("Error occurred while approving.");
            }
        } catch (err) {
            console.log(err.response, "Caught error from backend");
        }
    }

    function Back(e) {
        e.preventDefault();
        navigate('/loanApplications');
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
        let res=await axios.post("http://localhost:3003/rejectApplicationPersonalLoan",datas,Header);
        if(res.status==200){
            alert('Application Has been Rejected and an Detailed Email  has been sent')
        }
    }catch(err){
        console.log(err.response,"catched error")
    }
    }
    
    return (
        <>
            {step === 1 && (
                <div className="backgroundForViewpersonalapplication">
                    <div className="boxforLoanApplication">
                        <h2>Personal Details</h2>
                        {data1.length > 0 ? (
                            data1.map((user) => (
                                <Container key={user.id} className="mb-4 user-data-container">
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Application ID:</strong> {user.id}</Col>
                                        <Col sm={6} className="data-box"><strong>User ID:</strong> {user.userId}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Name:</strong> {user.fullname}</Col>
                                        <Col sm={6} className="data-box"><strong>Date of Birth:</strong> {user.dateofbirth}</Col>
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
                                        <Col sm={6} className="data-box"><strong>Contact:</strong> {user.contact}</Col>
                                        <Col sm={6} className="data-box"><strong>Email:</strong> {user.email}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Employment Status:</strong> {user.employment_status}</Col>
                                        <Col sm={6} className="data-box"><strong>Occupation:</strong> {user.occupation}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Years of Employment:</strong> {user.years_of_employment}</Col>
                                        <Col sm={6} className="data-box"><strong>Annual Income:</strong> {user.annual_income}</Col>
                                    </Row>
                                </Container>
                            ))
                        ) : (
                            <>
                                <p>No personal loan applications found.</p>
                                <Button id="forNxtapplication" onClick={Back} type="button">Back</Button>
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
                        {finDatas.length > 0 ? (
                            finDatas.map((usersall) => (
                                <Container key={usersall.id} className="mb-4 user-data-container">
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Loan Amount:</strong> {usersall.loan_amount}</Col>
                                        <Col sm={6} className="data-box"><strong>Loan Purpose:</strong> {usersall.loan_purpose}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Loan Tenure:</strong> {usersall.loan_tenure}</Col>
                                        <Col sm={6} className="data-box"><strong>Interest Rate:</strong> {usersall.interest_rate}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>EMI:</strong> {usersall.emi}</Col>
                                        <Col sm={6} className="data-box"><strong>Credit Score:</strong> {usersall.credit_score}</Col>
                                    </Row>
                                    <Row>
                                        <Col sm={6} className="data-box"><strong>Bank Statements:</strong> {usersall.bank_statements}</Col>
                                        <Col sm={6} className="data-box"><strong>Tax Returns:</strong> {usersall.tax_returns}</Col>
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
            <h2>Final Details</h2>
            {finalData.length > 0 ? (
                finalData.map((usersall) => (
                    <Container key={usersall.id} className="mb-4 user-data-container">
                        <Row>
                            <Col sm={6} className="data-box"><strong>Repayment Method:</strong> {usersall.repay_method}</Col>
                            <Col sm={6} className="data-box"><strong>Reference Name:</strong> {usersall.reference_name}</Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="data-box"><strong>Relationship to Applicant:</strong> {usersall.relationship_to_applicant}</Col>
                            <Col sm={6} className="data-box"><strong>Contact of the referer:</strong> {usersall.contact_info}</Col>
                        </Row>
                        <Row>
                            <Col sm={6} className="data-box"><strong>Application Status:</strong> {usersall.status}</Col>
                        </Row>
                    </Container>
                ))
            ) : (
                <p>No final details found.</p>
            )}
            <Button id="forpreviousapplication" onClick={PrevStep} type="button">Previous</Button>
            <Button id="foracceptapplication" onClick={() => {
                if (finDatas.length > 0) {
                    console.log("Loan Amount in Button Click:", finDatas[0].loan_amount);
                    ApproveApplication(finDatas[0].id, finDatas[0].loan_amount);
                }
            }} type="button">Accept</Button>
            <Button id="forrejectapplication" onClick={() => {
                if (finDatas.length > 0) {
                    console.log("Reject Button in Button Click and Id:", finDatas[0].id);
                    RejectApplication(finDatas[0].id);
                }
            }} type="button">Reject</Button>
       

                      
                     { /*{finDatas.map((usersall)=>( <Button
                                        key={usersall.id}
                                        id="foracceptapplication"
                                        onClick={() => {
                                            console.log("Loan Amount in Button Click:", usersall.loan_amount);
                                            ApproveApplication(usersall.id, usersall.loan_amount);
                                        }}
                                        type="button"
                                    >
                                        Accept
                                    </Button>
                      )
                    )
}*/}
{/*
{finDatas.map((usersdata)=>(<>
    <Button
                                        key={usersdata.id}
                                        id="forrejectapplicationloan"
                                        onClick={() => {
                                            console.log("Loan Amount in Button Click:", usersdata.id);
                                           RejectApplication(usersdata.id)
                                        }}
                                        type="button"
                                    >
                                        Reject
                                    </Button>
   
   </>))

   }*/}
                    </div>
                </div>
            )}
        </>
    );
}
