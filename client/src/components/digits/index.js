import React from 'react';
import Digit from '../digit';
import { withRouter } from 'react-router-dom';
//
const Digits = React.memo(function Number(props) {


//  if (position === null) return <Redirect to="/admin" />;
  const split = function (d) {
    const a = [];
    for (let i=0;i<d.length;i++)
      a.push(d[i]);
    return a;
  };

  const click = (position) => {
    props.history.push("/d/"+position);
  }


  return(
  <div className="digits row">
    {split(props.value.toString()).map ((d,i) =>
       <Digit key={i} value={d} ratio={props.value.toString().length} id={i} maximize={false} handleClick={click}/>
    )}
    </div>
  );

});

export default withRouter(Digits);
