import React, { useMemo } from "react";


// idk how to set type of valueCurrent and value to be same
type PropsInputPassword = {

    name: string;
    value: string;

    label: string;
    placeholder: string;
    required: boolean;

    onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
    onKeyPress: ((event: React.KeyboardEvent<HTMLInputElement>) => void) | undefined;
};

function InputPassword({

    name,
    value,

    label,
    placeholder,
    required,

    onChange,
    onKeyPress,

}: PropsInputPassword) {

    const idInput = useMemo(()=>`input-password__${name}----${value}`,[]);
    const idLabel = useMemo(()=>`label__${name}----${value}`,[]);

    return ( 
    <>  
        <label 
            id={idLabel}
            htmlFor={idInput}
        >   {label} 
        </label>

        <input 
            type="password" 

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

InputPassword.defaultProps = {};

export default InputPassword;


