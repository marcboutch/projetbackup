import React from "react";

const InputComponent = ({ text, type, id, value, onchange, className }) => (
  <div>
    <label htmlFor={id} className={className}>{text}</label>

    <input type={type} id={id} defaultValue={value} onChange={onchange} />
  </div>

);

export default InputComponent;
