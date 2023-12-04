// WITHOUT A LIBRARY
"use client"

import React, { useState, useEffect, CSSProperties } from "react";

const CountDown = () => {
  
  let difference = +new Date(`10/10/2023`) - +new Date();
  const [delay, setDelay] = useState(difference);

  const d = Math.floor(difference / (1000 * 60 * 60 * 24));
  const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const m = Math.floor(((difference / 1000) / 60) % 60);
  const s = Math.floor((difference / 1000) % 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <span className="font-bold text-5xl text-yellow-300" 
    // suppressContentEditableWarning 
    suppressHydrationWarning>
      {d}:{h}:{m}:{s}
      {/* {d}:{h}:{m}:{JSON.stringify(s)} */}
      {/* {d}:{h}:{m} */}
    </span>
  );
  
};

export default CountDown;