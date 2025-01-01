import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Step2PersonalLoan({ nextStep, previousStep, setProgress }) {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanPurpose, setLoanPurpose] = useState('');
    const loanTenure = 5; // Set default tenure value (e.g., 5 years)
    const interestRate = 13; // Assuming a fixed interest rate of 13%
    const [emi, setEmi] = useState('');

    const calculateEMI = (amount, rate, tenure) => {
        const r = rate / (12 * 100); // Monthly interest rate
        const n = tenure * 12; // Number of months
        const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return emi.toFixed(2); // Return EMI rounded to 2 decimal places
    };

    const handleLoanAmountChange = (e) => {
        const amount = e.target.value;
        setLoanAmount(amount);
        if (amount) {
            const calculatedEmi = calculateEMI(amount, interestRate, loanTenure);
            setEmi(calculatedEmi);
        } else {
            setEmi('');
        }
    };

    const [cScore, setcScore] = useState('');
    const [bankstmt, setBankstmt] = useState(null);
    const [taxreturns, setTaxreturns] = useState(null);
    const [saveData, setSavedfinancialdata] = useState(false);

    async function Submit2nddetails(e) {
        e.preventDefault();
        const Dataform = new FormData();
        Dataform.append('loanAmount', loanAmount);
        Dataform.append('loanPurpose', loanPurpose);
        Dataform.append('loanTenure', loanTenure);
        Dataform.append('interestRate', interestRate);
        Dataform.append('emi', emi);
        Dataform.append('creditScore', cScore);
        Dataform.append('bankStatements', bankstmt);
        Dataform.append('taxReturns', taxreturns);

        const Headers = {
            headers: {
                "Content-type": "multipart/form-data"
            },withCredentials:true
        };
        
        try {
            let results = await axios.post("http://localhost:3003/sendFinancialdetails", Dataform, Headers);
            if (results.status === 200 && results.data.data) {
                alert("Your data has been saved");
                setSavedfinancialdata(true); // Disable the Save button
            } else {
                setSavedfinancialdata(false);
            }
        } catch (err) {
            console.log(err.response, "caught error");
            setSavedfinancialdata(false);
        }
    }

    const [hasfinance, setFinancialdata] = useState(false);

    useEffect(() => {
        async function hasFinancedata() {
            try {
                let res = await axios.get("http://localhost:3003/getFinancialdetails",{withCredentials:true});
                if (res.status === 200 && res.data.data) {
                    setFinancialdata(true);  // Existing user, data already saved
                    setProgress(true);
                } else {
                    setFinancialdata(false); // New user, no data found
                }
            } catch (error) {
                console.error("Error while retrieving financial details:", error);
            }
        }
        hasFinancedata();
    }, [setProgress]);

    return (
        <>
            <form className="loanFinancialDetailsForm">
                <div className="form-group">
                    <label>Loan Amount Requested:</label>
                    <input
                        type="number"
                        name="loanAmount"
                        placeholder="Enter loan amount"
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                    />
                </div>
                <div className="form-group">
                    <label>Loan Purpose:</label>
                    <input
                        type="text"
                        name="loanPurpose"
                        placeholder="Enter loan purpose"
                        value={loanPurpose}
                        onChange={(e) => setLoanPurpose(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Loan Tenure:</label>
                    <input
                        type="text"
                        name="loanTenure"
                        placeholder="Loan tenure is fixed at 5 years"
                        value={`${loanTenure} years`}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Interest Rate:</label>
                    <input
                        type="text"
                        name="interestRate"
                        value={`${interestRate}%`}
                        placeholder="Interest rate is fixed at 13%"
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
                        onChange={(e) => setEmi(e.target.value)}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label>Credit Score:</label>
                    <input
                        type="number"
                        name="creditScore"
                        placeholder="Enter your credit score"
                        onChange={(e) => setcScore(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Bank Statements:</label>
                    <input type="file" onChange={(e) => setBankstmt(e.target.files[0])} name="bankStatements" />
                </div>
                <div className="form-group">
                    <label>Tax Returns (optional):</label>
                    <input type="file" onChange={(e) => setTaxreturns(e.target.files[0])} name="taxReturns" />
                </div>
                <Button
                    type="submit"
                    onClick={Submit2nddetails}
                    disabled={hasfinance || saveData}
                    className="custom-step2save-btn"
                >
                    Save
                </Button>
                <Button type="button" onClick={previousStep} className="custom-previouss-btn">Previous</Button>
                <Button type="submit" onClick={nextStep} className="custom-set2next-btn">Next</Button>
            </form>
        </>
    );
}
