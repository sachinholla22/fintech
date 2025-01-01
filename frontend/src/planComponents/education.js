import './plan.css'

export default function Education({onRemove}){
    return (
        <>
        <div className="educationbox">
        <img  onClick={onRemove} id="backeducation"src="https://tse2.mm.bing.net/th?id=OIP.qIC6gzCt5HFwLEKO9eul-gHaHi&pid=Api&P=0&h=220"/>
        <div className='educationContent'>
              <h3 id="forh3E">Solutions for Education Loans</h3>
              <p id="forpE">
             
              We provide educational loans to help you finance your higher education. Our loans come with low interest rates and can be used for tuition fees, living expenses, and other educational costs.
            </p>
            </div>
        </div>
        </>
    )
}