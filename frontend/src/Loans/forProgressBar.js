import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const LoanApplicationProgress = ({ step }) => {
    const progressPercentage = (step / 3) * 100; // Assuming there are 3 steps
  
    return (
      <div className="progress-container" style={{ width: '100%', marginBottom: '20px' }}>
        <ProgressBar now={progressPercentage}  />
      </div>
    );
  };
  
  export default LoanApplicationProgress;