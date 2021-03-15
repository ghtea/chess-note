import React, { useMemo } from "react";


// idk how to set type of valueCurrent and value to be same
type PropsInputRadio = {
    valueCurrent: any,

    name: string,
    value: any,
    label: string,
    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
};

function InputRadio({
    valueCurrent,

    name,
    value,
    label,
    onChange,

}: PropsInputRadio) {

    const idInput = useMemo(()=>`input-radio__${name}----${value}`,[]);
    const idLabel = useMemo(()=>`label__${name}----${value}`,[]);

    return ( 
    <>
        <input 
            type="radio" 

            name={name} 
            value={value}
            
            id={idInput}
            aria-labelledby={idLabel}
            defaultChecked={valueCurrent===value} 
            
            onChange={onChange} 
        /> 

        <label 
            id={idLabel}
            htmlFor={idInput}
        >   {label} 
        </label>
    </>

  );
}

InputRadio.defaultProps = {};

export default InputRadio;


