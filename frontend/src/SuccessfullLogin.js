import React from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react";


function SuccessfullLogin() {

   const navigate=useNavigate()
    const {user} =useAuth0()
    console.log(user,"successs console")
    const sendDataToBackend = async (e) => {
        e.preventDefault()
        const { email, email_verified, name } = user;  // Destructure the needed fields

        const formData = {
            email,
            email_verified,
            name
        };

        const headers = {
            headers: {
                "Content-type": "application/json"
            }
        };

        try {
            const res = await axios.post("http://localhost:3003/signup1", formData, headers);
            console.log(res,"sent to backend");
            navigate('/')
         
        } catch (err) {
            console.log("Error occurred in catch", err.response);
        }
    };
  return (
    <div>
      You have Successfully Logged in 
      <button onClick={ sendDataToBackend }> Go to Home</button>
    </div>
  )
}

export default SuccessfullLogin
