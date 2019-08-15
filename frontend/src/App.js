import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import HomePage from './components/HomePage';
// import LoginPage from './components/LoginPage';
// import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/dashboard" component={Dashboard} />
        {/* <Route path="/signup" component={SignupPage} /> */}
        {/* <Route path="/requester" component={Dashboard} /> */}
        {/* <Route path="/worker" component={Dashboard} /> */}
        <Redirect to="/" />
      </Switch>
  );
}

export default App;
