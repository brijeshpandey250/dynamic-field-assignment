import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateDynamicField from './components/pages/CreateDynamicField';
import GenerateDynamicField from './components/pages/GenerateDynamicField';
import DynamicFieldState from './context/dynamic_field/DynamicFieldState';
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <DynamicFieldState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/create-dynamic-field' component={CreateDynamicField} />
                  <PrivateRoute exact path='/generate-dynamic-field' component={GenerateDynamicField} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
         </DynamicFieldState>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
