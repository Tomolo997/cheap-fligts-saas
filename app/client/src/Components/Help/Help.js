import '../../App/App.css';
import React, { useState } from 'react';
import LoginSuccess from '../LoginSuccess/LoginSuccess';

export default function Help(props) {
  const [emailSent, setEmailSent] = useState(false);

  const sendContactEmail = () => {
    setEmailSent(true);
    setTimeout(() => {
      location.reload();
    }, 1500);
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
      <div className="contact_form_helpSection">
        <label
          className="contact_label contact_label_helpSection"
          htmlFor="name"
        >
          Full Name
        </label>
        <input
          className="contact_input contact_input_helpSection"
          placeholder={props.userName}
          defaultValue={props.userName}
          type="text"
          id="name"
        />
        <label
          className="contact_label contact_label_helpSection"
          htmlFor="email"
        >
          E-mail
        </label>
        <input
          className="contact_input contact_input_helpSection"
          defaultValue={props.userEmail}
          placeholder={props.userEmail}
          type="text"
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
          className="contact_textArea contact_input_helpSection contact_textarea_helpSection"
          type="textarea"
        />
        <button
          onClick={sendContactEmail}
          className="contact_submit contact_submit_helpSection"
        >
          Contact me
        </button>
        {emailSent ? (
          <LoginSuccess message={'Succesfully sent contact email 😀'} />
        ) : null}
      </div>
    </div>
  );
}
