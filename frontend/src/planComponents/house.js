import './plan.css'

export default function House({onRemove}){
    return (
        <>
        <div className="housebox">
        <img  onClick={onRemove} id="backhouse"src="https://tse2.mm.bing.net/th?id=OIP.qIC6gzCt5HFwLEKO9eul-gHaHi&pid=Api&P=0&h=220"/>
        <div className='houseContent'>
              <h3 id="forh3H">Solutions for Buying a House</h3>
              <p id="forpH">
             
              Our mortgage loans offer competitive rates starts from 8.30% and flexible terms to help you achieve your dream of homeownership. Our experienced team can guide you through the entire process and help you find the best loan option for your needs.
            </p>
            </div>
        </div>
        </>
    )
}