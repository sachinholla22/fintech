import { useState, useEffect } from 'react';
import axios from 'axios';
import './MonitorUsers.css'; 
import Button from 'react-bootstrap/Button';

export default function MonitorUsers() {
    const [hasUser, setHasUser] = useState(false);
    const [getData, setData] = useState([]);

    useEffect(() => {
        async function getUsers() {
            try {
                let result = await axios.get("http://localhost:3003/getAllusersdata");
                if (result.status === 200 && result.data.length > 0) {
                    setHasUser(true);
                    setData(result.data);
                } else {
                    setHasUser(false);
                    setData([]);
                }
            } catch (err) {
                console.log(err.response, 'unexpected error');
            }
        }
        getUsers();
    }, []);

async function RemoveUser(userId){
    
    const datas={
userId
    }
    const header={
        headers:{
            "Content-type":"application/json"

        }
    }
    try{
    let res=await axios.post("http://localhost:3003/deleteUser",datas,header);
    if(res.status==200 && res.data.hasDeleted){

        alert("User removed Successfully");


    }
    else{
        console.log("cannot send data to backend")
    }
}catch(err){
    console.log(err.response,"Catched err",err)
}
}
    return (
        <section className="forbackgroundofthis">
            <div className="forTable-boxes">
                <h3 className="table-heading">User Data</h3>
                {hasUser ? (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Name</th>
                                <th>Date of Birth</th>
                                <th>City</th>
                                <th>Pincode</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Aadhar</th>
                                <th>Gender</th>
                                <th>Initial Amount</th>
                                <th>Pin Number</th>
                                <th>Username</th>
                                <th>Account Number</th>
                                <th>Remove User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getData.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.userID}</td>
                                    <td>{user.name}</td>
                                    <td>{user.dob}</td>
                                    <td>{user.city}</td>
                                    <td>{user.pincode}</td>
                                    <td>{user.phnumber}</td>
                                    <td>{user.email}</td>
                                    <td>{user.aadhar}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.initialamt}</td>
                                    <td>{user.pin_number}</td>
                                    <td>{user.username}</td>
                                    <td>{user.accNum}</td>
                                    <Button variant="danger"  onClick={()=>RemoveUser(user.userID)}type="submit" >
                    Delete 
                </Button>
                                </tr>
                               
                            ))}
                          
                        </tbody>
                    </table>
                ) : (
                    <p>No user data available.</p>
                )}
            </div>
        </section>
    );
}
