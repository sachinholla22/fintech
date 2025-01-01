import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './adminlogin.css'; // Import the external CSS file

export default function AdminLogin() {
    const navigate = useNavigate();
    const [adminname, setAdminname] = useState('');
    const [pass, setPass] = useState('');

    async function submitData(e) {
        e.preventDefault();
        const data = {
            adminname: adminname,
            password: pass
        };
        const headerInfo = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            const response = await axios.post('http://localhost:3003/foradminlogin', data, headerInfo);
            if (response.status === 200) {
                alert("Login successful");
                navigate('/gotoviewusers');
                console.log(response)
            } else {
                alert("Invalid credentials");
                console.log("error in admin")
            }
        } catch (error) {
            alert("An error occurred");
        }
    }

    return (
        <div className="admin-login-container">
            <div className="admin-login-box">
                <h3>ADMIN LOGIN</h3>
                <hr />
                <Form onSubmit={submitData}>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Label>Admin Name</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setAdminname(e.target.value)}
                            name="adminname"
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e) => setPass(e.target.value)}
                            name="password"
                            className="form-control"
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="submit-button">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}
