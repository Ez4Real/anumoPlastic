import './index.css'
import BreadCrumb from '../../components/BreadCrumb';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div className='content'>
      <BreadCrumb pageName={t('ContactUs.pageName')} />
      <div className='contactUsGrid-content'>
        <div>
          <form className='contact-form'>
            <div className='form-group'>
              <legend className='upperLabel'>{t('ContactUs.nameLabel')}</legend>
              <div className='nameFields-container'>
                <div className='nameGroup'>
                  <input type='text' name='firstName' required />
                  <label className='lowerLabel' htmlFor='firstName'>{t('ContactUs.firstNameLabel')}</label>
                </div>

                <div className='nameGroup'>
                  <input type='text' name='lastName' required />
                  <label className='lowerLabel' htmlFor='lastName'>{t('ContactUs.lastNameLabel')}</label>
                </div>
              </div>
            </div>

            <div className='form-group'>
              <label className='upperLabel' htmlFor='email'>{t('ContactUs.emailLabel')}</label>
              <input type='email' name='email' required />
            </div>

            <div className='form-group'>
              <label className='upperLabel' htmlFor='subject'>{t('ContactUs.subjectLabel')}</label>
              <input type='text' name='subject' required />
            </div>

            <div className='form-group'>
              <label className='upperLabel' htmlFor='message'>{t('ContactUs.messageLabel')}</label>
              <textarea name='message' required />
            </div>

            <div className='submitBtn-container'>
              <button type='submit'>{t('ContactUs.submitLabel')}</button>
            </div>
          </form>
        </div>
        <div>
          <div className='contactUsImage-container'>
            <img src='/contact-us.png' alt='Anumo Carabiner'>
            </img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;