import '../../App/App.css';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import LoginSuccess from '../LoginSuccess/LoginSuccess';

export default function Help(props) {
  const [emailSent, setEmailSent] = useState(false);
  const [emailFromSend, setEmailFromSend] = useState(props.userName);
  const [nameFromSend, setNameFromSend] = useState(props.userEmail);
  const [messageFromSend, setMessageFromSend] = useState('');

  const sendContactEmail = (e) => {
    setEmailSent(true);
    setTimeout(() => {
      location.reload();
    }, 1500);
    e.preventDefault();
    emailjs.send(
      'service_rkak0nj',
      'template_964551s',
      {
        email: emailFromSend,
        name: nameFromSend,
        message: messageFromSend,
      },
      'user_ltZGHajYjIaXtDOPlpHli'
    );
    e.target.reset();
  };

  const emailFromSendChanger = (e) => {
    setEmailFromSend(e.target.value);
  };

  const nameFromSendChanger = (e) => {
    setNameFromSend(e.target.value);
  };

  const messageFromSendChanger = (e) => {
    setMessageFromSend(e.target.value);
  };

  return (
    <div className="contact_dashboard">
      <h1 className="contact_dashboard_help_h1">Contact</h1>
      <div className="contact_dashboard_help_div">
        <p className="help_paragraph">
          {' '}
          If you need help or you want to report a bug please contact me through
          below contact form. Also if you have some great idea for a good
          feature do not hesitate to write me. Help me help you!
        </p>
      </div>
      <form onSubmit={sendContactEmail}>
        <div className="contact_form_helpSection">
          <label
            className="contact_label contact_label_helpSection"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            onChange={nameFromSendChanger}
            className="contact_input contact_input_helpSection"
            placeholder={props.userName}
            defaultValue={props.userName}
            type="text"
            id="name"
            name="name"
          />
          <label
            className="contact_label contact_label_helpSection"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            onChange={emailFromSendChanger}
            className="contact_input contact_input_helpSection"
            defaultValue={props.userEmail}
            placeholder={props.userEmail}
            type="text"
            name="email"
            id="email"
          />{' '}
          <label
            className="contact_label contact_input_helpSection"
            htmlFor="name"
          >
            Message
          </label>
          <textarea
            placeholder="i found a bug, can you please fix it..."
            onChange={messageFromSendChanger}
            className="contact_textArea contact_input_helpSection contact_textarea_helpSection"
            name="message"
            type="textarea"
          />
          <button className="contact_submit contact_submit_helpSection">
            Contact me
          </button>
          {emailSent ? (
            <LoginSuccess message={'Succesfully sent contact email 😀'} />
          ) : null}
        </div>
      </form>
    </div>
  );
}
