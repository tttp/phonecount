import React, { useState} from 'react';
import Digit from '../digit';
import { useSwipeable } from 'react-swipeable';

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
    slide (1);
    console.log(event.key);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => slide(1),
    onSwipedRight: () => slide(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });


  return (
    <div onKeyPress={handleKey} {...handlers}>
    <Digit value={props.value.toString()[position]} />
    </div>
  );


});

export default Number;
