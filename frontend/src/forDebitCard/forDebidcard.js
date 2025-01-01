import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboardofdebitcard.css'; // External CSS

export default function DashboardOfDebitCard() {
  let navigate = useNavigate();
  const [hasUser, setHasUser] = useState(false);
  const [hasDebitcard, setHasDebitcard] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        let res = await axios.get('http://localhost:3003/debituser-exists',{withCredentials:true});
        if (res.status === 200 && res.data.data.length > 0) {
          setHasUser(true);
        } else {
          setHasUser(false);
        }
      } catch (error) {
        setHasUser(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function fetchApplicationId() {
      try {
        const response = await axios.get('http://localhost:3003/getdebitcardapplicationId',{withCredentials:true});
        if (response.status === 200 && response.data.application_id) {
          setApplicationId(response.data.application_id);
        }
      } catch (error) {
        console.error('Error fetching application ID:', error);
      }
    }
    fetchApplicationId();
  }, []);

  async function AddDebitCard(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3003/create-debitcard', { application_id: applicationId },{withCredentials:true});
      if (res.status === 200) {
        alert('Debit card created successfully');
        navigate('/viewdebitcarddetails');
      } else {
        alert('Failed to create debit card');
      }
    } catch (err) {
      alert('Failed to create debit card. Please try again later.');
    }
  }

  useEffect(() => {
    async function hasDebitApplied() {
      try {
        let result = await axios.get('http://localhost:3003/has-debitcardapplied',{withCredentials:true});
        setHasDebitcard(result.status === 200);
      } catch (error) {
        console.log("Error during API call", error);
      }
    }
    hasDebitApplied();
  }, []);

  function viewDebitCard(e) {
    e.preventDefault();
    navigate('/viewdebitcarddetails');
  }

  function toapply(e) {
    e.preventDefault();
    navigate('/applypersonaldetails');
  }

  return (
    <div className="dashboard-container">
      {!hasDebitcard && (
        <div className="inner-container">
          {!hasUser ? (
            <div className="section">
              <h3 className="section-heading">Apply Debit Card</h3>
              <p>Please provide your personal details to apply for a debit card.</p>
              <Button onClick={toapply} variant="primary">Apply Debit Card</Button>
            </div>
          ) : (
            <div className="section">
              <h3 className="section-heading">Add Debit Card</h3>
              <p>You have applied for a debit card. Now you can add your debit card.</p>
              <Button onClick={AddDebitCard} variant="success">Add Debit Card</Button>
            </div>
          )}
        </div>
      )}
      {hasDebitcard && (
        <div className="inner-container">
          <div className="section">
            <h3 className="section-heading">View Your Debit Card</h3>
            <p>You have already added the debit card. You can view your card details now.</p>
            <Button onClick={viewDebitCard} variant="success">View Debit Card</Button>
          </div>
        </div>
      )}
    </div>
  );
}
