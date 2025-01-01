import { useState,useEffect } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default function Step2EducationalLoan({ nextStep, previousStep }) {
    const [institutionName, setInstitutionName] = useState('');
    const [coursename, setCourseName] = useState('');
    const [courseduration, setCourseDuration] = useState('');
    const [currentYear, setCurrentYear] = useState('');
    const [graduationdate, setGraduationDate] = useState('');
    const [sslc, setSSLCcard] = useState(null);
    const [previouscard, setPreviousCard] = useState(null);
    const [carddescription, setDescriptionCard] = useState('');
const [has2nddata,set2nddata]=useState(false);
    useEffect(() => {
        async function fetcheducationalData() {
            try {
                let res = await axios.get("http://localhost:3003/getEducationalDatas",{withCredentials:true});
                if (res.status === 200 && res.data.data) {
                    set2nddata(true);
                    console.log(res, "Data found for existing user");
                } else {
                    set2nddata(false);
                    console.log(res, "No data available for new user");
                }
            } catch (error) {
                console.error("Error while retrieving personal details:", error);
            }
        }
        fetcheducationalData();
    }, []);
    async function submitEducationalDetails(e) {
        e.preventDefault();
        let datas = new FormData();
        datas.append('institutionName', institutionName);
        datas.append('courseName', coursename);
        datas.append('courseDuration', courseduration);
        datas.append('currentYear', currentYear);
        datas.append('graduationDate', graduationdate);
        datas.append('sslc', sslc);
        datas.append('markscard', previouscard);
        datas.append('marksCardDescription', carddescription);

        const header = {
            headers: {
                'Content-type': "multipart/form-data"
            },withCredentials:true
        };
        try {
            let result = await axios.post("http://localhost:3003/sendEducationaldatas", datas, header);
            if (result.status === 200) {
                console.log(result);
                alert("Data submitted successfully");
            }
        } catch (err) {
            console.log(err.response, "error from database");
        }
    }

    return (
        <>
            <form className="loanFinancialDetailsForm">
                <div className="form-group">
                    <label>Institution Name: </label>
                    <input
                        type="text"
                        name="institutonName"
                        placeholder="Enter the name of Institution"
                        onChange={(e) => setInstitutionName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Course Name:</label>
                    <input
                        type="text"
                        name="courseName"
                        placeholder="Enter The Course Name"
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Course Duration:</label>
                    <input
                        type="text"
                        name="courseDuration"
                        placeholder="Enter the Duration of the course"
                        onChange={(e) => setCourseDuration(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Current Year of Study: </label>
                    <input
                        type="text"
                        name="currentYear"
                        placeholder="Enter Your Current Year of Study"
                        onChange={(e) => setCurrentYear(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Expected Graduation Date:</label>
                    <input
                        type="date"
                        name="graduationDate"
                        onChange={(e) => setGraduationDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Upload SSLC Marks Card:</label>
                    <input type="file" onChange={(e) => setSSLCcard(e.target.files[0])} name="sslc" />
                </div>
                <div className="form-group">
                    <label>Upload previous Years of your Study Marks Card:</label>
                    <input type="file" onChange={(e) => setPreviousCard(e.target.files[0])} name="markscard" />
                </div>
                <div className="form-group">
                    <label>Description of the Previous Marks Card:</label>
                    <input
                        type="text"
                        onChange={(e) => setDescriptionCard(e.target.value)}
                        name="marksCardDescription"
                        placeholder="e.g., 3rd Year CS Engineering Marks Card"
                        required
                    />
                </div>
                <Button type="submit" onClick={submitEducationalDetails} disabled={has2nddata}className="custom-step2save-btn">Save</Button>
                <Button type="button" onClick={previousStep} className="custom-previouss-btn">Previous</Button>
                <Button type="submit" onClick={nextStep} className="custom-set2next-btn">Next</Button>
            </form>
        </>
    );
}
