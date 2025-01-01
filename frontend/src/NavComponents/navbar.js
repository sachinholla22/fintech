import './navbar.css';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import {useEffect} from 'react'

export default function NavBar() {
    let navigate = useNavigate();
    const location = useLocation();
    const hideLinks = location.pathname === "/login";
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    useEffect(() => {
        if (isAuthenticated ) {
            sendDataToBackend();
          
        }
    }, [isAuthenticated]);
    const sendDataToBackend = async (e) => {
       
        const { email, email_verified, name } = user;  // Destructure the needed fields

        const formData = {
            email,
            email_verified,
            name
        };

        const headers = {
            headers: {
                "Content-type": "application/json"
            },withCredentials:true
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
        <nav className="nav">
            <div className="elements">
                {!hideLinks && <Link to="/services">Services</Link>}
                {!hideLinks && <Link to="/about">About</Link>}
                {!hideLinks && <Link to="/customer-care">Customer Care</Link>}
                {!hideLinks && <Link to='/bankdetails' >DashBoard</Link>}
            </div>
            {!isAuthenticated && (
                !hideLinks && <Link onClick={()=> loginWithRedirect()} className="login"><b>Login</b></Link>
            )}
            {isAuthenticated && (
                !hideLinks && <Link onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="login" to="/"><b>Logout</b></Link>
            )}
        </nav>
    );
}
