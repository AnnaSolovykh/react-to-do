import React from "react";
import { useState, useEffect, useRef } from "react";
import style from "./Sorting.module.css";
import PropTypes from  "prop-types";

const SortingByDate = ({ setTodoList }) => {

        const [toggle, setToggle] = useState(true);
    
        const handleToggleByDate = () =>{
            setToggle(!toggle);
            toggle
            ? (   
                setTodoList(todoList => [...todoList].sort((a, b) => { 
                    return (new Date(a.date) > new Date(b.date) ? -1 : new Date(b.date) < new Date(a.date)? 1 : 0) 
                }))       
            )
            : 
            ( 
                setTodoList(todoList => [...todoList].sort((a, b) => { 
                    return (new Date(a.date) < new Date(b.date) ? -1 : new Date(b.date) > new Date(a.date) ? 1 :  0) 
                }))
            )  
        }
    
        const didMount = useRef(false);
        
        useEffect(()=> {
            didMount.current ? setToggle(toggle) : didMount.current = true;;
        }, [toggle]);
    
        return (
            <div className={style.container}>
                <button className={style.button}  type="button" onClick={handleToggleByDate}> 
                    {toggle ? "Sort due to date: from newest" : "Sort due to date: from oldest"} 
                </button>  
                <p className={style.text}>{toggle ? "Sorted due to date: from oldest!" : "Sorted due to date: from newest!"} </p>
            </div>
        );   
}

export default SortingByDate;

SortingByDate.propTypes = {
    setTodoList: PropTypes.func,
}