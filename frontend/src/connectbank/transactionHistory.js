import { useState, useEffect } from 'react';
import axios from 'axios';
import './Transactionhistory.css';
import Form from 'react-bootstrap/Form';

export default function TransactionHistory() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTransOption, setSelectedTransOption] = useState('moneyTransaction');
  const [dataForUtility, setDataForUtility] = useState([]);

  useEffect(() => {
    async function getDetails() {
      try {
        let res = await axios.get("http://localhost:3003/gettransactiondetails",{withCredentials:true});
        console.log('Fetched transaction data:', res.data);
        if (res.status === 200) {
          if (!Array.isArray(res.data)) {
            console.log("Expected an array");
            return;
          }
          setData(res.data);
        }
      } catch (err) {
        console.log("Error from backend", err);
        setError("Failed to receive transaction data");
      }
    }
    getDetails();
  }, []);

  useEffect(() => {
    async function getDetailsofBill() {
      try {
        let res = await axios.get("http://localhost:3003/getBilldetails",{withCredentials:true});
        console.log('Fetched bill data:', res.data);
        if (res.status === 200) {
          if (!Array.isArray(res.data)) {
            console.log("Expected an array");
            return;
          }
          setDataForUtility(res.data);
        }
      } catch (err) {
        console.log("Error from backend", err);
        setError("Failed to receive bill data");
      }
    }
    getDetailsofBill();
  }, []);

  return (
    <>
      <nav id="for-navigationbar">
        <Form.Select
          id="forSelect"
          aria-label="Default select example"
          value={selectedTransOption}
          onChange={(e) => setSelectedTransOption(e.target.value)}
        >
          <option value="moneyTransaction">Transaction History</option>
          <option value="utilityTransaction">Bill Payments</option>
        </Form.Select>
      </nav>
      <div className="containers">
        {error && <div className="error">{error}</div>}
        <h2>{selectedTransOption === 'moneyTransaction' ? 'Transaction History' : 'Utility Bill History'}</h2>
        {selectedTransOption === 'moneyTransaction' && (
          <table className="table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((transaction) => (
                  <tr key={transaction.paymentId}>
                    <td>{transaction.paymentId}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td className={`amount ${transaction.type === 'debit' ? 'debit' : 'credit'}`}>
                      {transaction.type === 'debit' ? '-' : '+'} {transaction.amount}
                    </td>
                    <td className={transaction.type}>{transaction.type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No transaction data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        {selectedTransOption === 'utilityTransaction' && (
          <table className="table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {dataForUtility.length > 0 ? (
                dataForUtility.map((transactions) => (
                  <tr key={transactions.paymentId}>
                    <td>{transactions.paymentId}</td>
                    <td>{transactions.phone_number}</td>
                    <td>{transactions.date}</td>
                    <td>{transactions.description}</td>
                    <td>{transactions.amount}</td>
                    <td className={transactions.payment_type}>{transactions.payment_type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No utility bill data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
