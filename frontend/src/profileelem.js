import './forProfile.css';
import { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function ProfileElement() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  return (
    <>
      <div
    
        onClick={handleShow}
      
       
        id="forprofile"
      >
       <div id="for-profileicon"></div>
       <div id="for-profileicon1"></div>
       <div id="for-profileicon2"></div>
      </div>
      <div  className="forSlider">
        {/* Adjust the content of the slider menu as per your design */}
        <div className="sliderContent">
        <Offcanvas show={show} onHide={handleClose} className="custom-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Link style={{textDecoration:"none",fontSize:"21px"}}to="/gotoadminlogin">Bank Admin</Link>
     
        </Offcanvas.Body>
      </Offcanvas>
        
        </div>
      </div>
    </>
  );
}
