import React from "react";


function buildOption(option, index) {
  return (
    <option value={option.value} key={index}>{option.label} </option>
  )
}


const SelectComponent = ({ text, id, type, options }) => (
  <div>
    <label htmlFor={id}>{text}</label>
    <select
      type={type}
      id={id}
    >
      {options.map((option, index) => buildOption(option, index))}
    </select>
  </div>
);

export default SelectComponent;
