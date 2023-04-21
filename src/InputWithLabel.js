import { useEffect, useRef } from "react";

const InputWithLabel = ({ 
    id,
    children,
    value,
    type="text",
    onInputChange,
}) => {
    const inputRef = useRef();

    useEffect(()=> {
        inputRef.current.focus();
        console.log('Field focused');
    }, []);

    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input 
                id={id} 
                value={value} 
                onChange={onInputChange}
                type={type}
                ref={inputRef}
            />
        </>
    )
};

export default InputWithLabel;