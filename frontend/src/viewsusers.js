import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './viewUsers.css'; // Import the external CSS file

export default function ViewUsers() {
    let navigate = useNavigate();

    function gotoCreditCardHoldersPage(e) {
        e.preventDefault();
        navigate('/viewcreditusers');
    }

    function gotoUserAccountsPage(e) {
        e.preventDefault();
        navigate('/viewuseraccounts');
    }
    function gotoLoanApplication(e){
        e.preventDefault();
        navigate('/loanApplications')
    }

    return (
        <div className="view-users-container">
            <div className="view-users-box">
                <h2>Manage</h2>
                <div className='button-group'>
                    <Button
                        onClick={gotoCreditCardHoldersPage}
                        type='button'
                        className='view-button credit-card-button'
                    >
                        View Credit Card Holders
                    </Button>
                    <Button
                        onClick={gotoLoanApplication}
                        type='button'
                        className='view-button loan-application-button'
                    >
                        View Loan Applications
                    </Button>
                    <Button
                        onClick={gotoUserAccountsPage}
                        type='button'
                        className='view-button user-accounts-button'
                    >
                        View User Accounts
                    </Button>
                </div>
            </div>
        </div>
    );
}
