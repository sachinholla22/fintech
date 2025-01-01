import React, { useState } from "react";
import './emiCal.css'

export default function EmiCalculator(props) {
    let [loanAmount, setloanAmount] = useState('50000');
    let [rateofinterest, setrateofinterest] = useState('8');
    let [periods, setperiods] = useState('6');

    const calculateEMI = (principal, rate, time) => {
        rate = rate / (12 * 100);

        const emi = (principal * rate * Math.pow(1 + rate, time)) /( Math.pow(1 + rate, time) - 1)
        return emi

    }
    const emi = calculateEMI(loanAmount, rateofinterest, periods).toFixed(2);



    return (
        <>
            <div className="wholewidth" style={props.style}>
                <div className="boxContainer" style={props.box}>
                    <nav className="navbar">
                    <h2>EMI CALCULATOR</h2>
                    </nav>
                  
                        <div className="output">
                            <p>Monthly Loan EMI (Approx.): </p>
                            <span> {emi}</span>
                        </div>
                        <div className="forloan">
                            <label> Loan Amount (₹):<span> {loanAmount}</span></label>
                            <input type="range" min="50000" max="10000000" step="5000" value={loanAmount} onChange={(e) => setloanAmount(Number(e.target.value))} />
                        </div>
                        <div className="forROI">
                            <label>Rate Of Interest (%) : <span>{rateofinterest}</span></label>
                            <input type="range" min="8" max="19.95" step="0.05" value={rateofinterest} onChange={(e) => setrateofinterest(Number(e.target.value))} />
                        </div>
                        <div className="forPeriod">
                            <label>Period (in months) : <span>{periods}</span></label>
                            <input type="range" min="6" max="60" step="1" value={periods} onChange={(e) => setperiods(Number(e.target.value))} />

                        </div>
                    </div>
                </div>
            
        </>
    )
}