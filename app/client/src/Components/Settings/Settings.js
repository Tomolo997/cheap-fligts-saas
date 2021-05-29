import React, { useState } from "react";
import axios from "axios";
export default function Settings(props) {
  const [updateName, setUpdateName] = useState(props.userName);
  const [updateEmail, setUpdateEmail] = useState(props.userEmail);

  const updateMe = async () => {
    const res = await axios.put("http://localhost:8000/api/v1/users/updateMe", {
      name: updateName,
      email: updateEmail,
    });
  };
  const changeNameOnInput = (e) => {
    setUpdateName(e.target.value);
  };
  const changeEmailOnInput = (e) => {
    setUpdateEmail(e.target.value);
  };
  return (
    <div className="settings">
      <div className="settings_account">
        <div className="settings_userDetails">
          <div className="settings_userDetails_h1_div">
            <h1 className="settings_userDetails_h1">Your Account settings</h1>
          </div>
          <div className="settings_userName">
            <h2 className="settings_userDetails_h2" htmlFor="">
              Name
            </h2>
            <input
              type="text"
              className="settings_input"
              onChange={changeNameOnInput}
              defaultValue={props.userName}
              placeholder={props.userName}
            />
          </div>
          <div className="settings_userEmail">
            <h2 className="settings_userDetails_h2" htmlFor="">
              Email
            </h2>

            <input
              type="text"
              className="settings_input"
              onChange={changeEmailOnInput}
              defaultValue={props.userEmail}
              placeholder={props.userEmail}
            />
          </div>
          <div className="settings_button_div">
            <button onClick={updateMe} className="settings_button">
              Save settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
