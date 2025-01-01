import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import axios from 'axios';
import LoanApplicationProgress from '../forProgressBar';
import Step2EducationalLoan from './step2educationalLoan';
import './educationloan.css';
import {useNavigate} from 'react-router-dom'

export default function EducationalLoan() {
    const [hasPersonalData, setPersonalData] = useState(false);
    const [step, setStep] = useState(1);
const Navigate=useNavigate();
    useEffect(() => {
        async function fetchPersonalData() {
            try {
                let res = await axios.get("http://localhost:3003/getPersonal-educational-details",{withCredentials:true});
                if (res.status === 200 && res.data.data) {
                   
                    setPersonalData(true);
                    console.log(res, "Data found for existing user");
                    
                } else {
                    setPersonalData(false);
                    console.log(res, "No data available for new user");
                }
            } catch (error) {
                console.error("Error while retrieving personal details:", error);
            }
        }
        fetchPersonalData();
    }, []);
 
    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const previousStep = () => {
        if (step > 1) setStep(step - 1);
    };

    // Personal Information State
    const [fname, setFname] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [marriage, setMarriage] = useState('');
    const [nationality, setNationality] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [parentName, setParentName] = useState('');
    const [parentOccupation, setParentOccupation] = useState('');
    const [parentAnnuallIncome, setAnnualIncome] = useState('');
    const [contactParent, setParentContact] = useState('');

    async function submitPersonalEducationDetails(e) {
        e.preventDefault();
        const dataForBackend = {
            fname, dob, gender, marriage, nationality, address,
            contact, email, parentName, parentOccupation,
            parentAnnuallIncome, contactParent
        };
        const Header = {
            headers: {
                "Content-type": "application/json"
            },withCredentials:true
        };
        try {
            let result = await axios.post("http://localhost:3003/postpersonalEducationaldetails", dataForBackend, Header);
            if (result.status === 200) {
                console.log(result);
                alert('Data Submitted successfully');
            }
        } catch (err) {
            console.log(err.response, "Caught error from backend");
        }
    }

    // Loan Information State
    const [tuitionFee, setTuitionFee] = useState('');
    const [otherExpenses, setOtherExpenses] = useState('');
    const [totalLoan, setTotalLoanAmt] = useState('');
    const [estimation, setEstimation] = useState(null);
    const [tenure, setLoanTenure] = useState('');
    const interestRate = 8;
    const [emi, setEmi] = useState('');

    function calculateEmi(amount, rate, tenure) {
        const r = rate / (12 * 100); // Monthly interest rate
        const n = tenure * 12; // Number of months
        const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return emi.toFixed(2);
    }

    useEffect(() => {
        const totalAmount = parseFloat(tuitionFee || 0) + parseFloat(otherExpenses || 0);
        setTotalLoanAmt(totalAmount.toFixed(2));

        if (totalAmount && tenure) {
            const calculatedEmi = calculateEmi(totalAmount, interestRate, tenure);
            setEmi(calculatedEmi);
        } else {
            setEmi('');
        }
    }, [tuitionFee, otherExpenses, tenure]);

    function handleFileChange(e) {
        setEstimation(e.target.files[0]);
    }

    async function submitAll(e) {
        e.preventDefault();
        // Include necessary data for submission
        const formData = new FormData();
        formData.append('tuitionFee', tuitionFee);
        formData.append('otherExpenses', otherExpenses);
        formData.append('totalLoan', totalLoan);
        formData.append('tenure', tenure);
        formData.append('interestRate', interestRate);
        formData.append('emi', emi);
        formData.append('estimation', estimation);

        try {
            const result = await axios.post("http://localhost:3003/postEducationalLoanDetails", formData, {
                headers: { "Content-Type": "multipart/form-data" },withCredentials:true
            });
            if (result.status === 200) {
                alert("Loan application submitted successfully");
                Navigate('/loantype')
            }
        } catch (err) {
            console.error("Error submitting loan application", err);
        }
    }
    const [finalData,setFinalData]=useState(false)
    useEffect(() => {
        async function fetchfinalData() {
            try {
                let res = await axios.get("http://localhost:3003/getfinaldetails",{withCredentials:true});
                console.log(res.data);  // Log the entire response for debugging
    
                if (res.status === 200 && res.data.data) {
                    setFinalData(true);
                    console.log("Data final found for existing user");
                } else {
                    setFinalData(false);
                    console.log("No data available for new user");
                }
            } catch (error) {
                console.error("Error while retrieving personal details:", error);
            }
        }
        fetchfinalData();
    }, []);

    return (
        <>
            <section className="sectionEducationalLoan">
                <div className="divForEducationalLoan">
                    <h2>Educational Loan Application</h2>
                    <LoanApplicationProgress step={step} />
                    <hr />
                    {step === 1 && (
                        <form className="personalLoanForm">
                            <div className="form-group">
                                <label>Full Name:</label>
                                <input type="text" name="fullname" onChange={(e) => setFname(e.target.value)} placeholder="Enter your full name" />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth:</label>
                                <input type="date" onChange={(e) => setDOB(e.target.value)} name='dateofbirth' />
                            </div>
                            <div className="form-group">
                                <label>Gender:</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="" disabled>Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Marital Status:</label>
                                <select value={marriage} onChange={(e) => setMarriage(e.target.value)}>
                                    <option value="" disabled>Select marital status</option>
                                    <option value="Married">Married</option>
                                    <option value="Single">Single</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Nationality:</label>
                                <input type="text" name="nationality" onChange={(e) => setNationality(e.target.value)} placeholder="Enter your nationality" />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <input type="text" name="address" onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" />
                            </div>
                            <div className="form-group">
                                <label>Contact Information:</label>
                                <input type="text" name="contact" onChange={(e) => setContact(e.target.value)} placeholder="Enter your phone number" />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" />
                            </div>
                            <div className="form-group">
                                <label>Name of The Parent/Guardian:</label>
                                <input type="text" name="parentName" onChange={(e) => setParentName(e.target.value)} placeholder="Enter your Parent/Guardian Name" />
                            </div>
                            <div className="form-group">
                                <label>Occupation of the Parent/Guardian:</label>
                                <input type="text" name="Parentoccupation" onChange={(e) => setParentOccupation(e.target.value)} placeholder="Enter Parent/Guardian occupation" />
                            </div>
                            <div className="form-group">
                                <label>Annual Income of the Parent/Guardian:</label>
                                <input type="text" name="annualIncome" onChange={(e) => setAnnualIncome(e.target.value)} placeholder="Enter Annual Income of Parent/Guardian" />
                            </div>
                            <div className="form-group">
                                <label>Contact Information of Parent/Guardian:</label>
                                <input type="text" name="income" onChange={(e) => setParentContact(e.target.value)} placeholder="Enter contact Information of Parent/Guardian" />
                            </div>
                            <Button type="submit" onClick={submitPersonalEducationDetails} disabled={hasPersonalData} className="custom-save-btn">Save</Button>
                            <Button type="button" onClick={nextStep} className="custom-next-btn">Next</Button>
                        </form>
                    )}
                    {step === 2 && (
                        <Step2EducationalLoan nextStep={nextStep} previousStep={previousStep} />
                    )}
                    {step === 3 && (
                        <form className="repaymentReferencesForm" onSubmit={submitAll}>
                            <div className="form-group">
                                <label>Tuition Fees:</label>
                                <input type="text" name="TuitionFees" value={tuitionFee} onChange={(e) => setTuitionFee(e.target.value)} placeholder="Enter Tuition fee amount" />
                            </div>
                            <div className="form-group">
                                <label>Other Educational Expenses:</label>
                                <input type="text" name="otherexpenses" value={otherExpenses} onChange={(e) => setOtherExpenses(e.target.value)} placeholder="For Books, Stationaries, Uniform, etc." />
                            </div>
                            <div className="form-group">
                                <label>Total Loan Required Amount:</label>
                                <input type="text" name="totalAmount" value={totalLoan} readOnly placeholder="Addition of Both Tuition Fee and Other Expenses" />
                            </div>
                            <div className="form-group">
                                <label>Loan Tenure:</label>
                                <input
                                    type="number"
                                    name="loanTenure"
                                    placeholder="Enter total years"
                                    value={tenure}
                                    onChange={(e) => setLoanTenure(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Interest Rate:</label>
                                <input
                                    type="text"
                                    name="interestRate"
                                    value={`${interestRate}%`}
                                    placeholder="Interest rate is fixed at 8%"
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>EMI (Equated Monthly Installments):</label>
                                <input
                                    type="text"
                                    name="emi"
                                    placeholder="Calculated EMI"
                                    value={emi}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload Fee Estimation Bill:</label>
                                <input type="file" name="estimation" onChange={handleFileChange} placeholder="College Receipt" />
                            </div>
                            <Button type="button" onClick={previousStep} className="custom-lstStepprevious-btn">Previous</Button>
                            <Button type="submit" disabled={finalData}className="custom-lastSave-btn">Submit</Button>
                        </form>
                    )}
                </div>
            </section>
        </>
    );
}
