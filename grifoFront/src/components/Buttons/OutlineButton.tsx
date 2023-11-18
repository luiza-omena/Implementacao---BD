import { MouseEventHandler, ReactNode } from "react";
import "./OutlineButton.css"

interface IOutlineButtonProps {
    onClick?: MouseEventHandler,
    children: ReactNode,
    disabled?: boolean,
    className?: string,
    type?: string | any,
    margin?: string,
    variant?: string
    form?: string
    font?: string
}

const OutLineButton = ({onClick, font="font-Helvetica", children, disabled, className, type, margin, variant = 'default', form } : IOutlineButtonProps) => {
    const buttonStyle = `${font} flex flex-row items-center gap-1 outline-button 
    py-2 px-6 border rounded-3xl ${className} outline-button--${variant}`
    return (
        <button 
            form={form}
            onClick={onClick} 
            disabled={disabled} 
            type={type} 
            className={buttonStyle}
            style={{margin:`${margin ? `${margin}` : "auto"}`}}
        >
            {children}
        </button>
    );
};

export default OutLineButton;