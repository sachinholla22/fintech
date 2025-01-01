import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useState } from 'react';
import './applydebitcard.css'; // External CSS

export default function ApplyDebitcard() {
  const [name, setName] = useState('');
  const [accnum, setAccnum] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [Id, setId] = useState('');
  const [idnumber, setIdnumber] = useState('');
  const [idpic, setIdpic] = useState(null);
  const [error, setError] = useState('');
  const [debitpin, setDebitpin] = useState('');

  async function SubmitData(e) {
      e.preventDefault();
      const dataform = new FormData();
      dataform.append('name', name);
      dataform.append('bankacc', accnum);
      dataform.append('dateofbirth', dob);
      dataform.append('contact', contact);
      dataform.append('address', address);
      dataform.append('Id', Id);
      dataform.append('idnumber', idnumber);
      dataform.append('debitpin', debitpin);
      dataform.append('idphoto', idpic);

      let Headers = {
          headers: {
              'Content-type': 'multipart/form-data',
          },withCredentials:true
      };

      try {
          let results = await axios.post('http://localhost:3003/savedebitcarddetails', dataform, Headers);
          console.log(results);
          if (results.status === 200) {
              console.log('sent data successfully');
              alert('Data entered successfully');
          }
      } catch (err) {
          console.log(err.response, 'Error while sending data to backend');
          if (err.response && err.response.status === 400) {
              setError('Invalid Account number');
          } else {
              setError('An unexpected error occurred');
          }
      }
  }

  return (
      <div className="formContainer">
          <h3>Enter The Required Details to Apply Debit Card</h3>
          <Form>
              <Form.Group className="inputField">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" onChange={(e) => setName(e.target.value)} name="name" />
              </Form.Group>

              <Form.Group className="inputField">
                  <Form.Label>Enter Bank Account Number</Form.Label>
                  <Form.Control onChange={(e) => setAccnum(e.target.value)} type="text" name="bankacc" />
              </Form.Group>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <Form.Group className="inputField">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" onChange={(e) => setDob(e.target.value)} name="dateofbirth" />
              </Form.Group>

              <Form.Group className="inputField">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control type="text" onChange={(e) => setContact(e.target.value)} name="contact" />
              </Form.Group>

              <Form.Group className="inputField">
                  <Form.Label>Permanent Address</Form.Label>
                  <Form.Control as="textarea" onChange={(e) => setAddress(e.target.value)} name="address" />
              </Form.Group>

              <Form.Select onChange={(e) => setId(e.target.value)}>
                  <option value="">Select Type of ID</option>
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan-card">PAN Card</option>
                  <option value="Driving-Lisence">Driving License</option>
              </Form.Select>

              <Form.Group className="inputField">
                  <Form.Label>Enter ID Number</Form.Label>
                  <Form.Control onChange={(e) => setIdnumber(e.target.value)} type="text" name="idnumber" />
              </Form.Group>

              <Form.Group className="inputField">
                  <Form.Label>Set Debit Card Pin</Form.Label>
                  <Form.Control onChange={(e) => setDebitpin(e.target.value)} type="password" name="debitpin" />
              </Form.Group>

              <Form.Group className="inputField">
                  <Form.Label>Upload ID Card File</Form.Label>
                  <Form.Control onChange={(e) => setIdpic(e.target.files[0])} type="file" name="idphoto" />
                  <Form.Text className="text-muted">File must be pdf, .jpg, or .png only</Form.Text>
              </Form.Group>

              <Button onClick={SubmitData} variant="primary" type="submit" className="formButton">
                  Submit
              </Button>
          </Form>
      </div>
  );
}
