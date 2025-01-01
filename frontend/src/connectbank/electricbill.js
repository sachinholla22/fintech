import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import './cssforelectricbill.css';
import { useNavigate } from "react-router-dom";

export default function ElectricBill() {
    const [billno, setBillno] = useState('');
    const [billDetails, setBillDetails] = useState(null);
    const [error, setError] = useState('');
    let navigate = useNavigate();
    const [isPaid, setPaid] = useState(false);
    const [hasClicked, setClicked] = useState(false);

    useEffect(() => {
        async function checkPaymentStatus() {
            try {
                let res = await axios.get("http://localhost:3003/get-paidstatus",{withCredentials:true});
                if (res.status === 200) {
                    setPaid(true);
                } else {
                    setPaid(false);
                }
            } catch (err) {
                console.log(err, "cannot get status");
            }
        }
        checkPaymentStatus();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let res = await axios.post('http://localhost:3003/postbilliddetails', { bill_id: billno },{withCredentials:true});
            if (res.status === 200) {
                setBillDetails(res.data);
                setError('');
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Bill not found');
            } else {
                setError('Error retrieving bill details');
            }
            setBillDetails(null);
            console.log('Error retrieving bill details', err);
        }
    };

    const handlePay = (e) => {
        e.preventDefault();
        setClicked(true);
    };

    const gotoCreditPay = (e) => {
        e.preventDefault();
        navigate('/payusingcredit', { state: { amount: billDetails.amount,bill_Type:"Electric_bill" } });
    };


    function goback(e){
        e.preventDefault();
        setClicked(false)
    }
    return (
        <>
            <section className={`box-section ${hasClicked ? 'blur-background' : ''}`}>
                <div className={`container-box ${hasClicked ? 'blur-background' : ''}`}>
                    <div className="row">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 text-center" controlId="formBillNumber">
                                <Form.Label id="forlabel">Enter Bill Account Number</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="billno" 
                                    onChange={(e) => setBillno(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                            <Button variant="info" id="forbtn" type="submit">
                                Submit
                            </Button>
                        </Form>

                        {error && <p style={{color: 'red'}}>{error}</p>}

                        {billDetails && (
                            <Form>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={billDetails.name} type="text" name="name" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPhoneNum">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control value={billDetails.phone_num} type="text" name="phonenum" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBillingMonth">
                                    <Form.Label>Billing Month</Form.Label>
                                    <Form.Control value={billDetails.billing_month} type="text" name="billing_month" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDueDate">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control value={billDetails.due_date} type="text" name="duedate" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control value={billDetails.status} type="text" name="status" readOnly />
                                </Form.Group>
                                { !isPaid ? (
                                    <Button variant="danger" id="anotherBtn" onClick={handlePay}>
                                        Pay Rs.{billDetails.amount}
                                    </Button>
                                ) : (
                                    <p style={{ color: 'green' }}>Payment has already been made.</p>
                                )}
                            </Form>
                        )}
                    </div>
                </div>
            </section>
            {hasClicked && (
                <>
                    <div className="modal-overlay"></div>
                    <div className="tobackground">
                        <p onClick={goback}id='forback'>Back</p>
                        <p><b>Pay using</b></p>
                        <Button variant="warning" onClick={gotoCreditPay}>
                            Credit Card
                        </Button>
                        <Button variant="danger">
                            Debit Card
                        </Button>
                    </div>
                </>
            )}
        </>
    );
}
