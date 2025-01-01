import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import removeimg from '../remove.jpg';

export default function MoneyType({ onRemove }) {
  let navigate = useNavigate();
  const [bankTransfer, setBankTransfer] = useState(false);
  const [mobileTransfer, setMobileTransfer] = useState(false);

  function BankTransfer(e) {
    e.preventDefault();
    setBankTransfer(true, navigate('/sendmoney'));
  }

  function MobileTransfer(e) {
    e.preventDefault();
    setMobileTransfer(true, navigate('/sendmobilemoney'));
  }

  return (
    <div className="for-divv text-center">
      <img src={removeimg} onClick={onRemove} alt="Remove" />
      <h4>Choose a method to Send money</h4>
      <Button onClick={BankTransfer} variant="warning" type="submit">
        Bank Transfer
      </Button>
      <Button onClick={MobileTransfer} variant="secondary" type="submit">
        Through Mobile
      </Button>
    </div>
  );
}
