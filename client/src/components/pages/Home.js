import React, { useState, useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Home =  props =>  {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { isAuthenticated, registrationFlag, setUnsetRegistrationFlag } = authContext;

  useEffect(() => {
    console.log("props", props)
    console.log("authContext", authContext)
    if (registrationFlag == true) {
      
      setAlert("User registered successfully", 'success');
      setUnsetRegistrationFlag();
    }
  }, [isAuthenticated]);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
