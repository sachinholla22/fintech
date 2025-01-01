import './plan.css'

export default function Retierement({onRemove}){
    return (
        <>
        <div className="retirementbox">
        <img  onClick={onRemove} id="backretirement"src="https://tse2.mm.bing.net/th?id=OIP.qIC6gzCt5HFwLEKO9eul-gHaHi&pid=Api&P=0&h=220"/>
        <div className='reteirementContent'>
        <h3 id="forh3R">Solutions for Retirement Savings</h3>
              <p id="forpR">
                We offer a range of retirement savings products, including pension plans and investment accounts, to help you build a secure financial future. Our financial advisors can work with you to develop a personalized retirement savings plan.
              </p>
            </div>
        </div>
        </>
    )
}