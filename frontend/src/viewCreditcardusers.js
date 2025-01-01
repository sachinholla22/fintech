import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './viewCredicarduser.css';

export default function ViewCreditCardUsers() {
    const [data1, setData] = useState([]);
    const [approve, setApprove] = useState('');
    const [reject, setReject] = useState('');

    useEffect(() => {
        async function Checkdata() {
            try {
                let res = await axios.get('http://localhost:3003/pendingapplication');
                if (res.status == 200) {
                    if (!Array.isArray(res.data)) {
                        console.log("expected array ....");
                    }
                    setData(res.data);
                }
            } catch (error) {
                console.log(error, "couldn't get data");
            }
        }
        Checkdata();
    }, []);

    async function Approve(applicationId) {
        const Data = { applicationId, status: 'approved' };

        let HeaderConfig = {
            headers: {
                "Content-type": "application/json"
            }
        };
        try{
        let result = await axios.post('http://localhost:3003/approveapplication', Data, HeaderConfig);
        console.log(result);
        if (result.status == 200) {
            console.log("Application approved and email sent successfully");
            alert("Application approved and email sent successfully")
        }
    }catch(err){
        console.log("error approving application",err)
    }
    }

    async function Reject(applicationId) {
        const Data = { applicationId, status: 'rejected' };

        let HeaderConfig = {
            headers: {
                "Content-type": "application/json"
            }
        };
        let result = await axios.post('http://localhost:3003/rejectapplication', Data, HeaderConfig);
        console.log(result);
        if (result.status == 200) {
            console.log("successfully sent to backend");
        }
    }

    return (
        <>
            <h2 className="for-h33 text-center" style={{ color: "brown", fontWeight: "bolder", position: "relative", top: "3%" }}>Users Credit Card Application Detail</h2>
            <hr/>
            <section className='tableSection'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Application Id</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Contact Number</th>
                            <th>Address</th>
                            <th>ID Used</th>
                            <th>ID Number</th>
                            <th>Profession Name</th>
                            <th>Monthly Salary</th>
                            <th>Photo of ID</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data1.map((users) => (
                            <tr key={users.application_id}>
                                <td>{users.application_id}</td>
                                <td>{users.name}</td>
                                <td>{users.dateofbirth}</td>
                                <td>{users.contact}</td>
                                <td>{users.address}</td>
                                <td>{users.Id}</td>
                                <td>{users.idnumber}</td>
                                <td>{users.professionname}</td>
                                <td>{users.Monthlysalary}</td>
                                <td>{users.idphoto}</td>
                                <td>{users.status}</td>
                                <td>
                                    <Button onClick={() => Approve(users.application_id)} name="approve" variant="success">Approve</Button>
                                    <Button onClick={() => Reject(users.application_id)} variant="danger">Reject</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>
        </>
    );
}
