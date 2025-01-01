import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css'
import HappyFamily from './happyFamily';
import myImage1 from '../business-loan.png';
import myImage2 from '../internet-banking-information-in-hindi.jpg';
import myImage3 from '../Online-Banking-Security-1.jpg';
import EmiCalculator from '../emiComponent/emiCalculator.js'
import sideBank from'../side-bank.jpg'
import paperlessimg from '../paperless.jpg'
import ProfileElement from '../profileelem.js'
import {useState,useEffect} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import axios from "axios";
import VMC from '../VMC/vmc.js';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0


export default function HomePage() {
let location=useLocation();
let navigate=useNavigate();
const { user, isAuthenticated } = useAuth0();
console.log("FROMM HOME PAGE USER ",user)

const users = location.state?.users
  const [currentImg, setcurrentImg]=useState(1);
  const [currentImg1, setcurrentImg1]=useState(1);
const [data,setData]=useState([])
useEffect(() => {
  async function CheckData() {
      try {
          let res = await axios.get("http://localhost:3003/forsessionCheck",{withCredentials: true});
          if (res.status === 200) {
              setData(res.data.message, 'welcoming session backend');
              console.log("i think session was created", res.data.message, res.data);
          } else {
              setData('no data');
              console.log("got error while session");
          }
      } catch (err) {
          console.log("Error occurred: in the session", err);
      }
  }
  CheckData();
}, []);


  function HoverImg(){
    setcurrentImg(1.1)
  }
  function DontHoverImg(){
    setcurrentImg(1)
  }
  function HoverImg1(){
    setcurrentImg1(1.1)
  }
  function DontHoverImg1(){
    setcurrentImg1(1)
  }

  let [myStyle ,setMystyle]=useState({
    color:"black",
    backgroundColor:"  rgb(247, 234, 218)"
   })

   let [forHappy, setHappy]=useState({
    
 color: "black",
      backgroundColor: " rgb(250, 243, 234)"

   })
 
   let [goalStyle,setgoalStyle]=useState({
    color:"black"
   })

  
  const [forWholeinEmi,setforWholeinEmi]=useState({backgroundColor:"rgb(245, 259, 230)"})
 let[ box1,setbox1]=useState({  backgroundColor:"white"})
 
 function toggleStyle(){
  if(myStyle.backgroundColor== "rgb(247, 234, 218)"){
    setMystyle({
      color:"black",
    backgroundColor:" rgb(9, 18, 10)"

    })
    setHappy({
      color:"white",
      backgroundColor:"rgb(71, 70, 70)"
    })
    setgoalStyle({
      color:"black"
    })
    setforWholeinEmi({
      backgroundColor:"rgb(25, 43, 20)"

    })
    setbox1({
       backgroundColor:"rgb(130, 189, 159)"
    })
  }
  else{
    setMystyle({
      color:"black",
    backgroundColor:"rgb(247, 234, 218)"
    })
    setHappy({
      color:"black",
        backgroundColor: " rgb(250, 243, 234) "
    })
    setgoalStyle({
       color:"black"
    })
    setforWholeinEmi({
      backgroundColor:"rgb(245, 259, 230)"

    })
    setbox1({
      backgroundColor:"white"

    })
  }
 }



const [slider, setSlider] = useState({
  position: 'absolute',
  top: '0',
  right: '-20%',
  width: '20%',
  backgroundColor: 'green',
  height: '100%',
  transition: '0.4s',
  zIndex: '1',
});

function OpenSlider() {
  setSlider({
    ...slider,
    right: '0',
  });
}

function CloseSlider(e) {
  if (!e.target.closest('.forSlider')) {
    setSlider({
      ...slider,
      right: '-20%',
    });
  }
}

const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userName, setUserName] = useState(''); // State to hold the user's name
useEffect(() => {
  async function LoggedIn() {
    try {
      let res = await axios.get("http://localhost:3003/for-checkinglogin",{withCredentials:true});
      if (res.status === 200) {
        setIsLoggedIn(true);
        console.log(isLoggedIn)
        setUserName(res.data.data.name); // Assuming the name is in res.data.name
        console.log("got results", res.data.data.name);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.log("error from db", err);
    }
  }
  LoggedIn();
}, []);



useEffect(() => {
  document.addEventListener('click', CloseSlider);

  return () => {
    document.removeEventListener('click', CloseSlider);
  };
}, [CloseSlider]);

  return (
<>  
<ProfileElement />


              
   
       
    <div className="forBackground" style={myStyle}>
      <div className='welcome-container'>
    {isLoggedIn &&(<> <h1 id='forWelcome' >Welcome Back</h1>
      <h3 id='forUname'> {userName}</h3></>)}
      </div>
   
    <div className='flex-container'>
  
    <div className="rightbox"  onMouseEnter={HoverImg1}  onMouseLeave={DontHoverImg1}style={{transform: `scale(${currentImg1})`,transition:"0.3s",cursor:"pointer"}}>
      <h5 id='righttxt'>Easy Money Transfer</h5>
  <img id="rightimg" src="https://cloud.paysend.com/strapi/prod/BL_019_01_credit_1200_2e3a5c6365.png"></img>
</div>

        <div className='leftbox' onMouseEnter={HoverImg}  onMouseLeave={DontHoverImg}style={{transform: `scale(${currentImg})`,transition:"0.3s",cursor:"pointer"}}>
            <h5 style={{position:"fixed",marginLeft:"11%",top:"4%"}}> Competitive Personal Loan <p style={{position:"fixed",marginLeft:"20%"}}>Interest Rates</p></h5>
            <img id="leftimg" src="https://img.freepik.com/free-photo/covid-19-global-economic-crisis_23-2148746564.jpg?size=626&ext=jpg&ga=GA1.1.1852636979.1719413594&semt=ais_user"></img>

        </div>
        </div>
   
<div className="forWelcometxt">

</div>


        <div className="box">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100 carosal-image" src={myImage1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carosal-image" src={myImage2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carosal-image" src={myImage3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      </div>
    </div>
    <EmiCalculator style={forWholeinEmi} box={box1} />
    <HappyFamily style={forHappy} goalStyle={goalStyle}/>
    
    <VMC />
    </>
  );
}