import React, { useState} from 'react';
import Digit from '../digit';
import { useSwipeable } from 'react-swipeable';
//import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
//
const Number = React.memo(function Number(props) {

  const [position, setPosition] = useState(() => {
    return 0;
  });

  function slide(step) {
    console.log(position);
    if (step <0 && position===0)
      return setPosition (props.value.toString().length -1);
    if (step >0 && position + 2 > props.value.toString().length){
      return setPosition(0);
    }
    setPosition(position + step);
  }
  function handleKey(event){
    if (event.key === "p")
      return slide(-1);
    if (event.key === "a")
      return props.history.push('/admin');//
    slide (1);
  };

  const handlers = useSwipeable({
    onSwipedUp: () => props.history.push('/admin'),
    onSwipedDown: () => props.history.push('/admin'),
    onSwipedLeft: () => slide(1),
    onSwipedRight: () => slide(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

//  if (position === null) return <Redirect to="/admin" />;
  return (
    <div onKeyPress={handleKey} {...handlers} tabIndex='0' style={{outline:'none'}}>
    <Digit value={props.value.toString()[position]} />
    </div>
  );


});

export default withRouter(Number);
