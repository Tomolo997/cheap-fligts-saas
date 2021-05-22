import React, { useState } from "react";
import "../../App/App.css";

export default function Contact(props) {
  const [contacted, setContacted] = useState(false);
  const thankTheCustomer = (
    <h1 className="contact_h1">
      Thanks for contacting us! We will anwser your question shortly!
    </h1>
  );

  const contactUs = (e) => {
    e.preventDefault();
    setContacted(true);
  };

  const contactPage = (
    <form action="" className="contact_form" ref={props.myRefToContact}>
      <h1 className="contact_h1">Get in Touch with us</h1>
      <label className="contact_label" htmlFor="name">
        Full Name
      </label>
      <input
        className="contact_input"
        placeholder="John Doe"
        type="text"
        id="name"
      />
      <label className="contact_label" htmlFor="name">
        E-mail
      </label>
      <input
        className="contact_input"
        placeholder="example@example.com"
        type="text"
        id="email"
      />
      <label className="contact_label" htmlFor="name">
        Message
      </label>
      <textarea
        placeholder="Arsenal is the best club in the world"
        className="contact_textArea"
        type="textarea"
      />
      <button onClick={contactUs} type="submit" className="contact_submit">
        Contact us
      </button>
    </form>
  );

  return (
    <div className="Contact">{contacted ? thankTheCustomer : contactPage}</div>
  );
}
