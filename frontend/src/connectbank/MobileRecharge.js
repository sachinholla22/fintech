import React, { useState } from 'react';
import './MobileRechargeForm.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';

export default function MobileRechargeForm() {
  const [operator, setOperator] = useState('');
  const [plan, setPlan] = useState(null);
  const navigate=useNavigate();
  const [mobileno,setMobileno]=useState('')

  const operators = [
    { name: 'Airtel', plans: [
      { id: 1, plan: '719', validity: '84 days', services: '2GB/day, Unlimited Calls' },
      { id: 2, plan: '299', validity: '28 days', services: '1.5GB/day, Unlimited Calls' },
      { id: 3, plan: '499', validity: '56 days', services: '2GB/day, Unlimited Calls' },
      { id: 4, plan: '999', validity: '84 days', services: '3GB/day, Unlimited Calls' }
    ]},
    { name: 'Jio', plans: [
      { id: 5, plan: '239', validity: '28 days', services: '1.5GB/day, Unlimited Calls' },
      { id: 6, plan: '555', validity: '84 days', services: '1.5GB/day, Unlimited Calls' },
      { id: 7, plan: '349', validity: '56 days', services: '2GB/day, Unlimited Calls' },
      { id: 8, plan: '666', validity: '84 days', services: '2GB/day, Unlimited Calls' }
    ]},
    { name: 'BSNL', plans: [
      { id: 9, plan: '147', validity: '30 days', services: '10GB total, Unlimited Calls' },
      { id: 10, plan: '429', validity: '81 days', services: '1GB/day, Unlimited Calls' },
      { id: 11, plan: '599', validity: '84 days', services: '5GB/day, Unlimited Calls' },
      { id: 12, plan: '999', validity: '240 days', services: '3GB/day, Unlimited Calls' }
    ]},
    { name: 'Vodafone', plans: [
      { id: 13, plan: 'Rs.555', validity: '77 days', services: '1.5GB/day, Unlimited Calls' },
      { id: 14, plan: 'Rs.699', validity: '84 days', services: '2GB/day, Unlimited Calls' },
      { id: 15, plan: 'Rs.449', validity: '56 days', services: '2.5GB/day, Unlimited Calls' },
      { id: 16, plan: 'Rs.839', validity: '84 days', services: '3GB/day, Unlimited Calls' }
    ]}
  ];

  const handlePlanSelect = (selectedPlan) => {
    setPlan(selectedPlan);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!operator || !plan) {
      alert('Please select an operator and a plan');
      return;
    }
    alert(`Mobile Recharge: ${operator} - Plan: ${plan.plan}`);
  };
  const [hasClicked,setHasClicked]=useState(false)
  const handlePay = (e) => {
    e.preventDefault();
    setHasClicked(true);
};

const gotoCreditPay = (e) => {
    e.preventDefault();
    navigate('/payusingcredit', { state: { amount: plan.plan ,bill_Type:"Mobile_Recharge",validity:plan.validity,services:plan.services,mobileno:mobileno} });
};

const gotoDebitPay = (e) => {
    e.preventDefault();
    navigate('/payusingdebit', { state: { amount: plan.plan ,bill_Type:"Mobile_Recharge",validity:plan.validity,services:plan.services,mobileno:mobileno} });
};

function goback(e) {
    e.preventDefault();
    setHasClicked(false);
}
  return (
    <>
    <div className={`mobileRechargeContainer ${hasClicked ? 'blur-background' : ''}`}>
      <h2 style={{ color: "brown" }}>Mobile Recharge</h2>
      <form onSubmit={handleSubmit} className="mobileRechargeForm">
        <div className="customFormGroup">
          <label>Mobile Number</label>
          <input type="text" placeholder="Enter Mobile Number" onChange={(e)=>setMobileno(e.target.value)}required />
        </div>
        <div className="customFormGroup">
          <label>Select Operator</label>
          <select value={operator} onChange={(e) => setOperator(e.target.value)} required>
            <option value="" disabled>Select Operator</option>
            {operators.map((op, index) => (
              <option key={index} value={op.name}>{op.name}</option>
            ))}
          </select>
        </div>

        {operator && (
          <div className="customFormGroup">
            <label>Select Plan</label>
            {operators.find(op => op.name === operator).plans.map((p) => (
              <div 
                key={p.id} 
                className={`planBox ${plan && plan.id === p.id ? 'selected' : ''}`}
                onClick={() => handlePlanSelect(p)}
              >
                <input type="radio" name="plan" checked={plan && plan.id === p.id} readOnly />
                <strong>Rs.{p.plan} </strong>  | Validity:  {p.validity} | {p.services}
              </div>
            ))}
          </div>
        )}

        {plan && (
          <button type="submit" onClick={handlePay} className="submitButton">Recharge Rs{plan.plan}</button>
        )}
      </form>
    </div>
    {hasClicked && (
                <>
                    <div className="modal-overlay"></div>
                    <div className="tobackground">
                        <p onClick={goback} id='forback'>Back</p>
                        <p><b>Pay using</b></p>
                        <Button variant="warning" onClick={gotoCreditPay}>
                            Credit Card
                        </Button>
                        <Button variant="danger" onClick={gotoDebitPay}>
                            Debit Card
                        </Button>
                    </div>
                </>
            )}
    </>
    
  );
}
