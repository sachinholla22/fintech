import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './waterbill.css';
import { useNavigate } from 'react-router-dom';

export default function WaterBill() {
    const navigate = useNavigate();

    const [billAccNum, setBillAccNum] = useState('');
    const [getAccdetails, setAccdetails] = useState(null);
    const [isPaid, setPaid] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);

    // Handle submission of the account number
    async function SendAccnum(e) {
        e.preventDefault();
        const datas = {
            billAccNum
        };
        let Header = {
            headers: {
                'Content-type': "application/json"
            },withCredentials:true
        };
        try {
            let res = await axios.post('http://localhost:3003/sendAccNumofwaterbill', datas, Header);
            if (res.status === 200) {
                setAccdetails(res.data.data);
                console.log(res.data.data, "data from backend");
            } else {
                setAccdetails(null);
                console.log("The else part");
            }
        } catch (err) {
            console.log(err.response, "catched error", err);
        }
    }

    // Fetch the payment status
    useEffect(() => {
        function fetchPaymentStatus() {
            axios.get("http://localhost:3003/getPaymentdetails-of-waterBill",{withCredentials:true})
                .then(res => {
                    if (res.data.isPaid) {
                        setPaid(true);
                        console.log(res.data, "Payment status");
                    } else {
                        setPaid(false);
                        console.log("Payment not made");
                    }
                })
                .catch(err => {
                    console.log(err.response);
                });
        }
        fetchPaymentStatus();
    }, []);

    // Modal handling for payment options
    const handlePay = (e) => {
        e.preventDefault();
        setHasClicked(true);
    };

    const gotoCreditPay = (e) => {
        e.preventDefault();
        navigate('/payusingcredit', { state: { amount: getAccdetails.amount_due ,bill_Type:"Water_bill"} });
    };

    const gotoDebitPay = (e) => {
        e.preventDefault();
        navigate('/payusingdebit', { state: { amount: getAccdetails.amount_due ,bill_Type:"Water_bill"} });
    };

    function goback(e) {
        e.preventDefault();
        setHasClicked(false);
    }

    return (
        <>
            <section className={`box-sections ${hasClicked ? 'blur-background' : ''}`}>
                <div className={`container-boxes ${getAccdetails ? 'expanded' : ''||hasClicked ? 'blur-background' : ''}`}>
                    <div className="row">
                        <Form onSubmit={SendAccnum}>
                            <Form.Group className="mb-3 text-center" controlId="formBillNumber">
                                <Form.Label id="forlabel">Enter Bill Account Number</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="billno" 
                                    onChange={(e) => setBillAccNum(e.target.value)} 
                                    required 
                                />
                            </Form.Group>
                            <Button variant="info" id="forbtn" type="submit">
                                Submit
                            </Button>
                        </Form>

                        {getAccdetails && (
                            <Form>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control value={getAccdetails.name} type="text" name="name" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPhoneNum">
                                    <Form.Label>Billing Month</Form.Label>
                                    <Form.Control value={getAccdetails.billing_month} type="text" name="phonenum" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBillingMonth">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control value={getAccdetails.due_date} type="text" name="billing_month" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formDueDate">
                                    <Form.Label>Late Fee</Form.Label>
                                    <Form.Control value={getAccdetails.late_fee} type="text" name="duedate" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formStatus">
                                    <Form.Label>Water Usage</Form.Label>
                                    <Form.Control value={getAccdetails.water_usage} type="text" name="status" readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control value={getAccdetails.status} type="text" name="status" readOnly />
                                </Form.Group>

                                { !isPaid ? (
                                    <Button variant="danger" id="anotherBtn" onClick={handlePay}>
                                        Pay Rs.{getAccdetails.amount_due}
                                    </Button>
                                ) : (
                                    <p style={{ color: 'green' }}>Payment has already been made.</p>
                                )}
                            </Form>
                        )}
                    </div>
                </div>
            </section>

            {/* Modal for payment options */}
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
