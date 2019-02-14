import React from "react";

const SubmitComponent = ({ type, onClick, value }) => (
  <div>
    <input type={type} onClick={onClick} value={value} />
  </div>

);

export default SubmitComponent;
