import React from 'react';

export default function Settings(props) {
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
              placeholder={props.userEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
