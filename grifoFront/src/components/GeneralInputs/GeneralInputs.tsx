import { ReactNode, useEffect, useState } from "react";
import "./GeneralInputs.css";

interface IGeneralInputsProps {
    onChange? : (input: string) => void,
    children?: ReactNode,
    name: string
    placeholder: string
    type: string
    error?: string
    autoComplete?: string
    autoFocus?: boolean
    extraStyles?: string
}

export const TextInput = ( {onChange, children, name, placeholder, type, error, autoComplete, autoFocus} : IGeneralInputsProps) => {
    const [ inputErrorStyle, setInputErrorStyle ] = useState<string>("");
    const updateErrors = () => {
        const buildStyles = error ? "error--input outline outline-2 outline-red1 animate-shake" : "";
        setInputErrorStyle(buildStyles);
    };
    const handleChange = ( input : string) => {
        if(onChange) {
            onChange(input);
          };
        setInputErrorStyle("");
    };
    useEffect(() => {
        updateErrors();
    }, [error]);
    return (
        <div className={`text-input--container font-Helvetica mt-1 mb-3 ${inputErrorStyle}`}>
            {children}
            <input 
                autoFocus={autoFocus}
                maxLength={43}
                autoComplete={autoComplete}
                id={name}
                type={type}
                placeholder={placeholder}
                name={name}
                className={`text-[0.85rem]`} 
                onChange={(e) => {handleChange(e.target.value)}}
            />
        </div>
    );
};

export const PremTextInput = ( {onChange, name, placeholder, type, error, autoComplete, autoFocus, extraStyles} : IGeneralInputsProps) => {
    const [ inputErrorStyle, setInputErrorStyle ] = useState<string>("");
    const updateErrors = () => {
        const buildStyles = error ? "error--input outline outline-2 outline-red1 animate-shake" : "";
        setInputErrorStyle(buildStyles);
    };
    const handleChange = ( input : string) => {
        if(onChange) {
            onChange(input);
          };
        setInputErrorStyle("");
    };
    useEffect(() => {
        updateErrors();
    }, [error]);
    return (
            <input 
                className={`prem-text-input--container font-Inter ${extraStyles} ${inputErrorStyle}`}
                autoFocus={autoFocus}
                maxLength={43}
                autoComplete={autoComplete}
                id={name}
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={(e) => {handleChange(e.target.value)}}
            />
    );
};


export const CheckBox = ({name, description} : {name : string, description: string}) => {
    const [checked, setChecked] = useState<string>("");
    const handleChange = () => {
        setChecked( prev => prev ? "" : "checked" );
    };
    useEffect(() => {
        setChecked('');
    },[]);
    return (
        <div className="checkbox--container">
            <input
            id={name}
            type="checkbox" 
            className="cursor-pointer"
            name={name}
            value={checked}
            onChange={handleChange}
            /> 
            <label 
            className="text-grey4 font-Helvetica text-[0.85rem] pl-2 cursor-pointer" 
            htmlFor={name}
            >
            {description}
            </label>
        </div>
    );
};


export const Label = ({inputRef, title, error} : {inputRef?: string, title: string, error?: string}) => {
    return (
        <div className="font-Helvetica text-[0.85rem] flex items-end justify-between px-1">
        <label 
            className=" text-[0.85rem] font-medium"
            htmlFor={inputRef}>
            {title}
        </label>
        {error && <span className="text-red1 ">{error}</span>}
        </div>
    );
};


export const PremLabel = ({inputRef, title, error, extraStyles} : {inputRef?: string, title: string, error?: string, extraStyles?: string}) => {
    return (
        <div className={`font-Inter text-[0.875rem] text-pgray1 flex items-end justify-between px-1 leading-6 ${extraStyles}`}>
        <label 
            className="font-semibold"
            htmlFor={inputRef}>
            {title}
        </label>
        {error && <span className="text-red1 ">{error}</span>}
        </div>
    );
};
