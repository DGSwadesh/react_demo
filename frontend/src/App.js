
import React, {useState} from 'react';
import './App.css';
import './component/Navbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route path='/' exact/>
      </Switch>
      </Router>
    </>
  );
}

export default App;
