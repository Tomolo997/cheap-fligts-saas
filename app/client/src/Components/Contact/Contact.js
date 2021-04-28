import React from 'react';
import '../../App/App.css';

export default function Contact() {
  return (
    <div className="Contact">
      <form action="" className="contact_form">
        Get in Touch with us
        <label htmlFor="name">Name</label>
        <input className="contact_input" type="text" id="name" />
        <label htmlFor="name">Email</label>
        <input className="contact_input" type="text" id="email" />
        <label htmlFor="name">Message</label>
        <textarea className="contact_textArea" type="textarea" />
        <button type="submit" className="contact_submit">
          Contact
        </button>
      </form>
    </div>
  );
}
