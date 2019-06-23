import React from 'react';
//import Digit from './components/digit';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Number from './components/number';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <Number value="1234567890" />
      </div>
    </div>
  );
}

export default App;
