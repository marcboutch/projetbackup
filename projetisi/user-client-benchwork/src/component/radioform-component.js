
import React from "react";

function buildOption(option, name, checked) {
  return (
    <div className="custom-control custom-radio">
      {checked === option.value ? <input className="custom-control-input" type="radio" id={name + option.value} name={name} value={option.value} defaultChecked="checked" required /> : <input className="custom-control-input" type="radio" id={name + option.value} name={name} value={option.value} required />}
      <label className="custom-control-label" htmlFor={name + option.value}>{option.label}</label>
    </div>
  )
}

const RadioFormComponent = ({ legend, id, name, options, checked }) => (

  <fieldset id={id} className="form-group" >

    <legend className="col-form-label col-sm-12 pt-0">{legend}</legend>
    <div className="col-sm-10">

      {options.map(option => buildOption(option, name, checked))}
    </div>

  </fieldset>

);

export default RadioFormComponent;
