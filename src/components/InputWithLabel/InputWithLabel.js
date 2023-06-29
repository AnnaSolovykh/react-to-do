import { useEffect, useRef } from "react";
import PropTypes from  "prop-types";
import style from "./InputWithLabel.module.css";

const InputWithLabel = ({ 
    id,
    children,
    value,
    type="text",
    onInputChange,
    placeholder
}) => {
    const inputRef = useRef();

    useEffect(()=> {
        inputRef.current.focus();
    });

    return (
        <>
            <label htmlFor={id} className={style.children}>{children}</label>
            <input 
                className={style.addTodoInput}
                id={id} 
                value={value} 
                onChange={onInputChange}
                type={type}
                ref={inputRef}
                placeholder={placeholder}
            />
        </>
    )
};

export default InputWithLabel;

InputWithLabel.propTypes = {
    children: PropTypes.object,
    value: PropTypes.string,
    onInputChange: PropTypes.func,
    placeholder: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.object,
}