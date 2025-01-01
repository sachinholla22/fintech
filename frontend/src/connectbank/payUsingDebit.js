import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './payusingDebit.css'; // Import your custom CSS here

export default function PayUsingDebit() {
    const location = useLocation();
    const navigate = useNavigate();
    const { amount } = location.state || { amount: 0 };
    const { bill_Type } = location.state || { bill_Type: '' };
  const {validity}=location.state||{validity:''};
  const {services}=location.state||{services:''};
  const { mobileno } = location.state || { mobileno: '' };
    const [name, setName] = useState('');
    const [cardno, setCardno] = useState('');
    const [currCcv, setCcv] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
const [expiryyear,setExpiry]=useState('')
    async function SubmitMoney(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!name || !cardno  || !currCcv) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        const Data = {
            name,
            cardno,
            ccv: currCcv,
            expiryyear,
            amount,
            payDebitcard: 'Debit Card',
            bill_of: bill_Type,
            validity:validity,
            services:services,
            mobileno:mobileno
        };

        const Headerinfo = {
            headers: {
                'Content-type': 'application/json',
            },
            withCredentials:true
        };

        try {
            let results = await axios.post('http://localhost:3003/confirm-Debit-card-payment', Data, Headerinfo);
            if (results.status === 200) {
                setSuccess('Payment successful');
                navigate('/dashboard');
                alert('Payment Successful');
            } else {
                setError('Failed to process payment');
            }
        } catch (error) {
            setError('Error from backend');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="debit-payment-container">
            <h3>Provide Debit Card Details for Secure Payment</h3>
            <Form onSubmit={SubmitMoney} className="debit-payment-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name of the Card Holder</Form.Label>
                    <Form.Control type="text" name="name" onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Debit Card Number</Form.Label>
                    <Form.Control type="text" onChange={(e) => setCardno(e.target.value)} name="cardno" required />
                </Form.Group>

          

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>CCV</Form.Label>
                    <Form.Control type="text" onChange={(e) => setCcv(e.target.value)} name="ccv" required />
                </Form.Group>
              

                <>
                    {error && <div className="debit-payment-message error">{error}</div>}
                    {success && <div className="debit-payment-message success">{success}</div>}
                    {loading ? (
                        <div className="debit-payment-loading">Processing payment...</div>
                    ) : (
                        <Button variant="primary" type="submit" className="btn-primary">
                            Pay Rs.{amount}.00
                        </Button>
                    )}
                </>
            </Form>
        </div>
    );
}
