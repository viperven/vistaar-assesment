import React from "react";
import { useLocation } from "react-router-dom";

function Test() {
  let data = useLocation();
  console.log(data.state.transaction);

  return (
    <div>
      <h1>Har HAR mAHADEV</h1>
    </div>
  );
}

export default Test;
