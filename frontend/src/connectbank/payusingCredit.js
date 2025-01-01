import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './payusingCredit.css'; // Import your custom CSS here

export default function PayUsingCredit() {
    const location = useLocation();
    const navigate = useNavigate();
    const { amount } = location.state || { amount: 0 };
    const { bill_Type } = location.state || { bill_Type: '' };
    const { validity } = location.state || { validity: '' };
    const { services } = location.state || { services: '' };
    const { mobileno } = location.state || { mobileno: '' };
    const [name, setName] = useState('');
    const [cardtype, setCardtype] = useState('');
    const [cardno, setCardno] = useState('');
    const [currCcv, setCcv] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    async function SubmitMoney(e) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
    
        // Basic validation
        if (!name || !cardno || !cardtype || !currCcv) {
            setError('All fields are required');
            setLoading(false);
            return;
        }
    
        // Additional client-side validation (e.g., card number length, CCV length)
        if (cardno.length !== 16) {
            setError('Credit card number must be 16 digits');
            setLoading(false);
            return;
        }
        if (currCcv.length !== 3) {
            setError('CCV must be 3 digits');
            setLoading(false);
            return;
        }
    
        const Data = {
            name,
            cardno,
            cardtype,
            ccv: currCcv,
            amount,
            payCreditcard: 'Credit Card',
            bill_of: bill_Type,
            validity,
            services,
            mobileno
        };
    
        const Headerinfo = {
            headers: {
                'Content-type': 'application/json',
            },withCredentials:true
        };
    
        try {
            console.log('Sending data to backend:', Data);  // Log the request data for debugging
    
            let results = await axios.post('http://localhost:3003/confirm-payment', Data, Headerinfo);
            console.log('Backend response:', results);  // Log the full response from backend for debugging
    
            if (results.status === 200) {
                setSuccess('Payment successful');
                navigate('/dashboard');
                alert('Payment Successful');
            } else {
                setError(`Failed to process payment: ${results.data.message || 'Unknown error'}`);
            }
        } catch (error) {
            // Enhanced error handling
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Error response from backend:', error.response);
                setError(`Backend error: ${error.response.data.message || 'Internal Server Error'}`);
            } else if (error.request) {
                // Request was made but no response received
                console.error('No response received from backend:', error.request);
                setError('No response from the server. Please check your network connection.');
            } else {
                // Something else caused the error
                console.error('Error setting up request:', error.message);
                setError(`Request error: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="credit-payment-container">
            <Form onSubmit={SubmitMoney} className="credit-payment-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name of the Card Holder</Form.Label>
                    <Form.Control type="text" name="name" onChange={(e) => setName(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Credit Card Number</Form.Label>
                    <Form.Control type="text" onChange={(e) => setCardno(e.target.value)} name="cardno" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Card Type</Form.Label>
                    <Form.Control type="text" onChange={(e) => setCardtype(e.target.value)} name="cardtype" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>CCV</Form.Label>
                    <Form.Control type="text" onChange={(e) => setCcv(e.target.value)} name="ccv" required />
                </Form.Group>

                <>
                    {error && <div className="credit-payment-message error">{error}</div>}
                    {success && <div className="credit-payment-message success">{success}</div>}
                    {loading ? (
                        <div className="credit-payment-loading">Processing payment...</div>
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
