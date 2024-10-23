import './index.css'

const Footer = () => {

  return (
    <footer>
        <div className='footer-container'>
            <div className='footerLogo-container'>
                <img src='/footer-logo-black.svg' alt='Anumo Logo Black'></img>
            </div>
            <div className='footerContent-container'>
                <div className='signUp-container'>
                    <p>SIGN UP FOR OUR NEWSLETTER</p>
                    <input type="email" placeholder='ENTER YOUR EMAIL HERE'></input>
                </div>
                <div>
                    <ul>
                        <li>Privacy Policy</li>
                        <li>Payment and Delivery</li>
                        <li>Returns</li>
                    </ul>
                </div>
                <div className='languageCurrency-container'>
                    <div className='language'>ENG</div>
                    <div className='currency'>USD</div>
                </div>
            </div>
            <div className='socialLinks'>
                <span>INSTAGRAM</span>
                <span>TIKTOK</span>
            </div>
        </div>
    </footer>
  );
};

export default Footer;