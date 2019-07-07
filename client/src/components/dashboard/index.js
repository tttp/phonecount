import React, { useState, useEffect} from 'react';
import './styles.scss';
import { withRouter } from 'react-router-dom';
import Digits from '../digits';

const Dashboard = React.memo(function Number(props) {
 const [value, setValue] = useState(props.value);
 const [running, setRunning] = useState(false);

 const tick = () => {
   if (value <= 0)  return;
   
   
   setValue(value -1);
   props.update(value -1);
     
 }

 const update = (event) => {
   setValue(event.target.value);
   props.update(event.target.value);
 }

useEffect(() => {
  if (!running) return;
  var timerID = setInterval( () => tick(), 1000 );
 
  return function cleanup() {
      clearInterval(timerID);
    };
 });
 
const click = () => {
  setRunning (!running);
  return false;
}

 return (
   <div className="container">
	 <div className="form-group">
	 <label htmlFor="total">Seconds</label>
	 <input type="number" name="total" className="form-control" value={props.value} onChange={update} />
	 </div>
	 <div className="form-group">
	 <button className="btn btn-lg btn-primary" onClick={click}>{running ? "Stop": "Start"}</button>
	 </div>
   <Digits value={props.value}  />
	 <form>
	 </form>
   </div>
 ); 

});

export default withRouter(Dashboard);
