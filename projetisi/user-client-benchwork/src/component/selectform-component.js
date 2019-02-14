import React from "react";


function buildOption(option, index, selected) {
  return (
    <option value={option.value} key={index} selected={option.value == selected ? selected : ""}>{option.label} </option>
  )
}


const SelectFormComponent = ({ text, id, type, options, onChange, selected }) => (
  <div className="col-auto my-1">
    <label className="mr-sm-2" htmlFor={id}>{text}</label>
    <select
      className="custom-select mr-sm-2"
      type={type}
      id={id}
      name={id}
      onChange={onChange}
      required
    >
      <option value=''>Select One</option>
      {options.map((option, index) => buildOption(option, index, selected))}
    </select>
  </div>
);

export default SelectFormComponent;
