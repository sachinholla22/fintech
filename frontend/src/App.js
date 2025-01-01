
import './App.css';
import React from "react";
import {BrowserRouter,Routes,Route,useLocation} from "react-router-dom";
import Services from './NavComponents/services.js'
import About from './NavComponents/about.js'
import CustomerCare from './NavComponents/customercare.js'
import DashBoard from './NavComponents/dashboard.js'
import Login from './NavComponents/login.js'
import NavBar  from './NavComponents/navbar';
import './NavComponents/services.css'
import HomePage from './NavComponents/homePage.js';
import SignUpPage from './NavComponents/signup.js';
import BankConnect from './connectbank/interfaceConnectbank.js';
import BankDetails from './connectbank/bankdetails.js'
import NewUsersBank from './connectbank/newUsersBank.js';
import ViewDetails from './connectbank/fulldetailsview.js';
import MainBank from './connectbank/mainBank.js';
import SendMoney from './connectbank/sendmoney.js';
import MobileTransfer from './connectbank/mobilemoney.js';
import TransactionHistory from './connectbank/transactionHistory.js';
import CreditCard from './forCards/forCreditcard.js';
import ApplyCreditCard from './forCards/aplyCreditCard.js';
import AdminLogin from './adminlogin.js';
import ViewUsers from './viewsusers.js';
import ViewCreditCardUsers from './viewCreditcardusers.js';
import ViewCardStatus from './forCards/viewcardstatus.js';
import Addcreditcard from './forCards/addCreditCard.js';
import DisplayCreditCard from './forCards/displayCrediCard.js';
import PayBills from './connectbank/paybills.js';
import ElectricBill from './connectbank/electricbill.js';
import PayUsingCredit from './connectbank/payusingCredit.js';
import DashboardOfDebitCard from './forDebitCard/forDebidcard.js';
import ApplyDebitcard from './forDebitCard/applydebitcard.js';
import ViewDebitUsers from './forDebitCard/viewDebituser.js';
import LoanType from './Loans/forLoanTypepage.js';
import PersonalLoan from './Loans/forPersonalLoan..js';
import EducationalLoan from './Loans/EducationalLoan/forEducationalLoan.js';
import HousingLoan from './Loans/housingLoan..js';
import VechicleLoan from './Loans/vechicleLoan.js';
import BusinessLoan from './Loans/businessLoan.js';
import AllLoanApplications from './adminLoanApplication.js';
import ViewPersoApplication from './viewPersoApplication.js';
import WaterBill from './connectbank/waterBill..js';
import PayUsingDebit from './connectbank/payUsingDebit.js';
import MonitorUsers from './MonitorUsers.js';
import MobileRecharge from './connectbank/MobileRecharge.js';
import ReviewEducationLoan from './reviewEducationLoan.js';
import ValidateSignUpForm from './validateSignUpForm.js';
import ValidateNewBankUser from './connectbank/ValidateNewBankUser.js';
import SuccessfullLogin from './SuccessfullLogin.js';


function App() {
 
 
const location=useLocation();
const hideNavBarPaths = ["/login",'/validatenewbankuser','/validateSignupform','/vieweducationalloanapplication','/gotorecharge','/viewuseraccounts','/payusingdebit','/gotowaterbill','/viewpersonalloanapplication','/loanApplications','/educationalLoan','/housingLoan','/businessLoan','/vechicleLoan','/personalLoan','/loantype','/viewdebitcarddetails','/customer-care','/services','/about','/applypersonaldetails','/fordebitcard','/payusingcredit','/paybills','/payelectricbill','/displaycreditcard','/add-creditcard','/viewcreditcardstatus','/viewcreditusers','/gotoviewusers','/applytocreditcard',,'/gotoadminlogin','/creditcard','/sendmoney','/signup','/forcards','/dashboard','/sendmobilemoney','/checkacc','/bankdetails','/newbank','/fulldetailsview','/mainBank','/transactionhistory'];


  return (
    <>

{!hideNavBarPaths.includes(location.pathname) && <NavBar />}
   
    <Routes>

        <Route path="/services" element={<Services />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/customer-care" element={<CustomerCare  />}/>
       <Route path="/dashboard" element={<DashBoard />}/>
        <Route path="/login" element={<Login label={'Name'} label0={'Password'}/>}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path="/" element={<HomePage />}></Route> 
        <Route path="/addbank" element={<BankConnect />}/>
        <Route path="/bankdetails" element={<BankDetails />}/>
        <Route path="/newbank" element={<NewUsersBank />}/>
        <Route path="/fulldetailsview" element={<ViewDetails />}/>
        <Route path='/mainBank' element={<MainBank />}/>
        <Route path='/sendmoney' element={<SendMoney />}/>
        <Route path='/sendmobilemoney' element={<MobileTransfer />}/>
        <Route path='/transactionhistory' element={<TransactionHistory/>}/>
        <Route path='/creditcard' element={<CreditCard/>}/>
        <Route path='/applytocreditcard' element={<ApplyCreditCard />}/>
        <Route path='/gotoadminlogin' element={<AdminLogin />}/>
        <Route path='/gotoviewusers' element={<ViewUsers />}/>
        <Route path='/viewcreditusers' element={<ViewCreditCardUsers />}/>
        <Route path='/viewcreditcardstatus' element={<ViewCardStatus />}/>
        <Route path='/add-creditcard' element={<Addcreditcard />}/>
        <Route path='/displaycreditcard' element={<DisplayCreditCard />}/>
        <Route path='/paybills' element={<PayBills />}/>
        <Route path='/payelectricbill' element={<ElectricBill />}/>
        <Route path='/payusingcredit' element={<PayUsingCredit />}/>
        <Route path='/fordebitcard' element={<DashboardOfDebitCard />}/>
        <Route path='/applypersonaldetails' element={<ApplyDebitcard />}/>
        <Route path='/viewdebitcarddetails' element={<ViewDebitUsers />}/>
        <Route path='/loantype' element={<LoanType />}/>
        <Route path='/personalLoan' element={<PersonalLoan />}/>
        <Route path='/educationalLoan' element={<EducationalLoan />}/>
        <Route path='/housingLoan' element={<HousingLoan />}/>
        <Route path='/vechicleLoan' element={<VechicleLoan />}/>
        <Route path='/businessLoan' element={<BusinessLoan />}/>
        <Route path='/loanApplications' element={<AllLoanApplications />}/>
        <Route path='/viewpersonalloanapplication' element={<ViewPersoApplication />}/>
        <Route path='/gotowaterbill' element={<WaterBill />}/>
        <Route path='/payusingdebit' element={<PayUsingDebit />}/>
        <Route path='/viewuseraccounts' element={<MonitorUsers />}/>
        <Route path='/gotorecharge' element={<MobileRecharge />}/>
        <Route path='/vieweducationalloanapplication' element={<ReviewEducationLoan />}/>
        <Route path='/validateSignupform' element={<ValidateSignUpForm />}/>
        <Route path='/validatenewbankuser' element={<ValidateNewBankUser />}/>
    </Routes>
  
  
   
  
    </>
 
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
export default AppWrapper;
