export default function ValidateSignUpForm({name = '', email = '', password = '', dob = '', contact = '', address = ''}){
    let error = {};
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if(!name){
        error.name = "Name is required and shouldn't be empty";
        isValid = false;
    }
    if(!email){
        error.email = "Email must not be empty";
        isValid = false;
    } else if(!emailPattern.test(email)){
        error.email = "Email format is not correct. Please provide a valid email address";
        isValid = false;
    }

    if(!password){
        error.password = "Please enter a password";
        isValid = false;
    } else if(password.length < 6){
        error.password = "Minimum password length must be 6 characters";
        isValid = false;
    }

    if (!dob) {
        error.dob = "Date of birth is required";
        isValid = false;
    }

    if (!contact) {
        error.contact = "Contact number is required";
        isValid = false;
    }

    if (!address) {
        error.address = "Address is required";
        isValid = false;
    }

    return { error, isValid };
}
