import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreditCard.css'; // Import the CSS file

export default function CreditCard() {
    const navigate = useNavigate();
    const [applicationId, setApplicationId] = useState("");
    const [hasAcc, setAccounts] = useState(false);

    useEffect(() => {
        async function fetchApplicationId() {
            try {
                const response = await axios.get("http://localhost:3003/getapplicationId",{withCredentials:true});
                if (response.status === 200) {
                    setApplicationId(response.data.application_id);
                    console.log("Got application Id:", response.data.application_id);
                } else {
                    console.log("Failed to fetch application ID");
                }
            } catch (error) {
                console.error("Error fetching application ID:", error);
            }
        }

        fetchApplicationId();
    }, []);

    useEffect(() => {
        async function checkAccount() {
            try {
            let res = await axios.get('http://localhost:3003/account-detailsofcreditcard',{withCredentials:true});
                if (res.status === 200) {
                    setAccounts(true);
                } else {
                    setAccounts(false);
                }
            } catch (error) {
                console.log("Cannot retrieve data");
            }
        }
        checkAccount();
    }, []);
    const [hasApplication,sethasApplication]=useState(false);
    
    useEffect(() => {
        async function checkhasApplication() {
            try {
                let res = await axios.get('http://localhost:3003/hascreditcardapplication',{withCredentials:true});
                if (res.status === 200) {
                    sethasApplication(true);
                    console.log("has application from backend")
                } else {
                    sethasApplication(false);
                    console.log("no application of this user")
                }
            } catch (error) {
                console.log("Cannot retrieve data no application");
            }
        }
        checkhasApplication();
    }, []);
    async function AddCreditCard(e) {
        e.preventDefault();
        const data = { application_id: applicationId };

        const headers = {
            headers: { "Content-Type": "application/json" },withCredentials:true
        };

        try {
            const res = await axios.post("http://localhost:3003/create-creditcard", data, headers);
            console.log("Response from backend:", res.data);
            if (res.status === 200) {
                alert("Credit card created successfully");
                navigate('/displaycreditcard');
            } else {
                alert("You Haven't applied credit card or Your credit Card application may be under review")
                console.log("Failed to create credit card");
            }
        } catch (err) {
            console.error("Error creating credit card:", err);
            alert("Failed to create credit card. Please try again later.");
        }
    }

    function GotoNewCreditCard(e) {
        e.preventDefault();
        navigate("/applytocreditcard");
    }

    function GoToCreditCardStatus(e) {
        e.preventDefault();
        if(hasApplication){
        navigate("/viewcreditcardstatus");
        }else{
            alert("You have Not applied Credit Card Application Please apply to View Status")
        }
    }

    function DisplayCreditCard(e) {
        e.preventDefault();
        navigate('/displaycreditcard');
    }

    return (
        <div className="creditCardContainer">
            <div className="creditCardInfo">
                <h3>About Your Credit Card</h3>
                <div className="buttonGroup">
                    {!hasAcc ? (
                        <>
                    {!hasApplication && (
                            <div className="buttonBox">
                                <Button onClick={GotoNewCreditCard} className="buttonPrimary" type="button">
                                    Apply for Credit Card
                                </Button>
                            </div>
                       )}
                            <div className="buttonBox1">
                                <Button onClick={GoToCreditCardStatus} className="buttonPrimary" type="button">
                                    View Credit Card Status
                                </Button>
                            </div>
                            <div className="buttonBox2">
                                <Button onClick={AddCreditCard} className="buttonWarning" type="button">
                                    Add Credit Card
                                </Button>
                            </div>
                            {hasApplication &&(
                                <p style={{color:"red"}}>* You have already applied for the Credit Card application please wait for the review and check status</p>
                            )}
                        </>
                    ) : (
                        <div className="buttonBox">
                            <Button onClick={DisplayCreditCard} className="buttonWarning" type="button">
                                View Details of Credit Card
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
