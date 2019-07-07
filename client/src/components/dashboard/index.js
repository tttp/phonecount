import React, { useState, useEffect} from 'react';
import './styles.scss';
import { withRouter } from 'react-router-dom';

const Dashboard = React.memo(function Number(props) {
 const [value, setValue] = useState(props.value);
 const [running, startstop] = useState(false);

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
 

 return (
	 <form>
	 <div className="form-group">
	 <label htmlFor="total">Seconds</label>
	 <input type="number" name="total" className="form-control" value={props.value} onChange={update} />
	 </div>
	 <div className="form-group">
	 <button className="btn btn-lg btn-primary" onClick={()=>props.history.push("/")}>go to counter</button>
	 </div>
	 </form>
 ); 

});

export default withRouter(Dashboard);
