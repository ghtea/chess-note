import React, { useMemo } from "react";


// idk how to set type of valueCurrent and value to be same
type PropsInputText = {

    name: string;
    value: string | number | readonly string[] | undefined;

    label: string;
    placeholder: string;
    required: boolean;

    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    onKeyPress?: ((event: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
};

function InputText({

    name,
    value,

    label,
    placeholder,
    required,

    onChange,
    onKeyPress,

}: PropsInputText) {

    const idInput = useMemo(()=>`input-text__${name}----${value}`,[]);
    const idLabel = useMemo(()=>`label__${name}----${value}`,[]);

    return ( 
    <>  
        <label 
            id={idLabel}
            htmlFor={idInput}
        >   {label} 
        </label>

        <input 
            type="text" 

            name={name} 
            value={value}

            id={idInput}
            aria-labelledby={idLabel}
            placeholder={placeholder}
            
            required={true}

            onChange={onChange} 
            onKeyPress={onKeyPress}
        /> 
    </>

  );
}

InputText.defaultProps = {};

export default InputText;


