import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import './ApplyCreditCard.css';
import {useNavigate} from 'react-router-dom' // Import the external CSS file

export default function ApplyCreditCard() {
    let navigate=useNavigate();

    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [Id, setId] = useState('');
    const [idnumber, setIdnumber] = useState('');
    const [jobname, setJobname] = useState('');
    const [salary, setSalary] = useState('');
    const [idpic, setIdpic] = useState(null);

    async function SubmitData(e) {
        e.preventDefault();
        const Dataform = new FormData();
        Dataform.append("name", name);
        Dataform.append('dateofbirth', dob);
        Dataform.append('contact', contact);
        Dataform.append('address', address);
        Dataform.append('Id', Id);
        Dataform.append('idnumber', idnumber);
        Dataform.append('professionname', jobname);
        Dataform.append('Monthlysalary', salary);
        Dataform.append('idphoto', idpic);

        const headers = {
            "Content-Type": "multipart/form-data"
        };

        try {
            const results = await axios.post("http://localhost:3003/savecreditcarddetails", Dataform, { headers,withCredentials:true });
            if (results.status === 200) {
                alert("Data entered successfully");
            }
        } catch (err) {
            console.log("Error while sending data to backend:", err.response);
            alert("Failed to submit data. Please try again.");
        }
    }
    function  Goback(e){
        e.preventDefault();
        navigate('/creditcard')
    }

    return (
        <div className="apply-credit-card-container">
            <Button onClick={Goback} id="forbackBtncreditcard"variant="info" type="submit">
                        Back
                    </Button>
            <section className="apply-form-section">
                <h2>Apply for a Credit Card</h2>
                <hr/>
                <Form onSubmit={SubmitData}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDob">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            onChange={(e) => setDob(e.target.value)}
                            name="dateofbirth"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicContact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setContact(e.target.value)}
                            name="contact"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAddress">
                        <Form.Label>Permanent Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            onChange={(e) => setAddress(e.target.value)}
                            name="address"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>Type of ID</Form.Label>
                        <Form.Select
                            onChange={(e) => setId(e.target.value)}
                            name="Id"
                            required
                        >
                            <option value="">Select Type of ID</option>
                            <option value="aadhar">Aadhar Card</option>
                            <option value="pan-card">PAN Card</option>
                            <option value="driving-license">Driving License</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicIdNumber">
                        <Form.Label>ID Number</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setIdnumber(e.target.value)}
                            name="idnumber"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicJobName">
                        <Form.Label>Profession Name</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setJobname(e.target.value)}
                            name="professionname"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSalary">
                        <Form.Label>Monthly Salary</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setSalary(e.target.value)}
                            name="Monthlysalary"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicIdPhoto">
                        <Form.Label>Upload ID Card File</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setIdpic(e.target.files[0])}
                            name="idphoto"
                            required
                        />
                        <Form.Text className="text-muted">
                            File must be PDF, JPG, or PNG only
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </section>
        </div>
    );
}
