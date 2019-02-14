
import React from "react";

function buildOption(option, name) {
  return (
    <div>
      <input type="radio" id={"title_" + option.number} name={name} value={option.number} />
      <label htmlFor={"title_" + option.number}>{option.label}</label>
    </div>
  )
}

const RadioComponent = ({ legend, id, name, options }) => (

  <fieldset id={id} >
    <legend>{legend}</legend>
    <div>
      {options.map(option => buildOption(option, name))}
    </div>
  </fieldset>

);

export default RadioComponent;
