import React, { useContext } from 'react';
import '../../App/App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContextProvider from '../../context/AuthContext';
export default function NavBar() {
  const { loggedIn, getLoggedIn } = useContext(AuthContextProvider);

  async function logoutBtn() {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/users/logout');
      console.log(res);
      if (res.data.status === 'success') {
        location.reload(true);
      }
      getLoggedIn();
    } catch (error) {
      console.log(error.response);
    }
  }
  return (
    <div className="NavBar">
      <h1 className="logo_h1">
        Cost <span className="logo_friendly_span">friendly</span> flights
      </h1>
      <div className="middle_navbar_div">
        <button className="nav_button">About</button>
        <button className="nav_button">Pricing</button>
        <button className="nav_button">Contact</button>
      </div>

      <div className="navbar_sign-in">
        {loggedIn === false && (
          <Link to="/sign-up" className="signUp_link">
            Sign in
          </Link>
        )}
        {loggedIn === true && (
          <button onClick={() => logoutBtn()} className="signOut_button">
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
