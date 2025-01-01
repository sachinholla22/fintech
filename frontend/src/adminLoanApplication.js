import Button from 'react-bootstrap/Button';
import './adminLoanapplication.css'
import { useNavigate } from 'react-router-dom';
export default function AllLoanApplications(){
let navigate=useNavigate();

function gottoPersonalApplication(e){
e.preventDefault();
navigate('/viewpersonalloanapplication')
}

function gottoEducationalApplication(e){
    e.preventDefault();
    navigate('/vieweducationalloanapplication')
    }
    return (
    <>
    <section className="foeViewallapplication-background">
 <div className="view-application-container">
            <div className="view-application-box">
                <h2>Select the type of Loan Application</h2>
                <div className='button-group'>
                    <Button
                       onClick={gottoPersonalApplication}
                        type='button'
                        className='view-button credit-card-button'
                    >
                        View Personal Loan Applications
                    </Button>
                    <Button
                      onClick={gottoEducationalApplication}
                        type='button'
                        className='view-button loan-application-button'
                    >
                        View Educational Loan Applications
                    </Button>
                 
                </div>
            </div>
        </div>
        </section>
    </>
    )
}