import './plan.css'
import './javascript.js'
export default function Interest({ onRemove }){
   

    return (
        <>
        <div className="interestbox">
            <img  onClick={onRemove} id="backinterest"src="https://tse2.mm.bing.net/th?id=OIP.qIC6gzCt5HFwLEKO9eul-gHaHi&pid=Api&P=0&h=220"/>
        <div className='interestContent'>
        <h3 id="forh3I">Solutions for Saving Money</h3>
              <p id="forpI">
                We have a variety of savings accounts and investment options to help you grow your money. Our high-yield savings accounts and competitive interest rates can help you reach your savings goals.
              </p>
            </div>
        </div>
        </>
    )
}