import Form from 'react-bootstrap/Form';
import './forloantype.css';
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from'axios';
import { useNavigate,Link } from 'react-router-dom';

export default function LoanType() {
  const [selectVal, setSelectVal] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  let navigate=useNavigate();

  function ForVal(e) {
    setIsSubmitted(false);
    setSelectVal(e.target.value); // Fixed 'value' attribute
  }

  function Onsubmitting(e) {
    e.preventDefault();
    setIsSubmitted(true);
    if(selectVal=="personalLoan"){
      navigate('/personalLoan')
    }
    if(selectVal=="educationalLoan"){
      navigate('/educationalLoan')
    }
    if(selectVal=="housingLoan"){
      navigate('/housingLoan')
    }
    if(selectVal=="vechicleLoan"){
      navigate('/vechicleLoan')
    }
    if(selectVal=="businessLoan"){
      navigate('/businessLoan')
    }
  }
  const [hasPeronalLoan,setPeronalloan]=useState(false);

  useEffect(() => {
    async function hasPeronalloan() {
        try {
            let res = await axios.get("http://localhost:3003/getPersonalloan",{withCredentials:true});
            if (res.status == 200 && res.data.data) {
                setPeronalloan(true);  // Existing user, data already saved
                console.log(res, "Data found for existing user");
            } else {
                setPeronalloan(false); // New user, no data found
                console.log(res, "No data available for new user");
            }
        } catch (error) {
            console.error("Error while retrieving personal details:", error);
        }
    }
    hasPeronalloan();
}, []);

  return (
    <>
      <div className="forLoantypebackground">
        <div className="forLoantypebox">
          <h3>Select What Type of loan you want</h3>
          <div className="forContentofselect">
            <h6>I'm Interested in Leveraging</h6>
            <Form onSubmit={Onsubmitting}>
              <Form.Select value={selectVal} onChange={ForVal} aria-label="Default select example">
                <option value="">Select a Loan Type</option>
                <option value="personalLoan">Personal Loan</option>
                <option value="educationalLoan">Educational Loan</option> {/* Fixed spelling */}
              { /* <option value="housingLoan">Housing Loan</option>
                <option value="vechicleLoan">Vehicle Loan</option> 
                <option value="businessLoan">Business Loan</option>*/}
              </Form.Select>
              <Button type="submit" className='custom-submit-btn'>Submit</Button>
            </Form>
          </div>
          <p><b>Note:</b> The Interest Rates may vary depends upon the Loan types</p>
          <p>You may also required to submit the document as per the Loan Type</p>
     {/* <Link id="loanApplyLink"to='/hasLoans'>Applied Any loans?</Link>*/}
        </div>
      </div>
    </>
  );
}
