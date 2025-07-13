import React, { useState } from 'react'
import ContactStyles from '../assets/dummyStyles';
import contactStyles from '../assets/dummyStyles';
import { FaCheck, FaComment, FaEnvelope, FaPaperPlane, FaPhone, FaTag, FaUser } from 'react-icons/fa';

const ContactUs = () => {

 const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const {showToast, setShowToast} = useState(false);

  const whatsappNumber = '8872825483'; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData( prev => ({
      ...prev,
      [name]: value
 }));
  }

// Web Api WhatsApp

const handleSubmit = (e) => {
  e.preventDefault();
  const { name, email, phone, subject, message } = formData;
  if (!name || !email || !phone || !subject || !message) {
    alert('Please fill in all fields');
    return;
  }

  // Build WhatsApp message
    const text = 
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Subject: ${subject}\n` +
      `Message: ${message}`;

    // Open WhatsApp Web with pre-filled message
    const url = 
      `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
}






  return (
    <div className={ContactStyles.pageContainer}>
      {showToast && (
        <div className=' toast-notification'>
          <div className={contactStyles.toast}>
            <FaCheck className='mr-2' />
            Message opened in WhatsApp!
          </div>
        </div>
      )}

      {/* Center Container */}

      <div className={contactStyles.centeredContainer}>
        <div className={contactStyles.headingContainer}>
          <h1 className={contactStyles.heading}>
            Contact FreshGrocers
          </h1>
          <div className={contactStyles.divider} />
        </div>
        <br />

        {/* Contact Area */}

        <div className={contactStyles.contactFormContainer}>
          <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-sky-800 to-sky-950 bg-opacity-90 backdrop-blur-sm z-0"></div>

          <form onSubmit={handleSubmit} className={contactStyles.form}>
            <div className={contactStyles.formField}>
            <div className={contactStyles.inputContainer}>
              <div className={contactStyles.inputIconContainer}>
                <FaUser className={contactStyles.inputIcon} />
              </div>
              <input
                type="text"
                id = "name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={contactStyles.formInput}
                placeholder="Enter your name"
                required
              />
            </div>
            </div>


            <div className={contactStyles.formField}>
            <div className={contactStyles.inputContainer}>
              <div className={contactStyles.inputIconContainer}>
                <FaEnvelope className={contactStyles.inputIcon} />
              </div>
              <input
                type="email"
                id = "email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={contactStyles.formInput}
                placeholder="example@example.com"
                required
              />
            </div>
            </div>

            <div className={contactStyles.formField}>
            <div className={contactStyles.inputContainer}>
              <div className={contactStyles.inputIconContainer}>
                <FaPhone className={contactStyles.inputIcon} />
              </div>
              <input
                type="text"
                id = "phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={contactStyles.formInput}
                placeholder="(123) 456-7890"
                required
              />
            </div>
            </div>


            <div className={contactStyles.formField}>
            <div className={contactStyles.inputContainer}>
              <div className={contactStyles.inputIconContainer}>
                <FaTag className={contactStyles.inputIcon} />
              </div>
              <input
                type="text"
                id = "subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={contactStyles.formInput}
                placeholder="Order Inquiry, Feedback, etc."
                required
              />
            </div>
            </div>

            <div className={contactStyles.formField}>
            <div className={contactStyles.inputContainer}>
              <div className={contactStyles.inputIconContainer}>
                <FaComment className={contactStyles.inputIcon} />
              </div>
              <textarea
                id = "message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={contactStyles.formTextarea}
                placeholder="Type your message here..."
                required
              />
            </div>
            </div>

            {/* Submit button */}
              <button type="submit" className={contactStyles.submitButton}>
               <span className={contactStyles.submitButtonText}>
                 Send Message
               </span>
               <FaPaperPlane className='h-5 w-5 text-black  ' />
              </button>
            </form>
            </div>
        </div>


        <style>{contactStyles.customCSS}</style>
      </div>
  )
}

export default ContactUs