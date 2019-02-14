import React from "react";

const InputComponentForm = ({ text, type, id, value, placeholder, onChange, pattern, required, classesdiv, classesinput, errorMessage, spantext }) => (
  <div className={classesdiv}>
    <label htmlFor={id} ><span className="text-danger">{spantext}</span>{text}</label>

    <input type={type} id={id} value={value} name={id} onChange={onChange} pattern={pattern} required={required} className={classesinput} placeholder={placeholder} />
    <div className="invalid-feedback">
      {errorMessage}
    </div>
  </div>


);

export default InputComponentForm;
