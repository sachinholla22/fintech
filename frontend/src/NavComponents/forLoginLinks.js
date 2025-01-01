import './forLoginLinks.css'
import { useState } from 'react'
import remove from '../remove.jpg'


export default function LoginLinks(props){

    

    
    return(
        <>
       <div className="forWholeBackground">
       <img onClick={props.onRemove1}src={remove}/>
        <div className='boxForphnumber'>
            <nav>
              
                <p ><center><b>!!Important!!</b></center></p></nav>
            <p>

1.Do not provide Your User name and password anywhere other than in this page.<br></br>



2.Bank never sends E-mail for getting customer information.Please report immediately if you receive any E-mail purported to be originated by Bank to gather your user name or Password or any other personal information.This may be phishing mail.<br></br>

3.Personal information for accesss control will be kept confidential.<br></br>

4.For best viewing of this website use latest verson of Google Chrome or Mozilla Firefox.<br></br>
</p>
        </div>
        </div>


        
        </>
    )
}

export function PhoneInfo(props){
    return(
        <>
         <div className="forWholeBackground">
         <img onClick={props.onRemove2}src={remove}/>
         <div className='boxForphnumber'>
         <nav>
            <h3>Customer Care</h3>
            </nav>
           <p id="pee">You can reach us through the following modes<br></br>
  

  Call us at   1930-921-1234 (Toll-free)<br></br>
    
  
  Drop us a mail at   ccc[at]ktkbank[dot]com</p>
         </div>
         </div>
        </>
    )

}



export function SecurityInfo(props){
    return(
        <>
         <div className="forWholeBackground">
         <img onClick={props.onRemove3}src={remove}/>
         <div className='boxForphnumber'>
         <nav>
            <h4>!!Security Alert!!</h4>
            </nav>
           <p id="pee1">
           We suggest you not to login from Internet browsing centers/publicly available internet machines. If you login from your home / office machines , please ensure and verify that the ANTI-VIRUS pattern/signature files are up <p> to date </p>
           </p>
         </div>
         </div>
        </>
    )

}


export function Privacy(props){
    return(
        <>
         <div className="myBackground">
         <img onClick={props.onRemove4}src={remove}/>
         <div className='boxForPrivacy'>
         <nav>
            <h4>Privacy Policy</h4>
            </nav>
           <p id="pee1">
           The information of customers and others who visit the Bank's website we believe it is necessary to post a privacy statement. 
The information shared with the Bank will be treated as private. We also desire to say explicitly that adequate precautions have been taken to protect information relating to customers and their dealings with the Bank from the mischievous and the fraudsters.sters.

The Bank has adopted the privacy policy aimed at protecting the personal information entrusted and disclosed by the customers.
This policy governs the way in which the Bank collects, uses, discloses, stores, secures and disposes of personal information and sensitive personal data or information.

The Bank collects and uses the financial information and other personal information from its customers. 
This information is collected and used for specific business purposes or for other related purposes designated by the Bank or for a lawful purpose to comply with the applicable laws and regulations. The Bank shall not divulge any personal information collected from the customer, for cross selling or any other purposes.

           </p>
         </div>
         </div>
        </>
    )

}

export function Disclaimer(props){
    return(
        <>
         <div className="myBackground">
         <img onClick={props.onRemove5}src={remove}/>
         <div className='boxForPrivacy'>
         <nav>
            <h4>Disclaimer</h4>
            </nav>
           <p id="pee1">
           Bank has made all efforts to ensure that the contents of this website do not contain any mistakes, omissions, inaccuracies, typographical and other errors. 
However, Bank assumes no responsibility, if any such errors are there in the contents of the website. Bank makes no warranty or

Representation that this website is free from all errors, mistakes, etc.

Hyper links, if any, to other Internet websites are at user's own risk. The contents of these sites are not verified or endorsed by  
Bank in any way.Bank makes  no warranty  or representation that  the  contents   of  such  websites  are error-free and correct.

Bank has taken all steps to prevent the introduction of viruses, worms or other destructive material to this website. 
However, Bank does not guarantee or warrant that this website or the material that may be downloaded from this website does not contain  
any  such destructive material. Bank shall not be liable for  any  harm  or  damages  which  may  be  caused  due  to  such destructive Material  if present in this website.



           </p>
         </div>
         </div>
        </>
    )

}


export function Terms(props){
    return(
        <>
         <div className="myBackground">
         <img onClick={props.onRemove6}src={remove}/>
         <div className='boxForPrivacy'>
         <nav>
            <h4>Terms & Conditions</h4>
            </nav>
           <p id="pee1">
          
 1) Applicability of terms:
These terms form the contract between the User and the Bank. By applying for e-banking of BOB to access and utilize the various services so offered, the User acknowledges and accepts these terms. These terms will be in addition and not in derogation of the terms and conditions relating to any account of the User
2)   Software:
The Bank will advise from time to time the Internet software such as Browsers, which are required for using e-banking. There will be no obligation on the Bank to support all the versions of this Internet software. The User shall upgrade his software, hardware and the operating systems at his own cost from time to time and the Bank shall be under no obligation to support the software, hardware, operating systems of the User and that the same shall be the sole responsibility of the User.
 3) Joint Accounts:
     E-banking facility can be availed by the following persons for a Retail User:
a) Individuals
     b) Joint account holders with operating instructions as Self, Either or survivor,
         Anyone or survivors or survivor clause

           </p>
         </div>
         </div>
        </>
    )

}