import './vmc.css';
import {Link} from 'react-router-dom'

export default  function VMC(){
    return  (
        <>
         <section className="section">
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <h3 className='main-heading'>Our Company</h3>
                        <div className='underline mx-auto'></div>
                        <p>Our Bank is an Indian multinational public sector bank and financial services statutory body headquartered in Mumbai, Maharashtra. It is the 47th largest bank in the world by total assets and ranked 221st in the Fortune Global 500 list of the world's biggest corporations of 2020, being the only Indian bank on the list. It is a public sector bank and the largest bank in India with a 23% market share by assets and a 25% share of the total loan and deposits market. It is also the tenth largest employer in India with nearly 250,000 employees. In 2023, the company's seat in Forbes Global 2000 was 77.</p>
                    </div>
                </div>
            </div>
         </section>

         <section className="section bg-c-light border-top">
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 mb-5 text-center'>
                        <h3 className='main-heading'>Vision ,Mission and Values </h3>
                        <div className='underline mx-auto'></div>
                       
                    </div>
                    <div className="col-md-4 text-center">
                        <h6>Our Vision</h6>
                        <p>Our application envisions revolutionizing financial management by providing a seamless, secure, and user-friendly platform for banking and payments. We aim to empower users with comprehensive tools for managing accounts, processing transactions, and paying utility bills effortlessly. By integrating advanced security measures and innovative features, we strive to enhance financial transparency and accessibility, making everyday financial tasks straightforward and efficient. Our goal is to foster financial inclusion and simplify the banking experience for all users.</p>
                    </div>
                    <div className="col-md-4 text-center">
                        <h6>Our Mission</h6>
                        <p>Our mission is to deliver a robust and intuitive fintech solution that empowers individuals to take control of their financial lives. We are committed to providing secure, reliable, and accessible banking and payment services that cater to diverse user needs. By leveraging cutting-edge technology and maintaining a user-centric approach, we aim to simplify financial management, enhance user experience, and promote financial well-being. Our dedication is to build a trusted platform that supports users in achieving their financial goals with ease and confidence.</p>
                        </div>
                    <div className="col-md-4 text-center">
                        <h6>Our Core Values</h6>
                        <p>Our fintech application is built on the core values of user-centricity, security, innovation, and transparency. We prioritize user needs and protect their data with advanced security measures. We continuously enhance our services with cutting-edge technologies and maintain open communication with our users. Our goal is to provide accessible and reliable financial solutions that empower users to make informed decisions and achieve their financial goals.</p>
                    </div>
                </div>
            </div>
         </section>
         
         <section className="section footer bg-c-dark text-white">
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4  text-center'>
                        <h5 >Company Information </h5>
                      <hr/>
                        <p>Our Application, designed for seamless financial management, transactions, and utility payments. It ensures secure,  and user-friendly services tailored to meet modern financial needs. The application integrates advanced features to streamline banking processes, making financial management simpler and more accessible.</p>
                       
                    </div>
                    <div className="col-md-4 text-center">
                        <h5>Quick Links</h5>
                        <hr/>
                       <div><Link className='forall-links' to='/about'>About</Link></div><br></br>
                       <div><Link className='forall-links' to='/services'>Services</Link></div><br></br>
                       <div><Link className='forall-links' to='/customer-care'>Customer Care</Link></div>
                     
                    </div>
                    <div className="col-md-4 text-center">
                        <h5>Contact Information</h5>
                        <hr/>
                        <div ><p className="text-white rcb mb-1">#64,Bangalore ,Karnataka,India.Koramangala</p></div>
                        <div ><p className="text-white rcb mb-1">+91 88799XXXX0</p></div>
                        <div ><p className="text-white  rcb mb-1">+91 72874XXXX7</p></div>
                        <div ><p className="text-white rcb mb-1">+91 91526XXXX3</p></div>
                       
                        </div>
                    
                </div>
            </div>
         </section>
        </>
    )
}

