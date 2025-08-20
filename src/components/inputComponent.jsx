import {React, useState} from "react";

function InputComponent({value, name, rusName, setValue}) {
  const inputName = `${name}Input`
  return(
    <>
      <label htmlFor={name}>{rusName}</label>
      <input placeholder={rusName} id={name} type="number" value={value} name={inputName} onChange={event => setValue(event.target.value)} />
    </>
  )
}
export default InputComponent;