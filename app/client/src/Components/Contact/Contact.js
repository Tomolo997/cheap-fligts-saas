import React, { useState } from "react";
import "../../App/App.css";
import emailjs from "emailjs-com";

export default function Contact(props) {
  const [contacted, setContacted] = useState(false);
  const [emailFromSend, setEmailFromSend] = useState("");
  const [nameFromSend, setNameFromSend] = useState("");
  const [messageFromSend, setMessageFromSend] = useState("");
  const thankTheCustomer = (
    <h1 className="contact_h1">
      Thanks for contacting us! We will anwser your question shortly!
    </h1>
  );

  const sendContactEmail = (e) => {
    e.preventDefault();
    emailjs.send(
      "service_rkak0nj",
      "template_964551s",
      {
        email: emailFromSend,
        name: nameFromSend,
        message: messageFromSend,
      },
      "user_ltZGHajYjIaXtDOPlpHli"
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
  const contactPage = (
    <form
      onSubmit={sendContactEmail}
      className="contact_form"
      ref={props.myRefToContact}
    >
      <h1 className="contact_h1">Get in Touch with us</h1>
      <label className="contact_label" htmlFor="name">
        Full Name
      </label>
      <input
        onChange={emailFromSendChanger}
        className="contact_input"
        placeholder="John Doe"
        type="text"
        id="name"
      />
      <label className="contact_label" htmlFor="name">
        E-mail
      </label>
      <input
        onChange={nameFromSendChanger}
        className="contact_input"
        placeholder="example@example.com"
        type="email"
        id="email"
      />
      <label className="contact_label" htmlFor="name">
        Message
      </label>
      <textarea
        onChange={messageFromSendChanger}
        placeholder="Type something to unsee me"
        className="contact_textArea"
        type="textarea"
      />
      <button type="submit" className="contact_submit">
        Contact us
      </button>
    </form>
  );

  return (
    <div className="Contact">{contacted ? thankTheCustomer : contactPage}</div>
  );
}
