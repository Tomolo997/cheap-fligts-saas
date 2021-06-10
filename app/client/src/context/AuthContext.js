import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [price_id, setPriceId] = useState('');
  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('None');
  const [slider, setSlider] = useState(true);
  async function getLoggedIn(params) {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/v1/users/loggedIn',
      });

      //this wil return true or false
      setLoggedIn(res.data);
    } catch (error) {
      console.log('error', error.message);
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        price_id,
        setUserEmail,
        userEmail,
        setPriceId,
        loggedIn,
        getLoggedIn,
        slider,
        setSlider,
        userId,
        setUserId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
export { AuthContextProvider };
