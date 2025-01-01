import './plan.css'

export default function Car({onRemove}){
    return (
        <>
        <div className="carbox">
        <img  onClick={onRemove} id="backcar"src="https://tse2.mm.bing.net/th?id=OIP.qIC6gzCt5HFwLEKO9eul-gHaHi&pid=Api&P=0&h=220"/>
        <div className='bikeContent'>
              <h3 id="forh3C">Solutions for Buying a Car or Bike</h3>
              <p id="forpC">
                We offer a range of car and bike loans with competitive interest rates starts from 8.80% and flexible repayment options.You find the best financing solution to suit your needs and budget.
              </p>
            </div>
        </div>
        </>
    )
}