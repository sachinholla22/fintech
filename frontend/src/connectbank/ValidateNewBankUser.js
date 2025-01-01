export default function ValidateNewBankUser({name="",dob="",city="",pincode="",phnumber="",email="",aadhar="",gender="",initialAmt='',firstPin='',pin='',username='',firstPassword='',password=''}){
   
    let errors={};
    let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid=true;
    

    if(!name){
        errors.name='*Please provide a  name';
        isValid=false;

    }
    if(!dob){
        errors.dob="*Please Enter the date of birth";
        isValid=false;
    }
    if(!city){
        errors.city="*Please Enter the city";
        isValid=false;
    }
    if(!pincode||typeof pincode !== 'string'|| !isFinite(pincode) ){
        errors.pincode="*Please Enter the valid Pincode";
        isValid=false
    }else if(pincode.length!==6){
        errors.pincode="*Pincode must be length of 6  "
        isValid=false;
    }

    if(!phnumber||isNaN(phnumber)){
        errors.phnumber="*Please provide a valid phone number";
        isValid=false;
    }
    else if(phnumber.length!==10){
        errors.phnumber="*Phone number Must be a 10 digit";
        isValid=false;

    }

    if(!email){
        errors.email="*Please Provide an email";
        isValid=false;

    }else if(!emailPattern.test(email)){
        errors.email="*Wrong pattern of email";
        isValid=false;
    }

    if(!aadhar||isNaN(aadhar)){
        errors.aadhar="*Please provide a valid aadhar number";
        isValid=false;
    }
    else if(aadhar.length!==12){
        errors.aadhar="*Aadhar number Must be a 12 digit";
        isValid=false;

    }

    
    if(!gender){
        errors.gender="*Please select a gender";
        isValid=false;
    }
    if(!initialAmt||isNaN(initialAmt)){
        errors.initialAmt="*Please Provide a initial Amount";
        isValid=false;
    }else if(Number(initialAmt)<2000){
        errors.initialAmt="*Amount must be equal or greater than Rs 2000";
        isValid=false;
    }

    if(!firstPin|| isNaN(firstPin)){
        errors.firstPin="*Please Enter a valid pin Number";
        isValid=false;

    }else if(firstPin.length!==4){
        errors.firstPin="*The Pin Number Must Not Exceed The Length of 4";
        isValid=false;
    }
    if(!pin){
        errors.pin="*Please Re-enter the Pin";
        isValid=false;
    }
    else if(pin!==firstPin){
        errors.pin="*The value of pin doesnt match!";
        isValid=false;
    }

    if(!username){
        errors.username='*Please enter a UserName';
        isValid=false;
    }

    if(!firstPassword){
        errors.firstPassword='*Please provide a password';
        isValid=false;
    }
    else if(firstPassword.length<6){
        errors.firstPassword="*Password Must Contain Atleast 6 characters"

    }
    if(!password){
        errors.password='*Please Re-Enter a password';
        isValid=false;
    }else if(password!==firstPassword){
        errors.password="*Please Provide the same password as above"
    }
    
    return {errors,isValid}

}