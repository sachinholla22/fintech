import './happy.css'
import profile1 from '../profile1.jpeg'
import profile2 from '../profile2.jpg'
import profile3 from '../profile3.jpg'
import profile4 from '../profile4.jpg'
import family from '../family.jpg'
import {useState} from 'react';

import Car from '../planComponents/car.js'
import House from '../planComponents/house.js'
import Education from '../planComponents/education.js'
import Retierement from '../planComponents/retirement.js'
import Interest from '../planComponents/interest.js'



export default function HappyFamily(props){
    const[selectVal,setSelect]=useState('');

    const[showSolutions, setShowSolutions] = useState(false);
 
   let [currentBtn,setBtn]=useState({ transform: "scale(1)" })

   function Hover1(){
    setBtn({transform:"scale(1.2)"})
   }
  
    const handleRemoveAll = () => {
      setSelect('');
      setShowSolutions(false);
  };


    function handleSelect(e){
      console.log(e.target.value)
    setSelect(e.target.value)
    setShowSolutions(false);

        
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setShowSolutions(true);
     
      
    };
    
    return(
     <div className="box1" style={props.style}>
      <img id='family' src={family}/>
        <div className="goal" >
            <h5>BANKING WITH PURPOSE</h5>
            <h2>Your Goals Our Priority</h2>
          <div className="littleBox"style={props.goalStyle}>
        
          
            <p id="text">Select your goal</p>
          
            <select id="select" value={selectVal} onChange={(e)=>handleSelect(e)}>
            <option value="">Select Your Goal</option>
        <option value="car">I want to Buy Car or Bike</option>
        <option value="education">I want to Pursue Higher Education</option>
        <option value="house">I want to Buy House</option>
        <option value="retirement">I want to Save For Retirement</option>
        <option value="interest">I want to Save money for an interest</option>
        <option value="modi">I want modi</option>
      </select>
    {showSolutions && selectVal ==="car" &&<Car onRemove={handleRemoveAll}/>}
    {showSolutions && selectVal ==="house" &&<House onRemove={handleRemoveAll}/>}  
    {showSolutions && selectVal ==="education" &&<Education onRemove={handleRemoveAll}/>}   
    {showSolutions && selectVal ==="retirement" &&<Retierement onRemove={handleRemoveAll}/>}   
    {showSolutions && selectVal ==="interest" &&<Interest onRemove={handleRemoveAll}/> }  
    
      
            <button id="btnselect" onMouseEnter={Hover1}
                        onMouseLeave={() => setBtn({ transform: "scale(1)" })} style={currentBtn} onClick={handleSubmit}type="submit">Show soultions</button>
            
          

            <div class="profile-images">
            <img src={profile1} />
            <img src={profile2}/>
            <img src={profile3}/>
            <img src={profile4}/>
            <p>2.5K+ people found <br></br><p><center>this useful</center></p></p>
        </div>
          </div>
        </div>
     </div>
    )
}