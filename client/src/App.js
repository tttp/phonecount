import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Number from './components/number';
import Dashboard from './components/dashboard';

import './App.css';
import io  from 'socket.io-client';
//const socket = io(%REACT_APP_SOCKET_URL%);
//import { BrowserRouter, Route, Link } from "react-router-dom";


const socket = io(process.env.REACT_APP_SOCKET_PORT ? window.location.protocol+'//'+window.location.hostname + ':' + process.env.REACT_APP_SOCKET_PORT: null);

function App() {
  const [value, setValue] = useState(123456789);

  useEffect(() => {
    socket.emit('room', {room: 'test-room'});
    socket.on('value',(d) => setValue(d));
    socket.on("PING", ()=>{
      console.log("got ping");
      socket.emit("PONG","aaa");
    });
    console.log('joining room');

    return () => {
        console.log('leaving room');
        socket.emit('leave room', {room: 'test-room'});
      }
  });

	function number(){
	  return (
	      <div className="container">
		<Number value={value} />
	      </div>);
	}

	function dashboard(){
    function updateValue(d) {
      //if (d === value) return;
      setValue(d);
      socket.emit('value',d);
    }
	  return (<Dashboard value={value} update={updateValue}/>);
	}

function noMatch({ location }) {
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

  function handleKey(event){ // TODO: remove of fix
    //onKeyPress={handleKey} tabIndex='0' style={{outline:'none'}}>
    console.log(event.key);
    if (event.key === "a")
      return this.props.history.push('/admin');//
  };


  const basename=process.env.REACT_APP_BASENAME || "/";
  const routes = {
    basename : number,
    "admin" : dashboard
  };

//  const routeResult = useRoutes(routes);
//  return routeResult || noMatch;

  return (
    <div className="App">
    <Router basename={basename}><Switch>
    <Route path="/" exact render={number} />
    <Route path="/admin" render={dashboard} />
    <Route component={noMatch} />
    </Switch>
    </Router>
    </div>
  );
}

export default App;
