import React from "react";

const ButtonSubmitComponent = ({ text, className, onClick }) => (

    <button className={className} onClick={onClick}>{text}</button>

);

export default ButtonSubmitComponent;
