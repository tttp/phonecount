import React, { useState, useEffect } from 'react';
import './index.scss';
import './assets/7segment.woff';



const Digit = React.memo(function Digit(props) {

  const threshold = 1.82;
  const [windowSize, setWindowSize] = useState(() => {
    var t= { width: window.innerWidth, height: window.innerHeight};
    t.allign= t.height/t.width > threshold ? "horizontal" : "vertical";
    if (props.maximize===false)
      t.allign = "inherit col-1";
    
    return t;
  });

  useEffect(() => {
    const onResize = () => {
        var t={
          width:Math.max(document.documentElement.clientWidth, window.innerWidth || 1),
          height: Math.max(document.documentElement.clientHeight, window.innerHeight || 1),
        };
        t.allign= t.height/t.width > threshold ? "horizontal" : "vertical";
      if (props.maximize && props.maximize===false) 
        t.allign = "inherit col-1";
      setWindowSize(t);
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  })

  const click = (e) => {
    console.log(e);
    if (props.handleClick)
      return props.handleClick(props.id);
   fullScreen();
  }

  const fullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
    /*
    if (height/width >1.82) {
      setvhClass("horizontal");
    } else {
     setvhClass("vertical");
    }
    */

  return (
      <div className={`digit ${windowSize.allign}`} onClick={click}>
      {props.value}
      </div>
    
  );


});

export default Digit;
