import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';


export default function ViewDetails() {
  const [userData, setUserData] = useState([]);
  let navigate=useNavigate();


  function goBack(){
    navigate('/bankdetails')
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/getnewuser',{withCredentials:true});
        console.log('Fetched user data:', response.data);
       if(response.status==200){
        // Check if response data is an array
        if (!Array.isArray(response.data)) {
          console.error('Expected an array but got:', response.data);
          return; // Exit the function if not an array
        }

        setUserData(response.data);
       }
       else{
        console.log("data cannot be retreived")
       }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
     <p onClick={goBack} style={{position:"relative",top:"2%",left:"1%",fontWeight:"bolder"}}  variant="success"type="submit"> Back</p>
      <h2>Your Info</h2>
      <table className='table'>
        <thead>
          <tr>
           
            <th>Name</th>
            <th>DOB</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Aadhar</th>
            <th>Gender</th>
            <th>Initial Amount</th>
           
            <th>Username</th>
            {/* Omit displaying passwords in the UI for security */}
            <th>Account Number</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
             
              <td>{user.name}</td>
              <td>{user.dob}</td>
              <td>{user.city}</td>
              <td>{user.pincode}</td>
              <td>{user.phnumber}</td>
              <td>{user.email}</td>
           <td>{user.aadhar}</td> {/* Conditionally render Aadhar */}
              <td>{user.gender}</td>
              <td>{user.initialamt}</td>
            
              <td>{user.username}</td>
              {/* Omit displaying passwords */}
              <td>{user.accNum}</td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </>
  );
}
