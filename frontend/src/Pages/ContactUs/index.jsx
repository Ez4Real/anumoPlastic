import './index.css'

const ContactUs = () => {

  return (
    <div className='content'>
        <p className='pathLink'>
            <span className='homeLink'>/HOME/</span>
            <span className='pageName'>Contact Us</span>
        </p>
        <div className='contactUsGrid-content'>
          <div>
            <form className='contact-form'>
              <div className='form-group'>
                <legend className='upperLabel'>NAME</legend>
                <div className='nameFields-container'>
                  <div className='nameGroup'>
                    <input type='text' name='firstName' required />
                    <label className='lowerLabel' htmlFor='firstName'>First Name</label>
                  </div>

                  <div className='nameGroup'>
                    <input type='text' name='lastName' required />
                    <label className='lowerLabel' htmlFor='lastName'>Last Name</label>
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <label className='upperLabel' htmlFor='email'>EMAIL</label>
                <input type='email' name='email' required />
              </div>

              <div className='form-group'>
                <label className='upperLabel' htmlFor='subject'>SUBJECT</label>
                <input type='text' name='subject' required />
              </div>

              <div className='form-group'>
                <label className='upperLabel' htmlFor='message'>MESSAGE</label>
                <textarea name='message' required />
              </div>

              <div className='submitBtn-container'>
                <button type='submit'>SUBMIT</button>
              </div>
            </form>
          </div>
          <div>
            <div className='contactUsImage-container'>
              <img src='/contact-us.png'>
              </img>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ContactUs;