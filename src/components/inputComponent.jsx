import {React} from "react";
import "../styles/index.scss";
function InputComponent({value, name, rusName, setValue}) {
  const inputName = `${name}Input`
  return(
    <div className="inputComponent">
    
      <input placeholder={rusName} id={name} type="number" value={value} name={inputName} onChange={event => setValue(event.target.value)} onFocus={event => {
        if (event.target.value === '0') {
          event.target.value = '';
        }
      }} />
      <label htmlFor={name}>{rusName}</label>
    </div>
  )
}
export default InputComponent;