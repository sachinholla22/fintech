import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ViewDebitUsers() {
  let [dataa, setdataa] = useState([]);
  

  useEffect(() => {
    async function hasdata() {
      try {
        let result = await axios.get('http://localhost:3003/get-debit-user',{withCredentials:true});
        console.log("API call result:", result);
        if (result.status === 200) {
          if (Array.isArray(result.data.data)) {
            setdataa(result.data.data);
          } else {
            console.log('Unexpected data format:', result.data);
            setdataa([]);
          }
        } else {
          console.log('Could not get data');
        }
      } catch (err) {
        console.log(err.response, "caught error from backend");
        setdataa([]);  // Ensure dataa is an empty array in case of an error
      }
    }
    hasdata();
  }, []);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Debit Card Number</th>
            <th>Expire Date</th>
            <th>CCV Number</th>
            <th>Issuance Date</th>
          </tr>
        </thead>
        <tbody>
          {
            dataa.map((transactions) => (
              <tr key={transactions.card_Id}>
                <td>{transactions.name}</td>
                <td>{transactions.contact}</td>
                <td>{transactions.debit_card_number}</td>
                <td>{transactions.expiry_date}</td>
                <td>{transactions.cvv}</td>
                <td>{transactions.issuance_date}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}
