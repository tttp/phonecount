import React, {useEffect} from 'react';
//import Digit from './components/digit';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Number from './components/number';
import './App.css';
//import io  from 'socket.io-client';
//const socket = io(%REACT_APP_SOCKET_URL%);
//import { BrowserRouter, Route, Link } from "react-router-dom";
//const socket = io();

function App() {
  useEffect(() => {
//    socket.emit('room', {room: 'test-room'});
    console.log('joining room');

    return () => {
        console.log('leaving room');
//        socket.emit('leave room', {room: 'test-room'});
      }
  });

  return (
    <div className="App">
      <div className="container">
        <Number value="1234567890" />
      </div>
    </div>
  );
}

export default App;
