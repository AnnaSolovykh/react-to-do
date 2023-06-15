import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./Sorting.module.css";
import PropTypes from  "prop-types";

const SortingByAlphabet = ({ setTodoList }) => {

        const [toggle, setToggle] = useState(true);

        const handleToggleByAlphabeticalOrder = () => {
            setToggle(!toggle);
            toggle
            ? ( 
                setTodoList(todoList => [...todoList].sort((a, b) => { 
                    return (a.title > b.title ? -1 : b.title < a.title ? 1 : 0) 
                }))       
            )       
            : 
            ( 
                setTodoList(todoList => [...todoList].sort((a, b) => { 
                    return (a.title < b.title ? -1 : b.title > a.title ? 1 : 0) 
                }))
            )  
        };

    
        const didMount = useRef(false);
        
        useEffect(()=> {
            didMount.current ? setToggle(toggle) : didMount.current = true;;
        }, [toggle]);
    
        return (
            <div className={style.container}>
                <button className={style.button} type="button" onClick={handleToggleByAlphabeticalOrder}> 
                    {toggle ? "Sort from Z to A" : "Sort from A to Z"} 
                </button>  
                <p className={style.text}>{toggle ? "Sorted from A to Z!" : "Sorted from Z to A!"} </p>
            </div>
        );   
}

export default SortingByAlphabet;

SortingByAlphabet.propTypes = {
    setTodoList: PropTypes.func,
}